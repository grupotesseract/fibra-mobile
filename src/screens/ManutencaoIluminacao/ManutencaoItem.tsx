import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Body, Text, Item, Label, Input, Button, View, Icon, Left, Thumbnail, Badge } from 'native-base';
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
        quantidadeConfirmada: false,
        quantidadeInstalada: 23        
    },
    {
        id:2,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '110V',
        potencia: '150W',
        base: 'MR11',
        quantidade: 0,
        quantidadeConfirmada: false,
        quantidadeInstalada: 15
    },
    {
        id:3,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '50W',
        base: 'MR16',
        quantidade: 0,
        quantidadeConfirmada: false,
        quantidadeInstalada: 87
    },
    {
        id:4,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '150W',
        base: null,
        quantidade: 0,
        quantidadeConfirmada: false,
        quantidadeInstalada: 120
    }
]


export default class ManutencaoItem extends Component {
    
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
    
    render() {
        
        const {id, qrCode, emergencia, nome} = this.props.navigation.state.params; 
        const { materiais } = this.state;
         return (
            <Container>
                <HeaderNav title={nome} />
                <Content padder>
                    <KeyboardAvoidingView
                        behavior="height"
                    >
                        <Card>
                            <CardItem>
                            <Left>
                                <Thumbnail source={require('../../../assets/qrcode.png')} />
                                <Body>                                
                                    <Text note>{qrCode}</Text>
                                    <Badge 
                                        danger={emergencia}
                                        success={!emergencia}>
                                        <Text>{emergencia ? 'E' : 'N' }</Text>
                                    </Badge>
                                </Body>
                            </Left>
                            </CardItem>
                        </Card>
                        <ScrollView>
                        {
                            materiais.map(material => {
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
                                            <Text>Quantidade Instalada: {material.quantidadeInstalada}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <Item style={{ borderBottomColor: 'transparent' }}>
                                            <Label>Qtde. Substituída:</Label>
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
                        </ScrollView>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Button
                                onPress={() => this.props.navigation.navigate('FotosItem')}
                                style={{ flex: 1, marginRight: 3 }}
                                iconLeft
                                bordered
                                disabled={!materiais.reduce( (tudoConfirmado, material) => {
                                    return tudoConfirmado 
                                            && material.quantidadeConfirmada
                                }, true)}
                            >
                                <Icon name="md-photos"/>
                                <Text>Fotos</Text>
                            </Button>
                            <Button
                                onPress={() => this.props.navigation.navigate('ComentariosGerais')}
                                style={{ flex: 1, marginLeft: 3 }}
                                iconLeft
                                bordered
                                disabled={!materiais.reduce( (tudoConfirmado, material) => {
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
                            onPress={() => this.props.navigation.goBack()}
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

const style = {
    btnStyle: {
        marginVertical: 5,
    }
}