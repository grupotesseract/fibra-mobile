import React, { Component } from 'react';
import { Container, Content, Text, Button, Icon, ListItem, List, View, Input, H3 } from 'native-base';
import HeaderNav from '../../components/HeaderNav';

export default class LiberarDocumento extends Component {

  state = {
    colaboradores: [
      { nome: 'Fernando Lima Fernandes', id: 1, ativo: false},
      { nome: 'Evandro Barbosa Carreira', id: 2, ativo: false},
      { nome: 'Ana Elisa Tueder Camparo', id: 3, ativo: false},
      { nome: 'Michel Greger Stone', id: 4, ativo: false},
      { nome: 'Julio Douglas Plaza', id: 5, ativo: false},
      { nome: 'Monica Tavares', id: 6, ativo: false},
      { nome: 'Alceu Dispor', id: 7, ativo: false},
      { nome: 'Antonio Bobra D\'Agua', id: 8, ativo: false},
      { nome: 'José das Couves', id: 9, ativo: false},
      { nome: 'Leonardo da Vinte', id: 10, ativo: false},
      { nome: 'José Bezerra da Silva', id: 11, ativo: false},
      { nome: 'Michelangelo das Neves', id: 12, ativo: false},
    ],
    hora: new Date().getHours(),
    minuto: new Date().getMinutes(),
  }

  onPressBotaoColaborador = (idColaborador: number, colaboradorAtivo: boolean) => {
    const { colaboradores } = this.state;
    const novosColaboradores = colaboradores.map( colaborador => {
        if(colaborador.id !== idColaborador) {
            return colaborador;
        }
        return {
            ...colaborador,
            ativo: !colaboradorAtivo
        }
    })
    this.setState({colaboradores: novosColaboradores})
  }

  render() {
    const { hora, minuto, colaboradores } = this.state;
    return (
      <Container>
        <HeaderNav title="Liberação de Documento"/>

        <Content padder>
          <H3>Colaboradores</H3>
          <List>
            { colaboradores.map(colaborador => {
              return <ListItem               
              key={colaborador.id}
              style={{paddingBottom:0, paddingTop: 0, paddingRight:0, marginLeft:0, justifyContent: 'space-between'}}>
                <Text>{colaborador.nome}</Text>
                <Button 
                  danger={!colaborador.ativo}
                  success={colaborador.ativo}
                  onPress={() => this.onPressBotaoColaborador(colaborador.id, colaborador.ativo)} >
                  <Icon name={colaborador.ativo ? "ios-remove-circle" : "ios-add-circle"} />
                </Button>
              </ListItem>
            })}
          </List>
          <View style={{ marginVertical: 30 }}>
            <H3 style={{textAlign: 'center'}}>Liberação de documentos</H3>
            <View style={{flex: 1,flexDirection: 'row', alignContent: 'center', alignSelf: 'center', width: 150}}>
              <Input 
                style={{ fontSize: 35 }}
                value={hora < 10 ? '0'+hora.toString() : hora.toString()}
                keyboardType="numeric"/>
              <Text style={{ fontSize: 30, textAlignVertical: 'center'}}>:</Text>
              <Input 
                style={{ fontSize: 35 }}                
                value={minuto < 10 ? '0'+minuto.toString() : minuto.toString()}
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