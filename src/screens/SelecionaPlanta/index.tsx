import React, { Component } from 'react';
import { Container, Content, Button, Text,  Icon, Form, Picker, Item, Label } from 'native-base';
import HeaderNav from '../../components/HeaderNav';

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
    this.setState({ 
      empresaSelecionada,
      plantaSelecionada: null
    });
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
    const { empresaSelecionada } = this.state;
    return (
      <Container>

        <HeaderNav title="Selecionar Planta"/>
        <Content padder contentContainerStyle={{ flex:1, flexDirection:'column', justifyContent: 'space-between'}}>
          <Form>
            <Item>
              <Label>Empresa</Label>
              <Picker
                mode="dropdown"
                placeholder="Selecione uma empresa"
                iosHeader="Selecione uma empresa"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={empresaSelecionada}
                onValueChange={(value) => this.selectEmpresa(value)}
              >
                <Picker.Item
                  label="Selecione uma empresa"
                  value={null}
                  key={0}
                />
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
                { this.getPlantasFromEmpresa(empresaSelecionada).map(planta => 
                  <Picker.Item
                    label={planta.nome}
                    value={planta.id}
                    key={planta.id}
                  />
                )}
              </Picker>
            </Item>
          </Form>
          <Button 
            block 
            disabled={(empresaSelecionada === null)}
            onPress={() => this.props.navigation.navigate('ConfirmarPeriodoManutencao')}>
            <Text>Iniciar manutenção</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}