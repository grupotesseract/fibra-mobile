import React, { Component } from 'react';
import { Container, Content, Text, ListItem, List } from 'native-base';
import HeaderNav from '../../components/HeaderNav';

const colaboradores = [
    { nome: 'Fernando Lima Fernandes', id: 1 },
    { nome: 'Evandro Barbosa Carreira', id: 2 },
    { nome: 'Ana Elisa Tueder Camparo', id: 3 },
    { nome: 'Michel Greger Stone', id: 4 },
    { nome: 'Julio Douglas Plaza', id: 5 },
    { nome: 'Monica Tavares', id: 6 },
    { nome: 'Alceu Dispor', id: 7 },
    { nome: 'Antonio Bobra D\'Agua', id: 8 },
    { nome: 'José das Couves', id: 9 },
    { nome: 'Leonardo da Vinte', id: 10 },
    { nome: 'José Bezerra da Silva', id: 11 },
    { nome: 'Michelangelo das Neves', id: 12 },
]

export default class Colaboradores extends Component {    

    render() {
        return (
          <Container>
            <HeaderNav title="Listagem de Colaboradores"/>
    
            <Content padder>
              <List>
                { colaboradores.map(colaborador => {
                  return <ListItem               
                  key={colaborador.id} >
                    <Text>{colaborador.nome}</Text>                    
                  </ListItem>
                })}
              </List>              
            </Content>
          </Container>
        );
      }
}