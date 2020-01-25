import React, { Component } from 'react';
import { Container, Content, Button, Text, List, ListItem, Left, Right, Icon, Badge } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { ApplicationState } from '../../store';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Planta, Item } from '../../store/ducks/planta/types';
import { QRCodeReader } from '../../components/QRCodeReader';
import { NavigationScreenProp, withNavigationFocus } from 'react-navigation';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';

interface StateProps {
  plantaAtiva: Planta,
  programacoesRealizadas: ProgramacaoRealizada[],
  navigation: NavigationScreenProp<any, any>,
  isFocused: boolean
}

interface DispatchProps {
  concluiManutencao({ idProgramacao }): void
}

type Props = StateProps & DispatchProps

class ManutencaoIluminacao extends Component<Props> {
    state = {
        itens: [],
        hasCameraPermission: false,
        readingQRCode: false,
        loadingConcluir: false,
        scanned: false
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        this.carregaItens();
    }

    componentDidUpdate(prevProps: Props) {
      if (prevProps.isFocused !== this.props.isFocused) {        
        this.carregaItens();
      }
    }

    carregaItens = () => {
        const { plantaAtiva, programacoesRealizadas } = this.props;
        const idProgramacao = plantaAtiva.proximaProgramacao.id;
        const itens = plantaAtiva.itens.map( itemPlanta => {
          const programacaoItem = programacoesRealizadas.find(p => p.programacao.id === idProgramacao)
          const itensVistoriados = programacaoItem.itensVistoriados || [];
          const itemVistoriado = itensVistoriados.find(item => item.id_item === itemPlanta.id)
          const concluido = !!(itemVistoriado && itemVistoriado.concluido)
          return {
            ...itemPlanta,
            concluido
          }
        });

        this.setState({
            itens
        })
    }

    ativaQRCodeReader() {
        this.setState({
            readingQRCode: true
        })
    }

    concluirManutencao = () => {
      Alert.alert(
        'Concluir Manutenção',
        'Deseja concluir a manutenção de todos os itens?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.handleConcluirManutencao() },
        ],
      );
    }

    handleConcluirManutencao = () => {
      this.setState({ loadingConcluir: true }, async () => {
        const { navigation, concluiManutencao } = this.props;
        const idProgramacao = this.props.plantaAtiva.proximaProgramacao.id;
        await concluiManutencao({ idProgramacao });
        this.setState({ loadingConcluir: false });
        navigation.navigate('Menu');
      });
    }

    concluirManutencaoDia = () => {
      const { navigation } = this.props;
      navigation.navigate('Menu');
    }

    openItem = (item: Item) => {
      const { navigation } = this.props;
      navigation.navigate({ routeName: 'ManutencaoItem', params: { idItem: item.id } })
    }

    render() {
      const { readingQRCode, itens, loadingConcluir, scanned } = this.state;
      const { navigation } = this.props;
      if (readingQRCode) {
        return <QRCodeReader
          navigation={navigation}
           />
      }

      return (
        <Container>
          <HeaderNav title="Manutenção Iluminação" />
          <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
            <ScrollView>
              <List>
                {
                  (!itens || itens.length === 0) ?
                    <ActivityIndicator /> :
                    itens.map((item: Item) => {
                      const isEmergencia = item.circuito === 'Emergência';
                      return <ListItem key={item.id} onPress={() => this.openItem(item)} >
                        <Left>
                          <Badge
                            warning={isEmergencia}
                            primary={!isEmergencia}
                            style={{ marginRight: 10 }}>
                            <Text>{isEmergencia ? 'E' : 'N'}</Text>
                          </Badge>
                          <Text>{item.nome}</Text>
                        </Left>
                        <Right>
                          <Badge
                            danger={!item.concluido}
                            success={item.concluido}
                            style={{ marginLeft: 10, width: 26 }}>
                          </Badge>
                        </Right>
                      </ListItem>
                    })
                }
              </List>
            </ScrollView>
          </Content>
          <View style={{ flexDirection: 'row' }}>
            <Button style={style.botaoQuadrado} onPress={() => this.ativaQRCodeReader()}>
              <Icon name='md-qr-scanner' style={{ fontSize: 48 }} />
              <Text>LER QRCODE</Text>
            </Button>
            <Button style={style.botaoQuadrado} onPress={() => this.concluirManutencaoDia()}>
              <Icon name='md-stopwatch' style={{ fontSize: 48 }} />
              <Text>CONCLUIR DIA</Text>
            </Button>
            <Button style={style.botaoQuadrado} onPress={() => this.concluirManutencao()}>
              {loadingConcluir ?
                <ActivityIndicator /> :
                <>
                  <Icon name='md-checkmark' style={{ fontSize: 40 }} />
                  <View style={{ alignItems: 'center' }}>
                    <Text>CONCLUIR FINAL</Text>
                  </View>
                </>
              }
            </Button>
          </View>
        </Container>
      );
    }
}

const style = {
    btnStyle: {
        marginVertical: 5,
    },
    botaoQuadrado: {
        margin: 4,
        padding: 5,
        paddingBottom: 10,
        height: 110,
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: "column"
    }
}

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas : state.programacoesReducer.programacoesRealizadas
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(ManutencaoIluminacao))
