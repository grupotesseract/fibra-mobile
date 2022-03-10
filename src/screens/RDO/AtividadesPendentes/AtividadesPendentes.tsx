import { Container, Content, List, ListItem, Text, Icon, Button } from 'native-base'
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
      <Container>
        <HeaderNav title="Atividades Pendentes" />

        <Content padder>
          <List>
            {atividadesPendentes.map(atividadePendente => {
              return (
                <ListItem key={atividadePendente.id}>
                  <Text style={{ flex: 1 }}>{atividadePendente.texto}</Text>
                  <Icon
                    type="AntDesign"
                    name="checkcircle"
                    style={{ color: 'grey', padding: 5 }}
                    onPress={() => this.writeToClipboard(atividadePendente.texto)}
                  />
                </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
    )
  }
}


const mapStateToProps = (state: ApplicationState) => ({
  rdoAtual: state.manutencaoRDOReducer.rdoAtual,
  empresas: state.empresasReducer,
})

export default connect(mapStateToProps)(AtividadesPendentes)
