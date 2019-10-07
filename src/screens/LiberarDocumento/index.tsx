import React, { Component } from 'react';
import { Container, Content, Text, Button, Icon, ListItem, List, View, Input, H3 } from 'native-base';
import HeaderNav from '../../components/HeaderNav';

export default class LiberarDocumento extends Component {

  state = {
    colaboradores: [
      { nome: 'Fernando Lima Fernandes', id: 1 },
      { nome: 'Evandro Barbosa Carreira', id: 2 },
      { nome: 'Ana Elisa Tueder Camparo', id: 3 },
      { nome: 'Michel Greger Stone', id: 4 },
      { nome: 'Julio Douglas Plaza', id: 5 },
      { nome: 'Monica Tavares', id: 6 },
      { nome: 'Fernandes Lima Fernando', id: 7 },
    ],
    hora: new Date().getHours(),
    minuto: new Date().getMinutes(),
  }
  render() {
    const { hora, minuto } = this.state;
    return (
      <Container>
        <HeaderNav title="Liberação"/>

        <Content padder>
          <H3>Colaboradores</H3>
          <List>
            { this.state.colaboradores.map(colaborador => {
              return <ListItem 
              key={colaborador.id}
              style={{paddingBottom:0, paddingTop: 0, paddingRight:0, marginLeft:0, justifyContent: 'space-between'}}>
                <Text>{colaborador.nome}</Text>
                <Button transparent>
                  <Icon name="close-circle" />
                </Button>
              </ListItem>
            })}
          </List>
          <View style={{ marginVertical: 30 }}>
            <H3 style={{textAlign: 'center'}}>Liberação do documento</H3>
            <View style={{flex: 1,flexDirection: 'row', alignContent: 'center', alignSelf: 'center', width: 150}}>
              <Input 
                style={{ fontSize: 35 }}
                value={hora.toString()}
                keyboardType="numeric"/>
              <Text style={{ fontSize: 30, textAlignVertical: 'center'}}>:</Text>
              <Input 
                style={{ fontSize: 35 }}
                value={minuto.toString()}
                keyboardType="numeric"/>
              <Text style={{fontSize: 30, textAlignVertical: 'center'}}>h</Text>
            </View>
          </View>
          <Button block onPress={() => this.props.navigation.navigate({routeName: 'MenuVistoria'})}>
            <Text>Iniciar manutenção</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}