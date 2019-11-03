import React from 'react';
import { Container, Content, Card, CardItem, Body, Text, Item, Label, Input, Button, View, Icon, Textarea, Form } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

export default function ComentariosGerais(props) {
    return (
        <Container>
            <HeaderNav title={"Comentários"} />
            <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
                <KeyboardAvoidingView
                    behavior="height"
                >
                    <ScrollView>
                    <Form>
                        <Textarea rowSpan={50} bordered />
                    </Form>
                    </ScrollView>                    
                    
                </KeyboardAvoidingView>
            </Content>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Button
                    block
                    onPress={() => props.navigation.goBack()}
                    style={style.btnStyle} >
                    <Text>Concluído</Text>
                </Button>
            </View>
        </Container>
    );
}

const style = {
    btnStyle: {
        marginVertical: 5,
        flex: 1
    }
}