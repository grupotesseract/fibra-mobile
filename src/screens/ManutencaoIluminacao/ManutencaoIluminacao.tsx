import React, { Component } from 'react';
import { Container, Content, Button, Text, List, ListItem, Left, Right, Icon, Grid, Row, Badge } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, View } from 'react-native';
import { withNavigation } from 'react-navigation';

const itens = [
    {
        id:1,
        nome: 'Item 1 - Hall de entrada',
        status: 'pendente',
    },
    {
        id:2,
        nome: 'Item 2 - Salão do maquinário principal',
        status: 'pendente',
    },
    {
        id:3,
        nome: 'Item 3 - Banheiro do salão',
        status: 'pendente',
    },
    {
        id:4,
        nome: 'Item 4 - Atendimento ao cliente',
        status: 'pendente',
    },
    {
        id:5,
        nome: 'Item 5 - Salão do maquinário',
        status: 'pendente',
    },
    {
        id:13,
        nome: 'Item 3 - Banheiro do salão',
        status: 'pendente',
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

function status2Badge(status) {
    switch(status) {
        case 'concluido':
            return <Badge success>
                <Text>&nbsp;&nbsp;</Text>
            </Badge>
        case 'iniciado':
            return <Badge warning>
                <Text>&nbsp;&nbsp;</Text>
            </Badge>
        case 'pendente':
        default:
            return <Badge primary>
                <Text>&nbsp;&nbsp;</Text>
            </Badge>
            
    }
}
class ManutencaoIluminacao extends Component {
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
                                    return <ListItem key={item.id} onPress={() => this.props.navigation.navigate({ routeName: 'ManutencaoItem', params: { id: item.id }})}>
                                            <Left>
                                                <Text>{ item.nome }</Text>
                                            </Left>
                                            <Right>
                                                { status2Badge(item.status) }
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

export default withNavigation(ManutencaoIluminacao);