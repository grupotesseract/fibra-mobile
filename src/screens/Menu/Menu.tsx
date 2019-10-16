import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Icon, Content, Button, Text } from 'native-base';

export default class Menu extends Component {
  render() {
    return (
        <Container>
            <Content padder>
                <Image 
                  style={{ width: 300, height: 87, marginTop: 10 }}
                  resizeMode="contain"
                  source={require('../../../assets/fibraheader.png')}/>
                <Button
                  onPress={() => this.props.navigation.navigate('SelecionaPlanta')}
                  style={style.btnStyle}
                >
                  <Icon name="bulb"/>
                  <Text>Manutenção de iluminação</Text>
                </Button>
                <Button 
                  onPress={() => this.props.navigation.navigate('Login')}
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