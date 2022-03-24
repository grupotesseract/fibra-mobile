import React, { Component } from 'react';
import {
  Container,
  Text,
  Button,
  View,
  Icon,
  Image,
  Badge,
  Box,
  HStack,
  Stack,
  Pressable,
  Center,
} from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Planta,
  Item as ItemPlanta,
  Material,
} from '../../store/ducks/planta/types';
import { ApplicationState } from '../../store';
import { NavigationScreenProp } from 'react-navigation';
import {
  QuantidadeSubstituida,
  ProgramacaoRealizada,
} from '../../store/ducks/programacoes/types';
import { Ionicons } from '@expo/vector-icons';
import { CardItemManutencao } from '../../components/CardItemManutencao';
import ActionButton from '../../components/ActionButton';

interface StateProps {
  plantaAtiva: Planta;
  programacoesRealizadas: ProgramacaoRealizada[];
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  armazenaQuantidades(
    idProgramacao: number,
    quantidadesSubstituidas: QuantidadeSubstituida[]
  ): void;
  concluiItem({ idItem, idProgramacao, data }): void;
  iniciaItem({ idItem, idProgramacao, data }): void;
}

type Props = StateProps & DispatchProps;

class ManutencaoItem extends Component<Props> {
  state = {
    materiais: [],
    nome: 'Item',
    emergencia: false,
    qrcode: 'FIBRA-#',
    error: false,
    idItem: null,
    permiteAlteracao: false,
  };

