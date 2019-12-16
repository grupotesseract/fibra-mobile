import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Icon, Content, Button, Text } from 'native-base';

export default class MenuVistoria extends Component {
  render() {
    return (
        <Container>
            <Content padder>
                <Image
                  style={{ width: 300, height: 87 }}
                  resizeMode="contain"
                  source={require('../../../assets/fibraheader.png')}/>
                <Button
                  onPress={() => this.props.navigation.navigate('Estoque')}
                  style={style.btnStyle}
                >
                  <Icon name="cube"/>
                  <Text>Estoque de Material</Text>
                </Button>
                <Button
                  onPress={() => this.props.navigation.navigate('EntradaMateriais')}
                  style={style.btnStyle}
                  >
                  <Icon name="download"/>
                  <Text>Entrada de materiais</Text>
                </Button>
                <Button
                  onPress={() => this.props.navigation.navigate('ComentariosGerais')}
                  style={style.btnStyle}
                  >
                  <Icon name="md-chatboxes"/>
                  <Text>Comentários Gerais</Text>
                </Button>
                <Button
                  onPress={() => this.props.navigation.navigate('ManutencaoIluminacao')}
                  style={style.btnStyle}
                  >
                  <Icon name="bulb"/>
                  <Text>Manutenção Iluminação</Text>
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