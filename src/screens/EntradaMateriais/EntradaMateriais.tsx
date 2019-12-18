import React, { Component } from 'react';
import { Container, Icon, Content, Button, Text, Fab, Card, CardItem, Body, Item, Label } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Planta } from '../../store/ducks/planta/types';
import { NavigationScreenProp } from 'react-navigation';
import { Entrada } from '../../store/ducks/programacoes/types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { ApplicationState } from '../../store';

interface StateProps {
  plantaAtiva: Planta,
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  armazenaEntrada(idProgramacao: number, entradas: Entrada[]): void
}

type Props = StateProps & DispatchProps

class EntradaMateriais extends Component<Props> {

    state = {
        materiais: []
    }

    componentDidMount() {
        const { plantaAtiva } = this.props;
        const entrada = plantaAtiva?.entrada || [];
        this.setState({ materiais: entrada })
    }

    concluiEntrada = async () => {
      const { materiais } = this.state;
      const { navigation, armazenaEntrada, plantaAtiva } = this.props;
      const idProgramacao = plantaAtiva.proximaProgramacao.id;
      const entradas = materiais.map( material => ({
        material_id: material.id,
        quantidade: material.quantidade
      }));
      await armazenaEntrada(idProgramacao, entradas);
      navigation.navigate('MenuVistoria');
    }

    onChangeQuantidade = (idMaterial: number, quantidade: number) => {

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

    onPressBotaoOK = (idMaterial: number, quantidadeConfirmada: boolean) => {
        const { materiais } = this.state;
        console.log(materiais);
        const novosMateriais = materiais.map( material => {
            if(material.id !== idMaterial) {
                return material;
            }
            return {
                ...material,
                quantidadeConfirmada: !quantidadeConfirmada,
                quantidade: material.quantidade ? material.quantidade : 0
            }
        })
        this.setState({materiais: novosMateriais})
    }

    render() {
        const { materiais } = this.state;
        return (
            <Container>
                <HeaderNav title="Entrada de Materiais" />
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
                                                { material.tensao && <Text>Tensão: {material.tensao}</Text> }
                                                { material.base && <Text>Base: {material.base}</Text> }
                                            </Body>
                                        </CardItem>
                                        <CardItem footer bordered>
                                            <Item style={{borderBottomColor: 'transparent'}}>

                                            <Label>Quantidade</Label>
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
                            onPress={() => this.concluiEntrada()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EntradaMateriais)