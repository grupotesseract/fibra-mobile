import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Body, Text, Label, Item, Button, View, Icon, Left, Thumbnail, Badge, Right } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Planta, Item as ItemPlanta, Material } from '../../store/ducks/planta/types';
import { ApplicationState } from '../../store';
import { NavigationScreenProp } from 'react-navigation';
import { QuantidadeSubstituida, ProgramacaoRealizada } from '../../store/ducks/programacoes/types';

interface StateProps {
  plantaAtiva: Planta,
  programacoesRealizadas: ProgramacaoRealizada[],
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  armazenaQuantidades(idProgramacao: number, quantidadesSubstituidas: QuantidadeSubstituida[]): void
  concluiItem({ idItem, idProgramacao, data }): void
  iniciaItem({ idItem, idProgramacao, data }): void
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

  salvaQuantidades = async (idItem: number) => {
    const { armazenaQuantidades, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const { materiais } = this.state;

    let quantidadesSubstituidas: QuantidadeSubstituida[];
    quantidadesSubstituidas = materiais.map( material => {
      return {
        material_id: material.id,
        item_id: idItem,
        reator_id: material.reator_id,
        base_id: material.base_id,
        quantidade_substituida: material.quantidade || 0,
        quantidade_substituida_base: material.quantidadeBase || 0,
        quantidade_substituida_reator: material.quantidadeReator || 0,
      }
    })

    await armazenaQuantidades(idProgramacao, quantidadesSubstituidas);
  }

  concluirItem = async (idItem: number) => {
    const { navigation, concluiItem, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    await this.salvaQuantidades(idItem);
    const data = new Date().toISOString();
    await concluiItem({ idItem, idProgramacao, data });
    navigation.navigate({ routeName: 'ManutencaoIluminacao' })
  }

  iniciarItem = async (idItem: number) => {
    const { iniciaItem, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const data = new Date().toISOString();
    await iniciaItem({ idItem, idProgramacao, data });
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
      this.setState({
        materiais: todosMateriais.map(m => ({ ...m, quantidadeConfirmada: false})),
        qrcode,
        emergencia: circuito === 'Emergência',
        nome,
        idItem: item.id
      });
      this.iniciarItem(id);
    } else {
      this.setState({
        error: 'Não foi possível carregar este Item. Verifique se o item se encontra na planta selecionada para esta manutenção.'
      })
    }
  }

  render() {
    const { error, materiais, qrcode, emergencia, nome, idItem, permiteAlteracao } = this.state;

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
        <HeaderNav title={nome + ' - Materiais'}/>
        <Content padder>
          <KeyboardAvoidingView
            behavior="height">
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={require('../../../assets/qrcode.png')} />
                  <Body>
                    <Text note>{qrcode}</Text>
                    <Text note>{nome}</Text>
                    <Badge
                      warning={emergencia}
                      primary={!emergencia}>
                      <Text>{emergencia ? 'E' : 'N'}</Text>
                    </Badge>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <ScrollView>
              {
                materiais?.map((material: Material) => {
                  return <Card key={material.id}>
                    <CardItem header bordered>
                      <Text>LÂMPADA</Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <View style={{ marginBottom: 5, borderBottomWidth: 0, paddingBottom: 5 }}>
                          <Text>Tipo: {material.tipoMaterial}</Text>
                          {material.base && <Text>Base: {material.base}</Text>}
                          {material.reator && <Text>Reator : {material.reator}</Text>}
                        </View>
                        {material.potencia && <Text>Potência: {material.potencia}</Text>}
                        {material.tensao && <Text>Tensão: {material.tensao}</Text>}
                      </Body>
                    </CardItem>
                    <CardItem footer bordered style={{ flexDirection: 'column' }}>
                      <Text style={{ marginVertical: 3 }}>Trocas</Text>
                      {material.quantidadeInstalada &&
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
                              onChange={quantidade => this.onChangeQuantidadeInstalada(material.id, quantidade)} />
                          </Right>
                        </Item>
                      }
                      <Item style={style.itemSubstituicao}>
                        <Button
                          small
                          disabled={!permiteAlteracao}
                          rounded={true}
                          warning={!material.quantidadeConfirmada && permiteAlteracao}
                          success={material.quantidadeConfirmada && permiteAlteracao}
                          onPress={() => this.onPressBotaoOK(material.id, material.quantidadeConfirmada)} >
                          <Text>Confirmar</Text>
                        </Button>
                      </Item>
                    </CardItem>
                  </Card>
                })
            }
            </ScrollView>
            <Button
              block
              onPress={() => this.concluirMateriaisItem(idItem)}
              style={style.btnStyle}
              disabled={!materiais.reduce((tudoConfirmado, material) => {
                return tudoConfirmado
                  && material.quantidadeConfirmada
              }, true)}
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
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodosMateriaisItem)
