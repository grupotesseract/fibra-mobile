import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Label, Form, Button, Input, Item, Icon, Content, Text } from 'native-base';

export default class Login extends Component {
  render() {
    return (
        <Container>
            <Content padder contentContainerStyle={{ flex:1, flexDirection:'column', justifyContent: 'space-between'}}>
                <Image 
                  style={{ width: 300, height: 87 }}
                  resizeMode="contain"
                  source={require('../../../assets/fibraheader.png')}/>
                <Form>
                  <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                    <Icon name="lock"/>
                    <Text style={{ paddingLeft: 10}}>
                      Olá, entre com seus dados de acesso:
                    </Text>
                  </View>
                  <Item floatingLabel>
                    <Label>Usuário</Label>
                    <Input />
                  </Item>
                  <Item floatingLabel>
                    <Label>Senha</Label>
                    <Input secureTextEntry={true}/>
                  </Item>
                </Form>
                <Button block onPress={() => this.props.navigation.navigate('Menu')}>
                  <Text>Login</Text>
                </Button>
            </Content>
        </Container>
    );
  }
}