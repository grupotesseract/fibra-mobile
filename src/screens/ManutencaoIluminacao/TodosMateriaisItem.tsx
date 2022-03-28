import React, { Component } from 'react';
import { Box, Text, Button, Image, Stack, HStack, Divider } from 'native-base';
import { ScrollView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import * as PlantaActions from '../../store/ducks/planta/actions';
import {
  Planta,
  Item as ItemPlanta,
  Material,
} from '../../store/ducks/planta/types';
import { ApplicationState } from '../../store';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import IncluirMaterialAoItem from './IncluirMaterialAoItem';
import ActionButton from '../../components/ActionButton';

interface StateProps {
  plantaAtiva: Planta;
  programacoesRealizadas: ProgramacaoRealizada[];
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  setItemAlterado({ idProgramacao, idItem, materiaisAlterados }): void;
  setTodosMateriaisItem({ idItem, todosMateriais }): void;
}

type Props = StateProps & DispatchProps;

class TodosMateriaisItem extends Component<Props> {
  state = {
    materiais: [],
    nome: 'Item',
    emergencia: false,
    qrcode: 'FIBRA-#',
    error: false,
    idItem: null,
    permiteAlteracao: false,
    incluindoMaterial: false,
  };

  onChangeQuantidadeInstalada = (
    idMaterial: number,
    quantidadeInstalada: number
  ) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material: Material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeInstalada,
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

  salvaQuantidades = async () => {
    const { setItemAlterado, plantaAtiva, navigation } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const { materiais, idItem } = this.state;
    await setItemAlterado({
      idProgramacao,
      idItem,
      materiaisAlterados: materiais,
    });

    navigation.goBack();
  };

  handleIncluirMaterial = async (material) => {
    const { materiais, idItem } = this.state;
    const { setTodosMateriaisItem } = this.props;
    materiais.push(material);
    await setTodosMateriaisItem({
      idItem,
      todosMateriais: materiais,
    });

    this.setState({ incluindoMaterial: false });
  };

  componentDidMount() {
    const { plantaAtiva, navigation } = this.props;
    const { idItem, qrcode } = navigation.state.params;
    const { itens } = plantaAtiva;
    let item: ItemPlanta;
    if (idItem) {
      item = itens.find((item) => item.id === idItem);
    } else if (qrcode) {
      item = itens.find((item) => item.qrcode === qrcode);
    }
    this.setState({ permiteAlteracao: true });
    if (item) {
      const { todosMateriais, circuito, qrcode, nome, id } = item;
      const { programacoesRealizadas } = this.props;
      const idProgramacao = plantaAtiva.proximaProgramacao.id;
      const programacao = programacoesRealizadas?.find(
        (pr) => pr.programacao.id === idProgramacao
      );
      const { itensAlterados } = programacao;
      const itemAlterado = itensAlterados?.find((item) => item.item_id === id);

      const materiais = todosMateriais.map((material) => {
        let { quantidadeInstalada } = material;
        let quantidadeConfirmada = false;
        //Busca se material já foi alterado para esta programacao
        const materialAlterado = itemAlterado?.materiais?.find(
          (materialAlterado) => materialAlterado.id === material.id
        );
        if (materialAlterado) {
          quantidadeInstalada = materialAlterado.quantidadeInstalada;
          quantidadeConfirmada = true;
        }
        return {
          ...material,
          quantidadeInstalada,
          quantidadeConfirmada,
        };
      });

      this.setState({
        materiais,
        qrcode,
        emergencia: circuito === 'Emergência',
        nome,
        idItem: item.id,
      });
      this.props.navigation.setParams({ nome: item.nome });
    } else {
      this.setState({
        error:
          'Não foi possível carregar este Item. Verifique se o item se encontra na planta selecionada para esta manutenção.',
      });
    }
  }

  static navigationOptions = ({ navigation }) => {
    const nome = navigation.getParam('nome');
    return {
      title: `${nome} - Materiais`,
    };
  };

  render() {
    const {
      error,
      materiais,
      qrcode,
      emergencia,
      nome,
      permiteAlteracao,
      incluindoMaterial,
    } = this.state;
    if (error) {
      return (
        <Box padding={7} flex={1}>
          <Text>{error}</Text>
        </Box>
      );
    }

    return (
      <Box padding={7} flex={1}>
        <ScrollView>
          <Stack space={2}>
            <HStack
              space={2}
              borderColor='transparent'
              borderWidth='1'
              shadow={1}
              padding={4}
              mb={2}
              alignItems='center'
            >
              <Image
                size='sm'
                rounded='full'
                source={require('../../../assets/qrcode.png')}
                alt='qrcode image placeholder'
              />
              <Stack flex={1}>
                <Text>{qrcode}</Text>
                <Text>{nome}</Text>
              </Stack>
            </HStack>
            {materiais?.map((material: Material) => {
              return (
                <Stack
                  key={material.id}
                  space={2}
                  borderColor='transparent'
                  borderWidth='1'
                  shadow={1}
                  padding={4}
                >
                  <Text color='primary.600' bold mb={2}>
                    {material.nome
                      ? material.nome
                      : material.tipoMaterialTipo?.toUpperCase()}
                  </Text>
                  <Divider />
                  <Stack>
                    <Text>Tipo: {material.tipoMaterial}</Text>
                    {material.base && <Text>Base: {material.base}</Text>}
                    {material.reator && <Text>Reator : {material.reator}</Text>}
                  </Stack>
                  <Stack>
                    {material.potencia && (
                      <Text>Potência: {material.potencia}</Text>
                    )}
                    {material.tensao && <Text>Tensão: {material.tensao}</Text>}
                  </Stack>
                  <Divider />

                  <HStack marginTop={3} space={2} alignItems='center'>
                    <Text>Qtd. Instalada:</Text>
                    <NumericInput
                      minValue={0}
                      step={Number(!material.quantidadeConfirmada)}
                      editable={false}
                      rounded={true}
                      value={material.quantidadeInstalada}
                      onChange={(quantidade) =>
                        this.onChangeQuantidadeInstalada(
                          material.id,
                          quantidade
                        )
                      }
                    />
                  </HStack>

                  {material.base && material.novoMaterial && (
                    <HStack marginTop={3} space={2} alignItems='center'>
                      <Text>Qtd. Base:</Text>
                      <NumericInput
                        minValue={0}
                        step={Number(!material.quantidadeConfirmada)}
                        editable={false}
                        rounded={true}
                        value={material.quantidadeBase}
                        onChange={(quantidadeBase) =>
                          this.onChangeQuantidadeBase(
                            material.id,
                            quantidadeBase
                          )
                        }
                      />
                    </HStack>
                  )}

                  {material.reator && material.novoMaterial && (
                    <HStack marginTop={3} space={2} alignItems='center'>
                      <Text>Qtd. Base:</Text>
                      <NumericInput
                        minValue={0}
                        step={Number(!material.quantidadeConfirmada)}
                        editable={false}
                        rounded={true}
                        value={material.quantidadeReator}
                        onChange={(quantidadeReator) =>
                          this.onChangeQuantidadeReator(
                            material.id,
                            quantidadeReator
                          )
                        }
                      />
                    </HStack>
                  )}

                  <Button
                    margin={3}
                    size='lg'
                    rounded='2xl'
                    alignContent='center'
                    isDisabled={!permiteAlteracao}
                    colorScheme={
                      material.quantidadeConfirmada && permiteAlteracao
                        ? 'success'
                        : 'warning'
                    }
                    onPress={() =>
                      this.onPressBotaoOK(
                        material.id,
                        material.quantidadeConfirmada
                      )
                    }
                  >
                    Confirmar
                  </Button>
                </Stack>
              );
            })}
            {incluindoMaterial ? (
              <IncluirMaterialAoItem
                incluirMaterial={this.handleIncluirMaterial}
                cancelarInclusao={() =>
                  this.setState({ incluindoMaterial: false })
                }
              />
            ) : (
              <ActionButton
                variant='outline'
                onPress={() => this.setState({ incluindoMaterial: true })}
                style={style.btnStyle}
              >
                Incluir Material
              </ActionButton>
            )}
            <ActionButton
              onPress={() => this.salvaQuantidades()}
              style={style.btnStyle}
              isDisabled={
                !materiais.reduce((tudoConfirmado, material) => {
                  return tudoConfirmado && material.quantidadeConfirmada;
                }, true) || incluindoMaterial
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
  bindActionCreators({ ...ProgramacoesActions, ...PlantaActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodosMateriaisItem);