  onChangeQuantidade = (idMaterial: number, quantidade: number) => {
    const { materiais } = this.state;

    const novosMateriais = materiais.map((material: Material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidade,
      };
    });
    this.setState({ materiais: novosMateriais });
  };

  onChangeQuantidadeBase = (idMaterial: number, quantidadeBase: number) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material: Material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeBase,
      };
    });
    this.setState({ materiais: novosMateriais });
  };

  onChangeQuantidadeReator = (idMaterial: number, quantidadeReator: number) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material: Material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeReator,
      };
    });
    this.setState({ materiais: novosMateriais });
  };

  onPressBotaoOK = (idMaterial: number, quantidadeConfirmada: boolean) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeConfirmada: !quantidadeConfirmada,
      };
    });
    this.setState({ materiais: novosMateriais });
  };

  salvaQuantidades = async (idItem: number) => {
    const { armazenaQuantidades, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const { materiais } = this.state;

    let quantidadesSubstituidas: QuantidadeSubstituida[];
    quantidadesSubstituidas = materiais.map((material) => {
      return {
        material_id: material.id,
        item_id: idItem,
        reator_id: material.reator_id,
        base_id: material.base_id,
        quantidade_substituida: material.quantidade || 0,
        quantidade_substituida_base: material.quantidadeBase || 0,
        quantidade_substituida_reator: material.quantidadeReator || 0,
      };
    });

    await armazenaQuantidades(idProgramacao, quantidadesSubstituidas);
  };

  verFotosItem = async (idItem: number) => {
    const { navigation } = this.props;
    await this.salvaQuantidades(idItem);
    navigation.navigate({ routeName: 'FotosItem', params: { idItem: idItem } });
  };

  editarComentarioItem = async (idItem: number) => {
    const { navigation } = this.props;
    await this.salvaQuantidades(idItem);
    navigation.navigate({
      routeName: 'ComentariosGerais',
      params: { idItem: idItem },
    });
  };

  concluirItem = async (idItem: number) => {
    const { navigation, concluiItem, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    await this.salvaQuantidades(idItem);
    const data = new Date().toISOString();
    await concluiItem({ idItem, idProgramacao, data });
    navigation.navigate({ routeName: 'ManutencaoIluminacao' });
  };

  iniciarItem = async (idItem: number) => {
    const { iniciaItem, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const data = new Date().toISOString();
    await iniciaItem({ idItem, idProgramacao, data });
  };

  componentDidMount() {
    const { plantaAtiva, programacoesRealizadas, navigation } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const programacao = programacoesRealizadas.find(
      (p: ProgramacaoRealizada) => p.programacao.id === idProgramacao
    );
    const { idItem, qrcode } = navigation.state.params;
    const { itens } = plantaAtiva;
    let item: ItemPlanta;
    if (idItem) {
      item = itens.find((item) => item.id === idItem);
    } else if (qrcode) {
      item = itens.find((item) => item.qrcode === qrcode);
      this.setState({ permiteAlteracao: true });
    }
    if (item) {
      const { materiais, circuito, qrcode, nome, id } = item;
      let materiaisComQuantidade = materiais;
      if (programacao) {
        materiaisComQuantidade = materiais.map((m: Material) => {
          const materialPreenchido = programacao.quantidadesSubstituidas.find(
            (q) => q.material_id === m.id && q.item_id === id
          );
          if (!materialPreenchido) {
            return m;
          }
          return {
            ...m,
            quantidade: materialPreenchido.quantidade_substituida,
            quantidadeConfirmada: true,
            quantidadeBase: materialPreenchido.quantidade_substituida_base,
            quantidadeReator: materialPreenchido.quantidade_substituida_reator,
          };
        });
      }
      this.setState({
        materiais: materiaisComQuantidade,
        qrcode,
        emergencia: circuito === 'Emergência',
        nome,
        idItem: item.id,
      });
      this.iniciarItem(id);
    } else {
      this.setState({
        error:
          'Não foi possível carregar este Item. Verifique se o item se encontra na planta selecionada para esta manutenção.',
      });
    }
    this.props.navigation.setParams({ verTodosMateriais: this.verTodosMateriais });
  }

  verTodosMateriais = () => {
    const { navigation } = this.props;
    const { idItem, permiteAlteracao, error } = this.state;
    !error && permiteAlteracao && navigation.navigate('TodosMateriaisItem', { idItem });
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <Pressable
          marginRight={3}
          onPress={navigation.getParam('verTodosMateriais')}
        >
          <Stack alignItems='center'>
            <Icon name='md-git-compare' as={Ionicons} color='white' size='sm' />
            <Text fontSize='sm' color='white'>Editar</Text>
          </Stack>
        </Pressable>
      ),
    }
  };

  render() {
    const {
      error,
      materiais,
      qrcode,
      emergencia,
      nome,
      idItem,
      permiteAlteracao,
    } = this.state;

    const { plantaAtiva, programacoesRealizadas } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const programacao = programacoesRealizadas.find(
      (p: ProgramacaoRealizada) => p.programacao.id === idProgramacao
    );

    const { fotosItens } = programacao;
    const fotosItem = fotosItens?.find(
      (fotoItem) => fotoItem.id_item === idItem
    );
    const qtdFotos = fotosItem?.fotos?.length || 0;

    if (error) {
      return (
        <Center>
          <Text>{error}</Text>
        </Center>
      );
    }

    return (
      <Box padding={7} flex={1}>
        <ScrollView>
          <Stack space={2}>
            <HStack space={2} borderColor="transparent" borderWidth="1" shadow={1} padding={4} mb={2} alignItems='center'>
              <Image size='sm' rounded='full' source={require('../../../assets/qrcode.png')} alt='qrcode image placeholder' />
              <Stack flex={1}>
                <HStack alignItems='center' justifyContent='space-between'>
                  <Text>{qrcode}</Text>
                  <Badge rounded='full' colorScheme={emergencia ? 'danger' : 'info'} >{emergencia ? 'E' : 'N'}
                  </Badge>
                </HStack>
                <Text>{nome}</Text>
              </Stack>
            </HStack>
            {materiais?.map((material: Material) => {
              return (
                <CardItemManutencao
                  key={material.id}
                  material={material}
                  onChangeQuantidade={this.onChangeQuantidade}
                  onChangeQuantidadeBase={this.onChangeQuantidadeBase}
                  onChangeQuantidadeReator={this.onChangeQuantidadeReator}
                  permiteAlteracao={permiteAlteracao}
                  onPressBotaoOK={this.onPressBotaoOK}
                />
              );
            })}
            <HStack space={2}>
              <ActionButton
                onPress={() => this.verFotosItem(idItem)}
                flex={1}
                variant='outline'
                startIcon={<Icon as={Ionicons} name='images' />}
                isDisabled={
                  !materiais.reduce((tudoConfirmado, material) => {
                    return tudoConfirmado && material.quantidadeConfirmada;
                  }, true)
                }
              >
                Fotos
              </ActionButton>
              <ActionButton
                onPress={() => this.editarComentarioItem(idItem)}
                flex={1}
                variant='outline'
                startIcon={<Icon as={Ionicons} name='chatbox' />}
                isDisabled={
                  !materiais.reduce((tudoConfirmado, material) => {
                    return tudoConfirmado && material.quantidadeConfirmada;
                  }, true)
                }
              >
                Comentário
              </ActionButton>
            </HStack>
            <ActionButton
              onPress={() => this.concluirItem(idItem)}
              isDisabled={
                !materiais.reduce((tudoConfirmado, material) => {
                  return tudoConfirmado && material.quantidadeConfirmada;
                }, true) || qtdFotos === 0
              }
            >
              Concluído
            </ActionButton>
          </Stack>
        </ScrollView>
      </Box>
    );
  }
}


const style = {
  btnStyle: {
    marginVertical: 5,
  },
  itemSubstituicao: {
    marginVertical: 2,
    borderBottomColor: 'transparent',
  },
};

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManutencaoItem);
