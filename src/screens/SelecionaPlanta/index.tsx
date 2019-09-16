import React, { Component } from 'react';
import { Container, Content, Button, Text, Header, Left, Body, Title, Right, Icon, Subtitle, Form, Picker, Item, Label } from 'native-base';

export default class SelecionaPlanta extends Component {
  state = {
    empresaSelecionada: null,
    plantaSelecionada: null,
    empresas: [
      {
        id: 1,
        nome: 'Confiança',
        plantas: [
          { id: 10, nome: 'Confiança Max'},
          { id: 11, nome: 'Confiança Flex'},
          { id: 12, nome: 'Confiança Rodoviária'},
        ]
      },
      {
        id: 2,
        nome: 'Gera Arte',
        plantas: [
          { id: 20, nome: 'Planta Gera Arte'},
        ]
      },
    ]
  }

  selectEmpresa = empresaSelecionada => {
    this.setState({ empresaSelecionada });
  }

  selectPlanta = plantaSelecionada => {
    this.setState({ plantaSelecionada });
  }

  getPlantasFromEmpresa = idEmpresa => {
    const { empresas } = this.state
    const empresa = empresas.find(empresa => empresa.id === idEmpresa);
    if(!empresa) {
      return [];
    }
    return empresa.plantas;
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button hasText transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Planta</Title>
          </Body>
          <Right>
            <Button hasText transparent>
              <Text>Cancelar</Text>
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Form>
            <Item>
              <Label>Empresa</Label>
              <Picker
                mode="dropdown"
                placeholder="Selecione uma empresa"
                iosHeader="Selecione uma empresa"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.empresaSelecionada}
                onValueChange={(value) => this.selectEmpresa(value)}
              >
                { this.state.empresas.map(empresa => 
                  <Picker.Item
                    label={empresa.nome}
                    value={empresa.id}
                    key={empresa.id}
                  />
                )}
              </Picker>
            </Item>
            <Item>
              <Label>Planta</Label>
              <Picker
                mode="dropdown"
                placeholder="Selecione uma planta"
                iosHeader="Selecione uma planta"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.plantaSelecionada}
                onValueChange={(value) => this.selectPlanta(value)}
              >
                { this.getPlantasFromEmpresa(this.state.empresaSelecionada).map(planta => 
                  <Picker.Item
                    label={planta.nome}
                    value={planta.id}
                    key={planta.id}
                  />
                )}
              </Picker>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}