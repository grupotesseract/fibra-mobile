import React, { Component } from 'react';
import { Container, Content, Button, Text, Card, CardItem, Body, Item, Label } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
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
        materiais: []
    }

    componentDidMount() {
        const { plantaAtiva } = this.props;

        const { estoque } = plantaAtiva;
        this.setState({ materiais: estoque })
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

    render() {
        const { materiais } = this.state;
        return (
            <Container>
                <HeaderNav title="Estoque Materiais" />
                <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
                    <KeyboardAvoidingView
                        behavior="height"
                    >
                        <ScrollView>
                            {
                                materiais.map(material => {
                                    return <Card key={material.id}>
                                        <CardItem header bordered>
                                            <Text>{material.nome}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text>Tipo: {material.tipoMaterial}</Text>
                                                <Text>Potência: {material.potencia}</Text>
                                                <Text>Tensão: {material.tensao}</Text>
                                                { material.reator && <Text>Reator: {material.reator}</Text> }
                                                { material.base && <Text>Base: {material.base}</Text> }
                                            </Body>
                                        </CardItem>
                                        <CardItem footer bordered>
                                            <Item style={{borderBottomColor: 'transparent'}}>

                                            <Label>Qtde. Estoque:</Label>
                                            <NumericInput
                                                minValue={0}
                                                step={+!material.quantidadeConfirmada}
                                                editable={false}
                                                rounded={true}
                                                value={material.quantidade}
                                                onChange={quantidade => this.onChangeQuantidade(material.id, quantidade)} />

                                            <Button
                                                style={{marginLeft: 10}}
                                                rounded={true}
                                                warning={!material.quantidadeConfirmada}
                                                success={material.quantidadeConfirmada}
                                                onPress={() => this.onPressBotaoOK(material.id, material.quantidadeConfirmada)} >
                                                <Text>OK</Text>
                                            </Button>

                                            </Item>
                                        </CardItem>
                                    </Card>
                                })
                            }
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
                        </ScrollView>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
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