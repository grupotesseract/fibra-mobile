import React, { Component } from 'react';
import { Container, Content, Form, Item, Label, Button, Text } from 'native-base';
import HeaderNav from '../../components/HeaderNav';

export default class ConfirmarPeriodoManutencao extends Component {

  render() {
    return (
      <Container>
        
        <HeaderNav title="Período"/>

        <Content padder contentContainerStyle={{ flex:1, flexDirection:'column', justifyContent: 'space-between'}}>
          <Text>
            Confirmar período de Manutenção
          </Text>
          <Form>
            <Item>
              <Label>Início</Label>
              <Text>17/09/2019</Text>
            </Item>
            <Item>
              <Label>Fim</Label>
              <Text>17/09/2019</Text>
            </Item>
          </Form>

          <Button block onPress={() => this.props.navigation.navigate('LiberarDocumento')}>
            <Text>Confirmar período</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}