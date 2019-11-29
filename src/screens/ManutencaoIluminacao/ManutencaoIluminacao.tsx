import React, { Component } from 'react';
import { Container, Content, Button, Text, List, ListItem, Left, Right, Icon, Grid, Row, Badge } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { withNavigation } from 'react-navigation';
import { QRCodeReader } from '../../components/QRCodeReader';

const itens = [
    {
        id:1,
        nome: 'Hall de entrada',
        status: 'pendente',
        emergencia: true,
        qrCode: 'FIBRA-10001'
    },
    {
        id:2,
        nome: 'Salão do maquinário principal',
        status: 'pendente',
        emergencia: true,
        qrCode: 'FIBRA-10002'
    },
    {
        id:3,
        nome: 'Banheiro do salão',
        status: 'concluido',
        emergencia: false,
        qrCode: 'FIBRA-10003'
    },
    {
        id:4,
        nome: 'Atendimento ao cliente',
        status: 'pendente',
        emergencia: true,
        qrCode: 'FIBRA-10004'
    },
    {
        id:5,
        nome: 'Casa de Máquinas',
        status: 'concluido',
        emergencia: true,
        qrCode: 'FIBRA-10005'
    },
    {
        id:13,
        nome: 'Casa de Máquinas',
        status: 'pendente',
        emergencia: false,
        qrCode: 'FIBRA-10013'
    },
    {
        id:14,
        nome: 'Atendimento ao cliente',
        status: 'pendente',
        emergencia: false,
        qrCode: 'FIBRA-10014'
    },
    {
        id:15,
        nome: 'Salão do maquinário',
        status: 'pendente',
        emergencia: false,
        qrCode: 'FIBRA-10015'
    },
    {
        id:23,
        nome: 'Banheiro do salão',
        status: 'pendente',
        emergencia: false,
        qrCode: 'FIBRA-10023'
    },
    {
        id:24,
        nome: 'Atendimento ao cliente',
        status: 'pendente',
        emergencia: false,
        qrCode: 'FIBRA-10024'
    },
    {
        id:25,
        nome: 'Salão do maquinário',
        status: 'pendente',
        emergencia: false,
        qrCode: 'FIBRA-10025'
    },
]

function status2Badge(status) {
    switch(status) {
        case 'concluido':
            return <Badge success>
                <Text>&nbsp;&nbsp;</Text>
            </Badge>        
        case 'pendente':
        default:
            return <Badge danger>
                <Text>&nbsp;&nbsp;</Text>
            </Badge>
            
    }
}
class ManutencaoIluminacao extends Component {
    state = {
        itens: [],
        hasCameraPermission: false,
        readingQRCode: false,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        this.setState({
            itens: itens
        })
    }

    ativaQRCodeReader() {
        this.setState({
            readingQRCode: true
        })
    }

    handleCloseQRCode() {
        this.setState({
            readingQRCode: false,
        })
    }

    handleScan(code) {
        console.log('handlescan', code);
        this.setState({
            qrcode: code,
            readingQRCode: false,
        })
        this.props.navigation.navigate({ routeName: 'ManutencaoItem', params: { id: 1 }})
    }

    render() {
        const { readingQRCode } = this.state;
        if (readingQRCode) {
            return <QRCodeReader
                handleClose={() => this.handleCloseQRCode()}
                handleScan={e => this.handleScan(e)} />
        }

        return (
            <Container>
                <HeaderNav title="Manutenção Iluminação"  />
                <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
                    <ScrollView>
                        <List>
                            {
                                this.state.itens.map(item => {
                                    return <ListItem key={item.id} onPress={() => this.props.navigation.navigate({ routeName: 'ManutencaoItem', params: { id: item.id, nome: item.nome, emergencia: item.emergencia, qrCode: item.qrCode }})}>
                                            <Left>
                                                <Badge                                                     
                                                    warning={item.emergencia}
                                                    primary={!item.emergencia} 
                                                    style={{ marginRight: 10}}>
                                                    <Text>{item.emergencia ? 'E' : 'N' }</Text>
                                                </Badge>
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
                    <Button style={style.botaoQuadrado} onPress={() => this.ativaQRCodeReader()}>
                        <Icon name='md-qr-scanner' style={{fontSize: 48}}/>
                        <Text>LER QRCODE</Text>
                    </Button>
                    <Button style={style.botaoQuadrado}>
                        <Icon name='md-checkmark' style={{fontSize: 36}} />
                        <View style={{alignItems: 'center'}}>
                            <Text>CONCLUIR</Text>
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