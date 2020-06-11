import React, { Component } from 'react'
import {
  Button,
  Container,
  Content,
  Text,
  View,
  Card,
  CardItem,
  Icon,
} from 'native-base'
import { ScrollView, Alert } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import HeaderNav from '../../../components/HeaderNav'
import { ApplicationState } from '../../../store'
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { AtividadeRealizada } from '../../../store/ducks/rdo/types';

interface StateProps {
  atividadesRealizadas: AtividadeRealizada[],
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  adicionaAtividade(): void;
  deleteAtividade({ id }): void;
}

type Props = StateProps & DispatchProps

class AtividadesRealizadas extends Component<Props> {

  state = {
    atividadesRealizadas: [],
  }

  componentDidMount() {
    this.refreshAtividades();
  }

  refreshAtividades = () => {
    const { atividadesRealizadas } = this.props;
    this.setState({
      atividadesRealizadas
    });
  }

  addAtividade = async () => {
    const { adicionaAtividade } = this.props;

    await adicionaAtividade();
    this.refreshAtividades();
  }

  editaAtividade = ({ id }) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: 'EditaAtividade',
      params: {id}
    })
  };

  excluiAtividade = async ({ id }) => {
    const { deleteAtividade } = this.props;
    Alert.alert(
      'Excluir Atividade',
      'Deseja excluir esta atividade?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await deleteAtividade({ id })
            this.refreshAtividades();
          }
        },
      ],
    );
  };

  concluir = async () => {
    const { navigation } = this.props;

    navigation.goBack();
  }

  render() {
    const { atividadesRealizadas } = this.state;

    return <Container>
      <HeaderNav title='Atividades Realizadas' />
      <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
        <ScrollView>
          {atividadesRealizadas.length === 0 &&
            <Text> Nenhuma atividade cadastrada.</Text>
          }
          {
            atividadesRealizadas.map(atividade => {
              return <Card key={atividade.id}>
                <CardItem
                  button
                  bordered
                  onPress={ () =>
                    this.editaAtividade({ id: atividade.id})
                  }
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}
                >
                  {atividade.concluido ?
                    <Icon type="AntDesign" name="checkcircle"  style={{color: 'green'}}/> :
                    <Icon type="AntDesign" name="exclamationcircle" style={{color: 'red'}} />
                  }
                  <Text style={{ flex: 1 }}>{atividade.descricao || 'Atividade sem descrição'}</Text>
                  <Icon
                    type="AntDesign"
                    name="close"
                    style={{color: 'grey', padding: 5}}
                    onPress={() => this.excluiAtividade({ id: atividade.id })}
                  />
                </CardItem>
              </Card>
            })
          }
        </ScrollView>
      </Content>

      <View style={{ flexDirection: 'row', padding: 20 }}>
        <Button
          block
          onPress={() => this.addAtividade()}
          style={style.btnStyle} >
          <Text>Adicionar Atividade</Text>
        </Button>
        <Button
          block
          onPress={() => this.concluir()}
          style={style.btnStyle} >
          <Text>Concluir</Text>
        </Button>
      </View>

    </Container>
  };
}

const style = {
  btnStyle: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  atividadesRealizadas: state.manutencaoRDOReducer.rdoAtual.atividadesRealizadas
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AtividadesRealizadas)
