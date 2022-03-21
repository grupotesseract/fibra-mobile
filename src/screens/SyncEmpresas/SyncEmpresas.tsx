import React, { Component } from 'react'
import { Box, Container, Text, Stack } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import ActionButton from '../../components/ActionButton'
import HeaderNav from '../../components/HeaderNav'
import { ApplicationState } from '../../store'
import * as EmpresasActions from '../../store/ducks/empresas/actions'
import { Empresa, EmpresasState } from '../../store/ducks/empresas/types'
import { UsuariosState } from '../../store/ducks/usuarios/types'
import brandColors from '../../theme/brandColors'

interface StateProps {
  empresasReducer: EmpresasState
  usuariosReducer: UsuariosState
}

interface DispatchProps {
  empresasUpdate(): void
}

type Props = StateProps & DispatchProps

const SyncEmpresas = (props: Props) => {

  const { empresasUpdate, empresasReducer, usuariosReducer } = props;
  const { listaEmpresas, loading } = empresasReducer;
  const { listaUsuarios } = usuariosReducer;

  const atualizarEmpresas = async () => {
    await empresasUpdate();
  }

  const totalPlantasReducer = (total: number, empresa: Empresa) => total + empresa.plantas.length;
  const totalPlantas = listaEmpresas.reduce(totalPlantasReducer, 0);

  const totalUsuarios = listaUsuarios.length;

  return (

    <Stack padding={7} flex={1} justifyContent='space-between' >
      <Stack space={5}>
        <Box borderColor="coolGray.300" borderWidth="1" shadow={1} padding={4}>
          <Text bold color={brandColors.primary} mb={2}>Empresas</Text>
          <Text>
            {listaEmpresas.length} empresas armazenadas neste dispositivo
          </Text>
        </Box>

        <Box borderColor="coolGray.300" borderWidth="1" shadow={1} padding={4}>
          <Text bold color={brandColors.primary} mb={2}>Plantas</Text>
          <Text>
            {totalPlantas} plantas armazenadas no total
          </Text>
        </Box>

        <Box borderColor="coolGray.300" borderWidth="1" shadow={1} padding={4}>
          <Text bold color={brandColors.primary} mb={2}>Usuários</Text>
          <Text>
            {totalUsuarios} usuários armazenados e autorizados a utilizarem este dispostivo
          </Text>
        </Box>
      </Stack>
      <ActionButton
        isLoading={loading}
        onPress={() => atualizarEmpresas()}>
        Atualizar empresas e usuários
      </ActionButton>
    </Stack>
  );

}

const mapStateToProps = (state: ApplicationState) => ({
  empresasReducer: state.empresasReducer,
  usuariosReducer: state.usuariosReducer,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(EmpresasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SyncEmpresas)
