import React, { Component } from 'react';
import { Container, Icon, Content, Button, Text, Fab, Card, CardItem, Body, Item, Label, ListItem, List, H3 } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input';

const colaboradores = [
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