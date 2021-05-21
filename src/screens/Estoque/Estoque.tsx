import React, { Component } from 'react';
import { Container, Content, Button, Text, Card, CardItem, Body, Item, Label } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { ApplicationState } from '../../store';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Planta } from '../../store/ducks/planta/types';
import { NavigationScreenProp } from 'react-navigation';
import { Estoque } from '../../store/ducks/programacoes/types';

interface StateProps {
  plantaAtiva: Planta,
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  armazenaEstoque(idProgramacao: number, estoques: Estoque[]): void
}

type Props = StateProps & DispatchProps

class EstoqueScreen extends Component<Props> {
    state = {
        materiais: [],
        page: 0
    }

    loadRepositories = async () => {
      const { plantaAtiva } = this.props;
      const { page } = this.state;
      const { materiais } = this.state;
      const { estoque } = plantaAtiva;

      let pageFrom = page + 1;
      let pageTo = pageFrom + 3;

      const estoqueAux = materiais.concat(estoque.slice(pageFrom, pageTo));
      console.log(estoqueAux);
      this.setState({ materiais: estoqueAux, page: pageTo + 1 })
    }

    componentDidMount() {
      const { plantaAtiva } = this.props;
      const { page } = this.state;
      const { estoque } = plantaAtiva;
      const estoqueAux = estoque.slice(0, page + 6);
      this.setState({ materiais: estoqueAux, page: page + 6})
    }

    onChangeQuantidade = (idMaterial, quantidade) => {
      const { materiais } = this.state;
      const novosMateriais = materiais.map( material => {
          if(material.id !== idMaterial) {
              return material;
          }
          return {
              ...material,
              quantidade: quantidade
          }
      })
      this.setState({materiais: novosMateriais})
    }

    onPressBotaoOK = (idMaterial, quantidadeConfirmada) => {
      const { materiais } = this.state;
      const novosMateriais = materiais.map( material => {
          if(material.id !== idMaterial) {
              return material;
          }
          return {
              ...material,
              quantidadeConfirmada: !quantidadeConfirmada
          }
      })
      this.setState({materiais: novosMateriais})
    }

    concluiEstoque = async () => {
      const { materiais } = this.state;
      const { navigation, armazenaEstoque, plantaAtiva } = this.props;
      const idProgramacao = plantaAtiva.proximaProgramacao.id;
      const estoques = materiais.map( material => ({
        material_id: material.id,
        quantidade_inicial: material.quantidade
      }));
      await armazenaEstoque(idProgramacao, estoques);
      navigation.navigate('MenuVistoria');
    }

    renderItem = ({ item }) => {
      return (

        <OptionItem
          itemMaterial = {item}
          onChangeQuantidade = {this.onChangeQuantidade }
          onPressBotaoOK = {this.onPressBotaoOK }
        />
      );
    }

    render() {
        const { materiais } = this.state;

        return (
            <Container>
                <HeaderNav title="Estoque Materiais" />
                <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
                    <KeyboardAvoidingView
                        behavior="height"
                    >
                        <FlatList
                          data = {materiais}
                          removeClippedSubviews={true}
                          initialNumToRender={3}
                          maxToRenderPerBatch={3}
                          onEndReachedThreshold={0.1}
                          onEndReached={this.loadRepositories}
                          renderItem={this.renderItem}
                          keyExtractor={item => item.id}>
                        </FlatList>
                        <Button
                            block
                            onPress={() => this.concluiEstoque()}
                            style={style.btnStyle}
                            disabled={!materiais.reduce( (tudoConfirmado, material) => {
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

class OptionItem extends Component {

  shouldComponentUpdate(nextProps, nextState){
    const quantidade  = nextProps.itemMaterial.quantidade;
    const prevQuantidade = this.props.itemMaterial.quantidade;

    const quantidadeConfirmada = nextProps.itemMaterial.quantidadeConfirmada;
    const prevQuantidadeConfirmada = this.props.itemMaterial.quantidadeConfirmada;

    return (quantidade !== prevQuantidade || quantidadeConfirmada !== prevQuantidadeConfirmada);
  }

  render () {
    const { itemMaterial, onChangeQuantidade, onPressBotaoOK } = this.props;

    return (
      <Item>
        <Card>
          <CardItem header bordered>
              <Text>{itemMaterial.nome ? itemMaterial.nome : itemMaterial.tipoMaterialTipo.toUpperCase()}</Text>
          </CardItem>
          <CardItem>
              <Body>
                  { itemMaterial.tipoMaterial && <Text>Tipo: {itemMaterial.tipoMaterial}</Text> }
                  { itemMaterial.potencia && <Text>Potência: {itemMaterial.potencia}</Text> }
                  { itemMaterial.tensao && <Text>Tensão: {itemMaterial.tensao}</Text> }
                  { itemMaterial.base && <Text>Base: {itemMaterial.base}</Text> }
              </Body>
          </CardItem>

          <CardItem footer bordered>
              <Item style={{borderBottomColor: 'transparent'}}>

              <Label>Qtde. Estoque:</Label>
              <NumericInput
                  minValue={0}
                  step={+!itemMaterial.quantidadeConfirmada}
                  editable={false}
                  rounded={true}
                  value={itemMaterial.quantidade}
                  onChange={quantidade => onChangeQuantidade(itemMaterial.id, quantidade)} />

              <Button
                  style={{marginLeft: 10}}
                  rounded={true}
                  warning={!itemMaterial.quantidadeConfirmada}
                  success={itemMaterial.quantidadeConfirmada}
                  onPress={() => onPressBotaoOK(itemMaterial.id, itemMaterial.quantidadeConfirmada)} >
                  <Text>OK</Text>
              </Button>

              </Item>
          </CardItem>
        </Card>
      </Item>
    );
  }
}

const style = {
    btnStyle: {
        marginVertical: 5,
    }
}

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EstoqueScreen)
