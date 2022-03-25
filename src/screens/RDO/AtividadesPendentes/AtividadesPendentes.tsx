import { ScrollView, Stack, Text, Icon, HStack, Pressable } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ApplicationState } from '../../../store'
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';
import { EmpresasState } from '../../../store/ducks/empresas/types';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard'
import { AntDesign } from '@expo/vector-icons'

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
      <ScrollView>
        <Stack padding={7} space={5}>
          {atividadesPendentes.map(atividadePendente => {
            return (
              <Pressable onPress={() => this.writeToClipboard(atividadePendente.texto)}>
                <HStack key={atividadePendente.id} alignItems='center'>
                  <Text style={{ flex: 1 }}>{atividadePendente.texto}</Text>
                  <Icon
                    as={AntDesign}
                    name="copy1"
                  />
                </HStack>
              </Pressable>
            )
          })}
        </Stack>
      </ScrollView >
    )
  }
}


const mapStateToProps = (state: ApplicationState) => ({
  rdoAtual: state.manutencaoRDOReducer.rdoAtual,
  empresas: state.empresasReducer,
})

export default connect(mapStateToProps)(AtividadesPendentes)
