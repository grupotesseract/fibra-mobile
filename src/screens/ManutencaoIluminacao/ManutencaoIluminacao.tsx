import React, { Component } from 'react';
import { Container, Content, Button, Text, List, ListItem, Left, Right, Icon, Grid, Row, Badge } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { ApplicationState } from '../../store';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Planta, Item } from '../../store/ducks/planta/types';
import { QRCodeReader } from '../../components/QRCodeReader';
import { Empresa } from '../../store/ducks/empresas/types';
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  empresas: Empresa[],
  plantaAtiva: Planta,
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps

class ManutencaoIluminacao extends Component<Props> {
    state = {
        itens: [],
        hasCameraPermission: false,
        readingQRCode: false,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        const { plantaAtiva } = this.props;
        const { itens } = plantaAtiva;
        this.setState({
            itens
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

    handleScan(scannedObj) {
        const { navigation } = this.props;
        const qrcode = scannedObj.data;
        this.setState({
            qrcode,
            readingQRCode: false,
        })
        navigation.navigate({ routeName: 'ManutencaoItem', params: { qrcode }})
    }

    render() {
        const { readingQRCode, itens } = this.state;
        const { navigation } = this.props;
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
                            itens?.map( (item: Item) => {
                                const isEmergencia = item.circuito === 'Emergência';
                                return <ListItem key={item.id} onPress={() => navigation.navigate({ routeName: 'ManutencaoItem', params: { idItem: item.id } })}>
                                    <Left>
                                        <Badge
                                            warning={isEmergencia}
                                            primary={!isEmergencia}
                                            style={{ marginRight: 10 }}>
                                            <Text>{isEmergencia ? 'E' : 'N'}</Text>
                                        </Badge>
                                        <Text>{item.nome}</Text>
                                    </Left>
                                    <Right>
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

const mapStateToProps = (state: ApplicationState) => ({
  empresas: state.empresasReducer.listaEmpresas,
  plantaAtiva: state.plantaReducer.plantaAtiva,
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManutencaoIluminacao)
