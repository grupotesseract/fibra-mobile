import React, { Component } from 'react';
import { Container, Icon, Content, Button, Text, Fab, Card, CardItem, Body, Item, Label } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input';

const materiais = [
    {
        id:1,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '150W',
        base: 'E27',
        quantidade: 0,
        quantidadeConfirmada: false
    },
    {
        id:2,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '110V',
        potencia: '150W',
        base: 'MR11',
        quantidade: 0,
        quantidadeConfirmada: false
    },
    {
        id:3,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '50W',
        base: 'MR16',
        quantidade: 0,
        quantidadeConfirmada: false
    },
    {
        id:4,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '150W',
        base: null,
        quantidade: 0,
        quantidadeConfirmada: false
    }
]
export default class EntradaMateriais extends Component {
    state = {
        materiais
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

    render() {
        return (
            <Container>
                <HeaderNav title="Entrada de Materiais" />
                <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
                    <KeyboardAvoidingView
                        behavior="height"
                    >
                        <ScrollView>
                            {
                                this.state.materiais.map(material => {
                                    return <Card key={material.id}>
                                        <CardItem header bordered>
                                            <Text>{material.nome}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text>Tipo: {material.tipo}</Text>
                                                <Text>Potência: {material.potencia}</Text>
                                                <Text>Tensão: {material.tensao}</Text>
                                                <Text>Base: {material.base}</Text>
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
                            onPress={() => this.props.navigation.navigate('MenuVistoria')}
                            style={style.btnStyle}
                            disabled={!this.state.materiais.reduce( (tudoConfirmado, material) => {
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