import React, { Component } from 'react';
import { Container, Content, Button, Text,  Icon, Form, Picker, Item, Label } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as EmpresasActions from '../../store/ducks/empresas/actions'
import { connect } from 'react-redux';
import { EmpresasState } from '../../store/ducks/empresas/types';
import { ApplicationState } from '../../store'

interface StateProps {
  empresas: EmpresasState
}

interface DispatchProps {
  empresasUpdate(): void
}

type Props = StateProps & DispatchProps

interface State {
  empresaSelecionada: number
  plantaSelecionada: number
}

class SelecionaPlanta extends Component<Props, State> {
  state = {
    empresaSelecionada: 0,
    plantaSelecionada: null,
    empresas: []
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
    const { empresas } = this.props
    const { listaEmpresas } = empresas;
    if(!listaEmpresas || !Array.isArray(listaEmpresas)) {
      return [];
    }
    console.log("LISTA EMPRESA GETPLANTAS", listaEmpresas)
    const empresa = listaEmpresas.find(empresa => empresa.id === idEmpresa);
    if(!empresa) {
      return [];
    }
    return empresa.plantas;
  }
  
  render() {
    const { empresaSelecionada } = this.state;
    const { empresas } = this.props;
    const { listaEmpresas } = empresas;
    console.log("listaEmmpresas ", listaEmpresas, " eMPRESAS")
    const listaFiltrada = listaEmpresas.map(empresa => ({
      id: empresa.id,
      nome: empresa.nome,
      plantas: empresa.plantas.map(planta => ({
        id: planta.id,
        nome: planta.nome
      }))
    }))
    
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
                { Array.isArray(listaEmpresas) &&
                  listaEmpresas.length > 0 
                  ?
                  listaEmpresas.map(empresa => {
                  return <Picker.Item
                    label={empresa.nome}
                    value={empresa.id}
                    key={empresa.id}
                  />
                  }
                  ):(<>
                    <Picker.Item
                      label="Nenhuma empresa carregada"
                      value='0'
                      key={0}
                    />
                  </>)
                } 
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

const mapStateToProps = (state: ApplicationState) => ({
  empresas: state.empresas,
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(EmpresasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelecionaPlanta)