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

class ManutencaoItem extends Component<Props> {

  state = {
    materiais: [],
    nome: 'Item',
    emergencia: false,
    qrcode: 'FIBRA-#',
    error: false,
    idItem: null,
    permiteAlteracao: false,
  }

  onChangeQuantidade = (idMaterial: number, quantidade: number) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material: Material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidade
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

  verFotosItem = async (idItem: number) => {
    const { navigation } = this.props;
    await this.salvaQuantidades(idItem);
    navigation.navigate({ routeName: 'FotosItem', params: { idItem: idItem } })
  }

  editarComentarioItem = async (idItem: number) => {
    const { navigation } = this.props;
    await this.salvaQuantidades(idItem);
    navigation.navigate({ routeName: 'ComentariosGerais', params: { idItem: idItem } })
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
    const { plantaAtiva, programacoesRealizadas, navigation } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const programacao = programacoesRealizadas.find( (p: ProgramacaoRealizada) => p.programacao.id === idProgramacao);
    const { idItem, qrcode } = navigation.state.params;
    const { itens } = plantaAtiva;
    let item: ItemPlanta;
    if (idItem) {
      item = itens.find(item => item.id === idItem);
    } else if (qrcode) {
      item = itens.find(item => item.qrcode === qrcode);
      this.setState({permiteAlteracao : true});
    }
    if (item) {
      const { materiais, circuito, qrcode, nome, id } = item;
      let materiaisComQuantidade = materiais;
      if (programacao) {
        materiaisComQuantidade = materiais.map( (m: Material) => {
          const materialPreenchido = programacao.quantidadesSubstituidas
            .find( q => q.material_id === m.id && q.item_id === id);
          if (!materialPreenchido) {
            return m;
          }
          return {
            ...m,
            quantidade: materialPreenchido.quantidade_substituida,
            quantidadeConfirmada: true,
            quantidadeBase: materialPreenchido.quantidade_substituida_base,
            quantidadeReator: materialPreenchido.quantidade_substituida_reator,
          }
        })
      }
      this.setState({
        materiais: materiaisComQuantidade,
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

  verTodosMateriais = () => {
    const { navigation } = this.props;
    const { idItem, permiteAlteracao } = this.state;

    permiteAlteracao && navigation.navigate('TodosMateriaisItem', { idItem });
  }

  botaoTodosMateriais = (
    <Button
      transparent
      style={{
        paddingRight:0,
        flexDirection: 'column',
        alignItems: 'center'
      }}
      onPress={this.verTodosMateriais}
      >
      <Icon name="md-git-compare" style={{color: 'white'}}/>
      <Text style={{fontSize: 10, marginLeft: -12 }}>Editar</Text>
    </Button>
  );

  render() {
    const { error, materiais, qrcode, emergencia, nome, idItem, permiteAlteracao } = this.state;

    const { plantaAtiva, programacoesRealizadas } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const programacao = programacoesRealizadas.find( (p: ProgramacaoRealizada) => p.programacao.id === idProgramacao);

    const { fotosItens } = programacao;
    const fotosItem = fotosItens ?.find(fotoItem => fotoItem.id_item === idItem);
    const qtdFotos = fotosItem ?.fotos ?.length || 0;

    if (error) {
      return <Container>
        <HeaderNav title={'Manutenção'} />
        <Content padder>
          <Text>{error}</Text>
        </Content>
      </Container>
    }

    return (
      <Container padder>
        <HeaderNav title={'Manutenção'} rightContent={this.botaoTodosMateriais}/>
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
                  return (
                    <OptionItem
                      material = {material}
                      onChangeQuantidade = {this.onChangeQuantidade}
                      onChangeQuantidadeBase = {this.onChangeQuantidadeBase}
                      onChangeQuantidadeReator = {this.onChangeQuantidadeReator}
                      permiteAlteracao = {permiteAlteracao}
                      onPressBotaoOK = {this.onPressBotaoOK }
                    />
                  )
                })
            }
            </ScrollView>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <Button
                onPress={() => this.verFotosItem(idItem)}
                style={{ flex: 1, marginRight: 3 }}
                iconLeft
                bordered
                disabled={!materiais.reduce((tudoConfirmado, material) => {
                  return tudoConfirmado
                    && material.quantidadeConfirmada
                }, true)}
              >
                <Icon name="md-photos" />
                <Text>Fotos</Text>
              </Button>
              <Button
                onPress={() => this.editarComentarioItem(idItem)}
                style={{ flex: 1, marginLeft: 3 }}
                iconLeft
                bordered
                disabled={!materiais.reduce((tudoConfirmado, material) => {
                  return tudoConfirmado
                    && material.quantidadeConfirmada
                }, true)}
              >
                <Icon name="md-chatboxes" />
                <Text>Comentário</Text>
              </Button>
            </View>
            <Button
              block
              onPress={() => this.concluirItem(idItem)}
              style={style.btnStyle}
              disabled={!materiais.reduce((tudoConfirmado, material) => {
                return tudoConfirmado
                  && material.quantidadeConfirmada
              }, true) || qtdFotos === 0}
            >
              <Text>Concluído</Text>
            </Button>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

class OptionItem extends Component {

  shouldComponentUpdate(nextProps, nextState){
    const quantidade  = nextProps.material.quantidade;
    const prevQuantidade = this.props.material.quantidade;

    const quantidadeBase  = nextProps.material.quantidadeBase;
    const prevQuantidadeBase = this.props.material.quantidadeBase;

    const quantidadeReator  = nextProps.material.quantidadeReator;
    const prevQuantidadeReator = this.props.material.quantidadeReator;

    const quantidadeConfirmada = nextProps.material.quantidadeConfirmada;
    const prevQuantidadeConfirmada = this.props.material.quantidadeConfirmada;

    return (quantidade !== prevQuantidade || quantidadeConfirmada !== prevQuantidadeConfirmada
        || quantidadeBase !== prevQuantidadeBase || quantidadeReator !== prevQuantidadeReator);
  }

  render () {
    const { material, onChangeQuantidadeBase, onChangeQuantidadeReator, onChangeQuantidade, onPressBotaoOK, permiteAlteracao } = this.props;

    return (
      <Card key={material.id}>
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
            <Text>Quantidade Instalada: {material.quantidadeInstalada}</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered style={{ flexDirection: 'column' }}>
          <Text style={{ marginVertical: 3 }}>Trocas</Text>
          {material.base &&
            <Item style={style.itemSubstituicao}>
              <Left>
                <Label>Bases:</Label>
              </Left>
              <Right>
                <NumericInput
                  minValue={0}
                  step={+!material.quantidadeConfirmada}
                  editable={false}
                  rounded={true}
                  value={material.quantidadeBase}
                  onChange={quantidade => onChangeQuantidadeBase(material.id, quantidade)} />
              </Right>
            </Item>
          }
          {material.reator &&
            <Item style={style.itemSubstituicao}>
              <Left>
                <Label>Reatores:</Label>
              </Left>
              <Right>
                <NumericInput
                  minValue={0}
                  step={+!material.quantidadeConfirmada}
                  editable={false}
                  rounded={true}
                  value={material.quantidadeReator}
                  onChange={quantidade => onChangeQuantidadeReator(material.id, quantidade)} />
              </Right>
            </Item>
          }
          <Item style={style.itemSubstituicao}>
            <Left>
              <Label>Lâmpadas:</Label>
            </Left>
            <Right>
              <NumericInput
                minValue={0}
                step={+!material.quantidadeConfirmada}
                editable={false}
                rounded={true}
                value={material.quantidade}
                onChange={quantidade => onChangeQuantidade(material.id, quantidade)} />
            </Right>

          </Item>
          <Item style={style.itemSubstituicao}>
            <Button
              small
              disabled={!permiteAlteracao}
              rounded={true}
              warning={!material.quantidadeConfirmada && permiteAlteracao}
              success={material.quantidadeConfirmada && permiteAlteracao}
              onPress={() => onPressBotaoOK(material.id, material.quantidadeConfirmada)} >
              <Text>Confirmar</Text>
            </Button>
          </Item>
        </CardItem>
      </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManutencaoItem)
