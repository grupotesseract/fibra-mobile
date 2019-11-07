import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Icon, Content, Button, Text, Header, Body } from 'native-base';
import HeaderLogo from '../../components/HeaderLogo';

export default class Menu extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
        <Container>
          <HeaderLogo/>
          <Content padder>
              <Button
                onPress={() => navigate('SelecionaPlanta')}
                style={style.btnStyle}
              >
                <Icon name="bulb"/>
                <Text>Manutenção de iluminação</Text>
              </Button>
              <Button 
                onPress={() => navigate('Login')}
                style={style.btnStyle}
                >
                <Icon name="cube"/>
                <Text>Colaboradores</Text>
              </Button>
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