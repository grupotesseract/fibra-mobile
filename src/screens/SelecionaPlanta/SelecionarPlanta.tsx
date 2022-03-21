import React, { useState } from 'react';
import {
  Box,
  Text,
  Toast,
  FormControl,
  Stack,
  Select,
  HStack,
  Divider,
} from 'native-base';
import { bindActionCreators, Dispatch } from 'redux';
import * as PlantaActions from '../../store/ducks/planta/actions';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { connect } from 'react-redux';
import { EmpresasState } from '../../store/ducks/empresas/types';
import { ApplicationState } from '../../store';
import { Planta } from '../../store/ducks/planta/types';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import { NavigationScreenProp } from 'react-navigation';
import ActionButton from '../../components/ActionButton';

interface StateProps {
  empresas: EmpresasState;
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  setPlantaAtiva(planta: Planta): void;
  addProgramacao(programacao: ProgramacaoRealizada): void;
}

type Props = StateProps & DispatchProps;

const SelecionaPlanta = (props: Props) => {

  const [empresaSelecionada, setEmpresaSelecionada] = useState(0)
  const [plantaSelecionada, setPlantaSelecionada] = useState(null)
  const [listaEmpresas, setListaEmpresas] = useState(props.empresas.listaEmpresas)

  const selectEmpresa = (novaEmpresaSelecionada: number) => {
    setEmpresaSelecionada(novaEmpresaSelecionada),
      setPlantaSelecionada(null)

  };

  const selectPlanta = (idPlantaSelecionada: number) => {
    const plantas = getPlantasFromEmpresa(empresaSelecionada);
    const novaPlantaSelecionada = plantas.find(
      (planta) => planta.id === idPlantaSelecionada
    );
    setPlantaSelecionada(novaPlantaSelecionada)
  };

  const getPlantasFromEmpresa = (idEmpresa: number) => {
    if (!listaEmpresas || !Array.isArray(listaEmpresas)) {
      return [];
    }
    const empresa = listaEmpresas.find((empresa) => empresa.id === idEmpresa);
    if (!empresa) {
      return [];
    }
    return empresa.plantas;
  };

  const iniciaManutencao = async () => {
    const { navigation, setPlantaAtiva, addProgramacao } = props;
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


  if ((listaEmpresas || []).length === 0) {
    return (
      <Box padding={7}>
        <Text fontSize='lg'> Nenhuma planta disponível para seleção </Text>
      </Box>
    );
  }

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
            onValueChange={(value) => selectEmpresa(Number(value))}
            flex={1}
            fontSize='md'
            variant='unstyled'
          >
            <Select.Item label='Selecione uma empresa' value='0' key={'e0'} />
            {Array.isArray(listaEmpresas) && listaEmpresas.length > 0 ? (
              listaEmpresas.map((empresa) => {
                return (
                  <Select.Item
                    label={empresa.nome}
                    value={`${empresa.id}`}
                    key={`E${empresa.id}`}
                  />
                );
              })
            ) : (
              <>
                <Select.Item
                  label='Nenhuma empresa carregada'
                  value='0'
                  key={'e1'}
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
            onValueChange={(value) => selectPlanta(Number(value))}
            flex={1}
            fontSize='md'
            variant='unstyled'

          >
            <Select.Item label='Selecione uma planta' value='0' key={'p0'} />
            {Array.isArray(listaEmpresas) && listaEmpresas.length > 0 ? (
              getPlantasFromEmpresa(empresaSelecionada).map(
                (planta) => (
                  <Select.Item
                    label={planta.nome}
                    value={`${planta.id}`}
                    key={`P${planta.id}`}
                  />
                )
              )
            ) : (
              <>
                <Select.Item
                  label='Nenhuma empresa carregada'
                  value='0'
                  key={'p1'}
                />
              </>
            )}
          </Select>
        </HStack>
        <Divider />

      </FormControl>
      <ActionButton
        isDisabled={empresaSelecionada === 0}
        onPress={() => iniciaManutencao()}
      >
        Iniciar manutenção
      </ActionButton>
    </Stack>
  );
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
