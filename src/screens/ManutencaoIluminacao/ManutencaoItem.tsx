import React from 'react';
import { Container, Content, Card, CardItem, Body, Text, Item, Label, Input, Button, View, Icon } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

const materiais = [
    {
        id:1,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '150W',
        quantidade: '20'
    },
    {
        id:2,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '110V',
        potencia: '150W',
        quantidade: ''
    },
    {
        id:3,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '50W',
        quantidade: ''
    },
    {
        id:4,
        tipo: 'FL',
        nome: 'Fluorescente FL',
        tensao: '227V',
        potencia: '150W',
        quantidade: null
    }
]


export function ManutencaoItem(props) {
    const {id} = props.navigation.state.params;

    return (
        <Container>
            <HeaderNav title={"Manutenção Item #"+id} />
            <Content padder>
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
                                        <Text>Tipo: {material.tipo}</Text>
                                        <Text>Potência: {material.potencia}</Text>
                                        <Text>Tensão: {material.tensao}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem footer bordered>
                                    <Item style={{ borderBottomColor: 'transparent' }}>
                                        <Label>Quantidade trocada:</Label>
                                        <Input keyboardType="numeric" />
                                    </Item>
                                </CardItem>
                            </Card>
                        })
                    }
                    </ScrollView>
                    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                        <Button
                            onPress={() => props.navigation.navigate('FotosItem')}
                            style={{ flex: 1, marginRight: 3 }}
                            iconLeft
                            bordered
                        >
                            <Icon name="md-photos"/>
                            <Text>Fotos</Text>
                        </Button>
                        <Button
                            onPress={() => props.navigation.navigate('ComentariosGerais')}
                            style={{ flex: 1, marginLeft: 3 }}
                            iconLeft
                            bordered
                        >
                            <Icon name="md-chatboxes" />
                            <Text>Comentário</Text>
                        </Button>
                    </View>
                    <Button
                        block
                        onPress={() => props.navigation.goBack()}
                        style={style.btnStyle}
                    >
                        <Text>Concluído</Text>
                    </Button>
                </KeyboardAvoidingView>
            </Content>
        </Container>
    );
}

const style = {
    btnStyle: {
        marginVertical: 5,
    }
}