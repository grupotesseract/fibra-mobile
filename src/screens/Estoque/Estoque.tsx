import React, { Component } from 'react';
import { Container, Icon, Content, Button, Text, Fab, Card, CardItem, Body, Input, Item, Label } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

const materiais = [
    {
        id:1,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '150W',
        base: 'E27',
        quantidade: '20'
    },
    {
        id:2,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '110V',
        potencia: '150W',
        base: 'MR11',
        quantidade: ''
    },
    {
        id:3,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '50W',
        base: 'MR16',
        quantidade: ''
    },
    {
        id:4,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '150W',
        base: null,
        quantidade: null
    }
]
export default class Estoque extends Component {
    state = {
        materiais
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

    render() {
        return (
            <Container>
                <HeaderNav title="Estoque Materiais" />
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

                                            <Label>Quantidade:</Label>
                                            <Input
                                                value={material.quantidade}
                                                onChangeText={quantidade => this.onChangeQuantidade(material.id, quantidade)}
                                                keyboardType="numeric" />
                                            </Item>
                                        </CardItem>
                                    </Card>
                                })
                            }
                        <Button
                            block
                            onPress={() => this.props.navigation.navigate('MenuVistoria')}
                            style={style.btnStyle}
                            disabled={!this.state.materiais.reduce( (tudoPreenchido, material) => {
                                return tudoPreenchido 
                                        && material.quantidade  !== null
                                        && material.quantidade  !== ''
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