import React, { Component } from 'react';
import {
  Text,
  FormControl,
  Stack,
  Select,
  Input,
  HStack,
  Divider,
} from 'native-base';
import { bindActionCreators, Dispatch } from 'redux';
import * as RDOActions from '../../../store/ducks/rdo/actions';
import { connect } from 'react-redux';
import { EmpresasState } from '../../../store/ducks/empresas/types';
import { ApplicationState } from '../../../store';
import { Planta } from '../../../store/ducks/planta/types';
import { NavigationScreenProp } from 'react-navigation';
import ActionButton from '../../../components/ActionButton';

interface StateProps {
  empresas: EmpresasState;
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  selecionarPlanta({
    plantaSelecionadaId: number,
    obraAtividade: string,
  }): void;
}

type Props = StateProps & DispatchProps;

interface State {
  empresaSelecionada: number;
  plantaSelecionada: Planta;
  obraAtividade: string;
}

class SelecionaPlantaRDO extends Component<Props, State> {
  state = {
    empresaSelecionada: 0,
    plantaSelecionada: null,
    empresas: [],
    obraAtividade: '',
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

  iniciaRDO = async () => {
    const { navigation, selecionarPlanta } = this.props;
    const {
      plantaSelecionada: { id },
      obraAtividade,
    } = this.state;

    await selecionarPlanta({
      plantaSelecionadaId: id,
      obraAtividade,
    });

    navigation.navigate('RDOLiberarDocumentoEquipe');
  };

  render() {
    const { empresaSelecionada, plantaSelecionada, obraAtividade } = this.state;
    const { empresas } = this.props;
    const { listaEmpresas } = empresas;

    return (
      <Stack padding={7} flex={1}
        justifyContent='space-between'
      >
        <FormControl>
          <HStack height={'50px'} alignItems='center'>
            <Text bold>Empresa</Text>
            <Select
              placeholder='Selecione uma empresa'
              selectedValue={`${empresaSelecionada}`}
              onValueChange={(value) => this.selectEmpresa(Number(value))}
              flex={1}
              fontSize='md'
              variant='unstyled'
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
          </HStack>
          <Divider />
          <HStack height={'50px'} alignItems='center'>
            <Text bold>Planta</Text>
            <Select
              placeholder='Selecione uma planta'
              selectedValue={`${plantaSelecionada?.id}`}
              onValueChange={(value) => this.selectPlanta(Number(value))}
              flex={1}
              fontSize='md'
              variant='unstyled'

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
          </HStack>
          <Divider />

          <HStack alignItems='center'>
            <Text bold>Obra/Atividade</Text>
            <Input
              value={obraAtividade}
              onChangeText={(obraAtividade) =>
                this.setState({ obraAtividade })
              }
              flex={1}
              variant='unstyled'
            />
          </HStack>
          <Divider />

        </FormControl>
        <ActionButton
          isDisabled={empresaSelecionada === null}
          onPress={() => this.iniciaRDO()}
        >Iniciar RDO
        </ActionButton>
      </Stack>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  empresas: state.empresasReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelecionaPlantaRDO);
