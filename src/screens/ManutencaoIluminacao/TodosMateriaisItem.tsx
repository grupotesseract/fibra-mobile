import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Body, Text, Label, Item, Button, View, Icon, Left, Thumbnail, Badge, Right } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import * as PlantaActions from '../../store/ducks/planta/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Planta, Item as ItemPlanta, Material } from '../../store/ducks/planta/types';
import { ApplicationState } from '../../store';
import { NavigationScreenProp } from 'react-navigation';
import { QuantidadeSubstituida, ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import IncluirMaterialAoItem from './IncluirMaterialAoItem';

interface StateProps {
  plantaAtiva: Planta,
  programacoesRealizadas: ProgramacaoRealizada[],
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  setItemAlterado({ idProgramacao, idItem, materiaisAlterados }): void
  setTodosMateriaisItem({ idItem, todosMateriais }): void
}

type Props = StateProps & DispatchProps

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
  }

  onChangeQuantidadeInstalada = (idMaterial: number, quantidadeInstalada: number) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material: Material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeInstalada
      }
    })
    this.setState({ materiais: novosMateriais })
  }

  onChangeQuantidadeBase = (idMaterial: number, quantidadeBase: number) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material: Material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeBase
      }
    })
    this.setState({ materiais: novosMateriais })
  }

  onChangeQuantidadeReator = (idMaterial: number, quantidadeReator: number) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material: Material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeReator
      }
    })
    this.setState({ materiais: novosMateriais })
  }

  onPressBotaoOK = (idMaterial: number, quantidadeConfirmada: boolean) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map(material => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeConfirmada: !quantidadeConfirmada
      }
    })
    this.setState({ materiais: novosMateriais })
  }

  salvaQuantidades = async () => {
    const { setItemAlterado, plantaAtiva, navigation } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const { materiais, idItem } = this.state;
    await setItemAlterado({
      idProgramacao,
      idItem,
      materiaisAlterados: materiais
    });

    navigation.goBack();
  }

  handleIncluirMaterial = async (material) => {
    const { materiais, idItem } = this.state;
    const { setTodosMateriaisItem } = this.props;
    materiais.push(material);
    await setTodosMateriaisItem({
      idItem,
      todosMateriais: materiais,
    })

    this.setState({ incluindoMaterial: false })
  }

  componentDidMount() {
    const { plantaAtiva, navigation } = this.props;
    const { idItem, qrcode } = navigation.state.params;
    const { itens } = plantaAtiva;
    let item: ItemPlanta;
    if (idItem) {
      item = itens.find(item => item.id === idItem);
    } else if (qrcode) {
      item = itens.find(item => item.qrcode === qrcode);
    }
    this.setState({permiteAlteracao : true});
    if (item) {
      const { todosMateriais, circuito, qrcode, nome, id } = item;
      const { programacoesRealizadas } = this.props;
      const idProgramacao = plantaAtiva.proximaProgramacao.id;
      const programacao = programacoesRealizadas?.find(pr => pr.programacao.id === idProgramacao)
      const { itensAlterados } = programacao;
      const itemAlterado = itensAlterados?.find(item => item.item_id === id);

      const materiais = todosMateriais.map(material => {
        let { quantidadeInstalada } = material;
        let quantidadeConfirmada = false;
        //Busca se material já foi alterado para esta programacao
        const materialAlterado = itemAlterado?.materiais?.find(materialAlterado => materialAlterado.id === material.id)
        if(materialAlterado) {
          quantidadeInstalada = materialAlterado.quantidadeInstalada;
          quantidadeConfirmada = true;
        }
        return {
          ...material,
          quantidadeInstalada,
          quantidadeConfirmada,
        }
      });


      this.setState({
        materiais,
        qrcode,
        emergencia: circuito === 'Emergência',
        nome,
        idItem: item.id
      });
    } else {
      this.setState({
        error: 'Não foi possível carregar este Item. Verifique se o item se encontra na planta selecionada para esta manutenção.'
      })
    }
  }

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
      return <Container>
        <HeaderNav title={nome + ' - Materiais'} />
        <Content padder>
          <Text>{error}</Text>
        </Content>
      </Container>
    }

    return (
      <Container padder>
        <HeaderNav title={nome + " - Materiais"} />
        <Content padder>
          <KeyboardAvoidingView behavior="height">
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={require("../../../assets/qrcode.png")} />
                  <Body>
                    <Text note>{qrcode}</Text>
                    <Text note>{nome}</Text>
                    <Badge warning={emergencia} primary={!emergencia}>
                      <Text>{emergencia ? "E" : "N"}</Text>
                    </Badge>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <ScrollView>
              {materiais?.map((material: Material) => {
                return (
                  <Card key={material.id}>
                    <CardItem header bordered>
                      <Text>
                        {material.nome
                          ? material.nome
                          : material.tipoMaterialTipo?.toUpperCase()}
                      </Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <View
                          style={{
                            marginBottom: 5,
                            borderBottomWidth: 0,
                            paddingBottom: 5
                          }}
                        >
                          <Text>Tipo: {material.tipoMaterial}</Text>
                          {material.base && <Text>Base: {material.base}</Text>}
                          {material.reator && (
                            <Text>Reator : {material.reator}</Text>
                          )}
                        </View>
                        {material.potencia && (
                          <Text>Potência: {material.potencia}</Text>
                        )}
                        {material.tensao && (
                          <Text>Tensão: {material.tensao}</Text>
                        )}
                      </Body>
                    </CardItem>
                    <CardItem
                      footer
                      bordered
                      style={{ flexDirection: "column" }}
                    >
                      <Text style={{ marginVertical: 3 }}>Trocas</Text>

                      <Item style={style.itemSubstituicao}>
                        <Left>
                          <Label>Qtd. Instalada:</Label>
                        </Left>
                        <Right>
                          <NumericInput
                            minValue={0}
                            step={Number(!material.quantidadeConfirmada)}
                            editable={false}
                            rounded={true}
                            value={material.quantidadeInstalada}
                            onChange={quantidade =>
                              this.onChangeQuantidadeInstalada(
                                material.id,
                                quantidade
                              )
                            }
                          />
                        </Right>
                      </Item>

                      {material.base &&
                        <Item style={style.itemSubstituicao}>
                          <Left>
                            <Label>Qtd. Base:</Label>
                          </Left>
                          <Right>
                            <NumericInput
                              minValue={0}
                              step={Number(!material.quantidadeConfirmada)}
                              editable={false}
                              rounded={true}
                              value={material.quantidadeBase}
                              onChange={quantidadeBase =>
                                this.onChangeQuantidadeBase(
                                  material.id,
                                  quantidadeBase
                                )
                              }
                            />
                          </Right>
                        </Item>
                      }

                      {material.reator &&
                        <Item style={style.itemSubstituicao}>
                          <Left>
                            <Label>Qtd. Base:</Label>
                          </Left>
                          <Right>
                            <NumericInput
                              minValue={0}
                              step={Number(!material.quantidadeConfirmada)}
                              editable={false}
                              rounded={true}
                              value={material.quantidadeReator}
                              onChange={quantidadeReator =>
                                this.onChangeQuantidadeReator(
                                  material.id,
                                  quantidadeReator
                                )
                              }
                            />
                          </Right>
                        </Item>
                      }

                      <Item style={style.itemSubstituicao}>
                        <Button
                          small
                          disabled={!permiteAlteracao}
                          rounded={true}
                          warning={
                            !material.quantidadeConfirmada && permiteAlteracao
                          }
                          success={
                            material.quantidadeConfirmada && permiteAlteracao
                          }
                          onPress={() =>
                            this.onPressBotaoOK(
                              material.id,
                              material.quantidadeConfirmada
                            )
                          }
                        >
                          <Text>Confirmar</Text>
                        </Button>
                      </Item>
                    </CardItem>
                  </Card>
                );
              })}
            </ScrollView>
            {incluindoMaterial ? (
              <IncluirMaterialAoItem
                incluirMaterial={this.handleIncluirMaterial}
                cancelarInclusao={() => this.setState({ incluindoMaterial: false })}
              />
            ) : (
              <Button
                block
                light
                onPress={() => this.setState({ incluindoMaterial: true })}
                style={style.btnStyle}
              >
                <Text>Incluir Material</Text>
              </Button>
            )}
            <Button
              block
              onPress={() => this.salvaQuantidades()}
              style={style.btnStyle}
              disabled={
                !materiais.reduce((tudoConfirmado, material) => {
                  return tudoConfirmado && material.quantidadeConfirmada;
                }, true) || incluindoMaterial
              }
            >
              <Text>Concluído</Text>
            </Button>
          </KeyboardAvoidingView>
        </Content>
      </Container>
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
}

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas : state.programacoesReducer.programacoesRealizadas
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...ProgramacoesActions, ...PlantaActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodosMateriaisItem)
