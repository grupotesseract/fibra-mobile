import React, { Component } from 'react';
import {
  Container,
  Box,
  Button,
  Text,
  Icon,
  Toast,
  FormControl,
  Stack,
  Select,
} from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as PlantaActions from '../../store/ducks/planta/actions';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { connect } from 'react-redux';
import { EmpresasState } from '../../store/ducks/empresas/types';
import { ApplicationState } from '../../store';
import { Planta } from '../../store/ducks/planta/types';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  empresas: EmpresasState;
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  setPlantaAtiva(planta: Planta): void;
  addProgramacao(programacao: ProgramacaoRealizada): void;
}

type Props = StateProps & DispatchProps;

interface State {
  empresaSelecionada: number;
  plantaSelecionada: Planta;
}

class SelecionaPlanta extends Component<Props, State> {
  state = {
    empresaSelecionada: 0,
    plantaSelecionada: null,
    empresas: [],
  };

  selectEmpresa = (empresaSelecionada: number) => {
    this.setState({
      empresaSelecionada,
      plantaSelecionada: null,
    });
  };

  selectPlanta = (idPlantaSelecionada: number) => {
    const { empresaSelecionada } = this.state;
    const plantas = this.getPlantasFromEmpresa(empresaSelecionada);
    const plantaSelecionada = plantas.find(
      (planta) => planta.id === idPlantaSelecionada
    );
    this.setState({ plantaSelecionada });
  };

  getPlantasFromEmpresa = (idEmpresa: number) => {
    const { empresas } = this.props;
    const { listaEmpresas } = empresas;
    if (!listaEmpresas || !Array.isArray(listaEmpresas)) {
      return [];
    }
    const empresa = listaEmpresas.find((empresa) => empresa.id === idEmpresa);
    if (!empresa) {
      return [];
    }
    return empresa.plantas;
  };

  iniciaManutencao = async () => {
    const { navigation, setPlantaAtiva, addProgramacao } = this.props;
    const { plantaSelecionada } = this.state;
    const { proximaProgramacao } = plantaSelecionada;
    if (!proximaProgramacao) {
      Toast.show({
        title: 'Sem programação armazenada para esta planta!',
        position: 'bottom',
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
  };

  render() {
    const { empresaSelecionada, plantaSelecionada } = this.state;
    const { empresas } = this.props;
    const { listaEmpresas } = empresas;

    if ((listaEmpresas || []).length === 0) {
      return (
        <Box padding={7}>
          <Text fontSize='lg'> Nenhuma planta disponível para seleção </Text>
        </Box>
      );
    }

    return (
      <Container>
        <HeaderNav title='Selecionar Planta' />
        <Box
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <FormControl>
            <Stack style={{ height: 50 }}>
              <FormControl.Label>Empresa</FormControl.Label>
              <Select
                placeholder='Selecione uma empresa'
                selectedValue={`${empresaSelecionada}`}
                onValueChange={(value) => this.selectEmpresa(Number(value))}
              >
                <Select.Item label='Selecione uma empresa' value='0' key={0} />
                {Array.isArray(listaEmpresas) && listaEmpresas.length > 0 ? (
                  listaEmpresas.map((empresa) => {
                    return (
                      <Select.Item
                        label={empresa.nome}
                        value={`${empresa.id}`}
                        key={empresa.id}
                      />
                    );
                  })
                ) : (
                  <>
                    <Select.Item
                      label='Nenhuma empresa carregada'
                      value='0'
                      key={0}
                    />
                  </>
                )}
              </Select>
            </Stack>
            <Stack style={{ height: 50 }}>
              <FormControl.Label>Planta</FormControl.Label>
              <Select
                placeholder='Selecione uma planta'
                selectedValue={`${plantaSelecionada?.id}`}
                onValueChange={(value) => this.selectPlanta(Number(value))}
              >
                <Select.Item label='Selecione uma planta' value='0' key={0} />
                {Array.isArray(listaEmpresas) && listaEmpresas.length > 0 ? (
                  this.getPlantasFromEmpresa(empresaSelecionada).map(
                    (planta) => (
                      <Select.Item
                        label={planta.nome}
                        value={`${planta.id}`}
                        key={planta.id}
                      />
                    )
                  )
                ) : (
                  <>
                    <Select.Item
                      label='Nenhuma empresa carregada'
                      value='0'
                      key={0}
                    />
                  </>
                )}

              </Select>
            </Stack>
          </FormControl>
          <Button
            disabled={empresaSelecionada === null}
            onPress={() => this.iniciaManutencao()}
          >
            <Text>Iniciar manutenção</Text>
          </Button>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  empresas: state.empresasReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, PlantaActions, ProgramacoesActions),
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelecionaPlanta);
