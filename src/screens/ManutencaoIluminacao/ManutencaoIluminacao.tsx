import React, { Component } from 'react';
import { Container, Content, Button, Text, List, ListItem, Left, Right, Icon, Grid, Row, Badge } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, View } from 'react-native';

const itens = [
    {
        id:1,
        nome: 'Item 1 - Hall de entrada'
    },
    {
        id:2,
        nome: 'Item 2 - Salão do maquinário principal'
    },
    {
        id:3,
        nome: 'Item 3 - Banheiro do salão'
    },
    {
        id:4,
        nome: 'Item 4 - Atendimento ao cliente'
    },
    {
        id:5,
        nome: 'Item 5 - Salão do maquinário'
    },
    {
        id:13,
        nome: 'Item 3 - Banheiro do salão'
    },
    {
        id:14,
        nome: 'Item 4 - Atendimento ao cliente'
    },
    {
        id:15,
        nome: 'Item 5 - Salão do maquinário'
    },
    {
        id:23,
        nome: 'Item 3 - Banheiro do salão'
    },
    {
        id:24,
        nome: 'Item 4 - Atendimento ao cliente'
    },
    {
        id:25,
        nome: 'Item 5 - Salão do maquinário'
    },
]
export default class ManutencaoIluminacao extends Component {
    state = {
        itens
    }

    render() {
        return (
            <Container>
                <HeaderNav title="Manutenção Iluminação"  />
                <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
                    <ScrollView>
                        <List>
                            {
                                this.state.itens.map(item => {
                                    return <ListItem key={item.id}>
                                            <Left>
                                                <Text>{ item.nome }</Text>
                                            </Left>
                                            <Right>
                                                <Badge success>
                                                    <Text>ok</Text>
                                                </Badge>
                                            </Right>
                                        </ListItem>
                                })
                            }
                        
                        </List>
                    </ScrollView>
                </Content>
                <View style={{ flexDirection: 'row' }}>
                    <Button style={style.botaoQuadrado}>
                        <Icon name='md-qr-scanner' style={{fontSize: 48}}/>
                        <Text>LER QRCODE</Text>
                    </Button>
                    <Button style={style.botaoQuadrado}>
                        <Icon name='md-checkmark' style={{fontSize: 36}} />
                        <View style={{alignItems: 'center'}}>
                            <Text>CONCLUIR</Text>
                            <Text>MANUTENÇÃO</Text>
                        </View>
                    </Button>
                </View>
            </Container>
        );
    }
}

const style = {
    btnStyle: {
        marginVertical: 5,
    },
    botaoQuadrado: {
        margin: 5,
        padding: 10,
        paddingBottom: 10,
        height: 110,
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: "column"
    }
}