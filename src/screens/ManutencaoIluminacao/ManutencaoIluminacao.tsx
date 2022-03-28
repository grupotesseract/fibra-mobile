import React, { Component } from 'react';
import {
  Badge,
  Box,
  FlatList,
  HStack,
  Icon,
  Spinner,
  Pressable,
  Text,
  Divider,
} from 'native-base';
import { Alert } from 'react-native';
import { NavigationScreenProp, withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { ApplicationState } from '../../store';
import { Item, Planta } from '../../store/ducks/planta/types';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import brandColors from '../../theme/brandColors';
import { Ionicons } from '@expo/vector-icons';
import { SquareButton } from '../../components/SquareButton';

interface StateProps {
  plantaAtiva: Planta;
  programacoesRealizadas: ProgramacaoRealizada[];
  navigation: NavigationScreenProp<any, any>;
  isFocused: boolean;
}

interface DispatchProps {
  concluiManutencao({ idProgramacao }): void;
}

type Props = StateProps & DispatchProps;

class ManutencaoIluminacao extends Component<Props> {
  state = {
    itens: [],
    hasCameraPermission: false,
    readingQRCode: false,
    loadingConcluir: false,
    scanned: false,
  };

  async componentDidMount() {
    const imagePickerStatus = await BarCodeScanner.getPermissionsAsync();

    if (imagePickerStatus.status !== 'granted') {
      alert(
        'Atenção com as permissões do app!! Confirme as permissões e cheque se as mesmas estão corretas antes de prosseguir'
      );
      const {
        status,
        expires,
      } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({ hasCameraPermission: status === 'granted' });

      if (expires !== 'never') {
        alert(
          'A permissão liberada não foi a definitiva. O app pode não funcionar corretamente'
        );
      }
    }

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
    const itens = plantaAtiva.itens.map((itemPlanta) => {
      const programacaoItem = programacoesRealizadas.find(
        (p) => p.programacao.id === idProgramacao
      );
      const itensVistoriados = programacaoItem.itensVistoriados || [];
      const itemVistoriado = itensVistoriados.find(
        (item) => item.id_item === itemPlanta.id
      );
      const concluido = !!(itemVistoriado && itemVistoriado.concluido);
      return {
        ...itemPlanta,
        concluido,
      };
    });

    this.setState({ itens });
  };

  ativaQRCodeReader() {
    const { navigation } = this.props;
    navigation.navigate('ScanQRCodeReader');
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
      ]
    );
  };

  handleConcluirManutencao = () => {
    this.setState({ loadingConcluir: true }, async () => {
      const { navigation, concluiManutencao } = this.props;
      const idProgramacao = this.props.plantaAtiva.proximaProgramacao.id;
      await concluiManutencao({ idProgramacao });
      this.setState({ loadingConcluir: false });
      navigation.navigate('Menu');
    });
  };

  concluirManutencaoDia = () => {
    const { navigation } = this.props;
    navigation.navigate('Menu');
  };

  openItem = (item: Item) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: 'ManutencaoItem',
      params: { idItem: item.id },
    });
  };

  renderItem = ({ item }) => {
    return <OptionItem item={item} openItem={this.openItem} />;
  };

  render() {
    const { itens, loadingConcluir } = this.state;

    return (
      <Box padding={7} flex={1}>
        <FlatList
          data={itens}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={<Spinner size='lg' />}
        ></FlatList>
        <HStack space={2}>
          <SquareButton
            onPress={() => this.ativaQRCodeReader()}
            icon={
              <Icon
                color={brandColors.white}
                as={Ionicons}
                name='qr-code'
                size='lg'
              />
            }
            text='LER QRCODE'
          />
          <SquareButton
            onPress={() => this.concluirManutencaoDia()}
            icon={
              <Icon
                color={brandColors.white}
                as={Ionicons}
                name='md-stopwatch'
                size='lg'
              />
            }
            text='CONCLUIR DIA'
          />
          <SquareButton
            onPress={() => this.concluirManutencao()}
            loading={loadingConcluir}
            icon={
              <Icon
                color={brandColors.white}
                as={Ionicons}
                name='md-checkmark'
                size='lg'
              />
            }
            text='CONCLUIR FINAL'
          />
        </HStack>
      </Box>
    );
  }
}

type OptionProps = { item: Item; openItem: (item: Item) => void };
class OptionItem extends Component<OptionProps> {
  shouldComponentUpdate(nextProps, nextState) {
    const concluido = nextProps.item.concluido;
    const prevConcluido = this.props.item.concluido;

    return concluido !== prevConcluido;
  }

  render() {
    const { item, openItem } = this.props;
    const isEmergencia = item.circuito === 'Emergência';
    return (
      <Pressable width='100%' onPress={() => openItem(item)} my={2}>
        <HStack alignItems='center' justifyContent='space-between' space={2}>
          <HStack alignItems='center' flex={1} space={2}>
            {isEmergencia ? (
              <Badge fontSize='md' rounded='full' colorScheme='danger'>
                E
              </Badge>
            ) : (
              <Badge rounded='full' colorScheme='info'>
                N
              </Badge>
            )}
            <Text flexShrink={1}>{item.nome}</Text>
          </HStack>

          <Badge
            colorScheme={item.concluido ? 'success' : 'danger'}
            rounded='full'
            variant='solid'
            style={{ marginLeft: 10, width: 26 }}
          >
            {' '}
          </Badge>
        </HStack>
      </Pressable>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(ManutencaoIluminacao));
