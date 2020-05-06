import React, { Component } from 'react';
import { Container, Content, Button, Text,  Icon, Form, Picker, Item, Label, Toast } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as PlantaActions from '../../store/ducks/planta/actions'
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { connect } from 'react-redux';
import { EmpresasState } from '../../store/ducks/empresas/types';
import { ApplicationState } from '../../store'
import { Planta } from '../../store/ducks/planta/types';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  empresas: EmpresasState,
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  setPlantaAtiva(planta: Planta): void,
  addProgramacao(programacao: ProgramacaoRealizada): void,
}

type Props = StateProps & DispatchProps

interface State {
  empresaSelecionada: number
  plantaSelecionada: Planta
}

class SelecionaPlanta extends Component<Props, State> {
  state = {
    empresaSelecionada: 0,
    plantaSelecionada: null,
    empresas: []
  }

  selectEmpresa = (empresaSelecionada: number) => {
    this.setState({
      empresaSelecionada,
      plantaSelecionada: null
    });
  }

  selectPlanta = (idPlantaSelecionada: number) => {
    const { empresaSelecionada } = this.state;
    const plantas = this.getPlantasFromEmpresa(empresaSelecionada);
    const plantaSelecionada = plantas.find(planta => planta.id === idPlantaSelecionada)
    this.setState({ plantaSelecionada });
  }

  getPlantasFromEmpresa = (idEmpresa: number) => {
    const { empresas } = this.props
    const { listaEmpresas } = empresas;
    if(!listaEmpresas || !Array.isArray(listaEmpresas)) {
      return [];
    }
    const empresa = listaEmpresas.find(empresa => empresa.id === idEmpresa);
    if(!empresa) {
      return [];
    }
    return empresa.plantas;
  }

  iniciaManutencao = async () => {
    const { navigation, setPlantaAtiva, addProgramacao } = this.props;
    const { plantaSelecionada } = this.state;
    const { proximaProgramacao } = plantaSelecionada;
    if (!proximaProgramacao) {
      Toast.show({
        text: 'Sem programação armazenada para esta planta!',
        position: 'top',
      });
    } else {
      await setPlantaAtiva(plantaSelecionada);
      await addProgramacao({
        programacao: plantaSelecionada.proximaProgramacao,
        liberacoesDocumentos: [],
        entradas: [],
        quantidadesSubstituidas: [],
        itensVistoriados: [],
        estoques: [],
        comentarios: [],
        fotosItens: [],
      });

      navigation.navigate('ConfirmarPeriodoManutencao');
    }
  }

  render() {
    const { empresaSelecionada, plantaSelecionada } = this.state;
    const { empresas } = this.props;
    const { listaEmpresas } = empresas;

    if((listaEmpresas || []).length === 0) {
      return (
        <Container>
          <HeaderNav title="Selecionar Planta"/>
          <Content padder >
            <Text> Nenhuma planta disponível para seleção </Text>
          </Content>
        </Container>
      );
    }

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
                  value='0'
                  key={0}
                />
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
                selectedValue={plantaSelecionada?.id}
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
            onPress={() => this.iniciaManutencao()}>
            <Text>Iniciar manutenção</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  empresas: state.empresasReducer,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(Object.assign({}, PlantaActions, ProgramacoesActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelecionaPlanta)
