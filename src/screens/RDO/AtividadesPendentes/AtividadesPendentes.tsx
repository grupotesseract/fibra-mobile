import { Box, List, Stack, Text, Icon } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeaderNav from '../../../components/HeaderNav'
import { ApplicationState } from '../../../store'
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';
import { EmpresasState } from '../../../store/ducks/empresas/types';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard'

interface StateProps {
  empresas: EmpresasState,
  rdoAtual: ManutencaoRDO,
}

type Props = StateProps

class AtividadesPendentes extends Component<Props> {

  writeToClipboard = async (texto) => {
    await Clipboard.setString(texto);
    Alert.alert('Texto copiado', 'Copiado para a área de transferência!');
  };


  render() {
    const { rdoAtual, empresas } = this.props
    const plantaSelecionaId = rdoAtual.plantaSelecionadaId;

    let planta;
    empresas.listaEmpresas.find(empresa => {
      planta = empresa.plantas.find(planta => {
        return planta.id === plantaSelecionaId
      })
      return planta;
    })

    const atividadesPendentes = planta.atividadesPendentes;

    return (
      <Box>
        <HeaderNav title="Atividades Pendentes" />

        <Box>
          <List>
            {atividadesPendentes.map(atividadePendente => {
              return (
                <Stack key={atividadePendente.id}>
                  <Text style={{ flex: 1 }}>{atividadePendente.texto}</Text>
                  <Icon
                    type="AntDesign"
                    name="checkcircle"
                    style={{ color: 'grey', padding: 5 }}
                    onPress={() => this.writeToClipboard(atividadePendente.texto)}
                  />
                </Stack>
              )
            })}
          </List>
        </Box>
      </Box>
    )
  }
}


const mapStateToProps = (state: ApplicationState) => ({
  rdoAtual: state.manutencaoRDOReducer.rdoAtual,
  empresas: state.empresasReducer,
})

export default connect(mapStateToProps)(AtividadesPendentes)
