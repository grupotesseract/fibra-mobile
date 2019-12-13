import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Body, Text, Label, Item, Button, View, Icon, Left, Thumbnail, Badge, Right } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Planta, Item as ItemPlanta, Material } from '../../store/ducks/planta/types';
import { ApplicationState } from '../../store';
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  plantaAtiva: Planta,
  navigation: NavigationScreenProp<any, any>,
}


interface DispatchProps {
}

type Props = StateProps & DispatchProps

class ManutencaoItem extends Component<Props> {
    
    state = {
        materiais: [],
        nome: 'Item',
        emergencia: false,
        qrcode: 'FIBRA-#',
        error: false,
    }

    onChangeQuantidade = (idMaterial: number, quantidade: number) => {
        const { materiais } = this.state;
        const novosMateriais = materiais.map( (material: Material) => {
            if(material.id !== idMaterial) {
                return material;
            }
            return {
                ...material,
                quantidade
            }
        })
        this.setState({materiais: novosMateriais})
    }
    
    onChangeQuantidadeBase = (idMaterial: number, quantidadeBase: number) => {
        const { materiais } = this.state;
        const novosMateriais = materiais.map( (material: Material) => {
            if(material.id !== idMaterial) {
                return material;
            }
            return {
                ...material,
                quantidadeBase
            }
        })
        this.setState({materiais: novosMateriais})
    }
    
    onChangeQuantidadeReator = (idMaterial: number, quantidadeReator: number) => {
        const { materiais } = this.state;
        const novosMateriais = materiais.map( (material: Material) => {
            if(material.id !== idMaterial) {
                return material;
            }
            return {
                ...material,
                quantidadeReator
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

    componentDidMount() {
        const { plantaAtiva, navigation } = this.props;
        const { idItem, qrcode } = navigation.state.params; 
        const { itens } = plantaAtiva;
        let item: ItemPlanta;
        if(idItem) {
            item = itens.find(item => item.id === idItem);
        } else if (qrcode) {
            item = itens.find(item => item.qrcode === qrcode);
        }
        if (item) {
            const { materiais, circuito, qrcode, nome } = item;
            this.setState({
                materiais,
                qrcode,
                emergencia: circuito === 'Emergência',
                nome,
            })
        } else {
            this.setState({
                error: 'Não foi possível carregar este Item. Verifique se o item se encontra na planta selecionada para esta manutenção.'
            })
        }
    }
    
    render() {
        const { error, materiais, qrcode, emergencia, nome } = this.state;
        const { navigation } = this.props;
        const { idItem } = navigation.state.params; 

        if (error) {
            return <Container>
                <HeaderNav title={nome} />
                <Content padder>
                    <Text>{error}</Text>
                </Content>
            </Container>
        }

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
                                        <Text note>{qrcode}</Text>
                                        <Badge
                                            warning={emergencia}
                                            primary={!emergencia}>
                                            <Text>{emergencia ? 'E' : 'N'}</Text>
                                        </Badge>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <ScrollView>
                            {
                                materiais ?.map( (material: Material) => {
                                    return <Card key={material.id}>
                                        <CardItem header bordered>
                                            <Text>{material.nome}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <View style={{ marginBottom: 5, borderBottomWidth: 0, paddingBottom: 5 }}>
                                                    <Text>Tipo: {material.tipoMaterial}</Text>
                                                    {material.base && <Text>Base: {material.base}</Text>}
                                                    {material.reator && <Text>Reator : {material.reator}</Text>}
                                                </View>

                                                {material.potencia && <Text>Potência: {material.potencia}</Text>}
                                                {material.tensao && <Text>Tensão: {material.tensao}</Text>}
                                                <Text>Quantidade Instalada: {material.quantidadeInstalada}</Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem footer bordered style={{flexDirection: 'column'}}>
                                            <Text style={{ marginVertical: 3 }}>Substituições</Text>
                                            {material.base &&
                                                <Item style={style.itemSubstituicao}>
                                                    <Left>
                                                        <Label>Bases:</Label>
                                                    </Left>
                                                    <Right>
                                                        <NumericInput
                                                            minValue={0}
                                                            step={+!material.quantidadeConfirmada}
                                                            editable={false}
                                                            rounded={true}
                                                            value={material.quantidadeBase}
                                                            onChange={quantidade => this.onChangeQuantidade(material.id, quantidade)} />
                                                    </Right>
                                                </Item>
                                            }
                                            {material.reator &&
                                                <Item style={style.itemSubstituicao}>
                                                    <Left>
                                                        <Label>Reatores:</Label>
                                                    </Left>
                                                    <Right>
                                                        <NumericInput
                                                            minValue={0}
                                                            step={+!material.quantidadeConfirmada}
                                                            editable={false}
                                                            rounded={true}
                                                            value={material.quantidadeReator}
                                                            onChange={quantidade => this.onChangeQuantidade(material.id, quantidade)} />
                                                    </Right>
                                                </Item>
                                            }
                                            <Item style={style.itemSubstituicao}>
                                                <Left>
                                                    <Label>Lâmpadas:</Label>
                                                </Left>
                                                <Right>
                                                    <NumericInput
                                                        minValue={0}
                                                        step={+!material.quantidadeConfirmada}
                                                        editable={false}
                                                        rounded={true}
                                                        value={material.quantidade}
                                                        onChange={quantidade => this.onChangeQuantidade(material.id, quantidade)} />
                                                </Right>

                                            </Item>
                                            <Item style={style.itemSubstituicao}>
                                                    <Button
                                                        // style={{ marginLeft: 10 }}
                                                        small
                                                        rounded={true}
                                                        warning={!material.quantidadeConfirmada}
                                                        success={material.quantidadeConfirmada}
                                                        onPress={() => this.onPressBotaoOK(material.id, material.quantidadeConfirmada)} >
                                                        <Text>Confirmar</Text>
                                                    </Button>
                                            </Item>
                                        </CardItem>
                                    </Card>
                                })
                        }
                        </ScrollView>
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Button
                                onPress={() => navigation.navigate({ routeName: 'FotosItem', params: { idItem: idItem }})}
                                style={{ flex: 1, marginRight: 3 }}
                                iconLeft
                                bordered
                                disabled={!materiais.reduce((tudoConfirmado, material) => {
                                    return tudoConfirmado
                                        && material.quantidadeConfirmada
                                }, true)}
                            >
                                <Icon name="md-photos" />
                                <Text>Fotos</Text>
                            </Button>
                            <Button
                                onPress={() => navigation.navigate('ComentariosGerais')}
                                style={{ flex: 1, marginLeft: 3 }}
                                iconLeft
                                bordered
                                disabled={!materiais.reduce((tudoConfirmado, material) => {
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
                            onPress={() => navigation.goBack()}
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
    },
    itemSubstituicao: {
        marginVertical: 2,
        borderBottomColor: 'transparent',
    },
}

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManutencaoItem)
