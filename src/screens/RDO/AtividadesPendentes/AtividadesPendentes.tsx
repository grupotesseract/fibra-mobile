import { Container, Content, List, ListItem, Text } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeaderNav from '../../../components/HeaderNav'
import { ApplicationState } from '../../../store'
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';
import { EmpresasState } from '../../../store/ducks/empresas/types';

interface StateProps {
  empresas: EmpresasState,
  rdoAtual: ManutencaoRDO,
}

type Props = StateProps

class AtividadesPendentes extends Component<Props> {

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
        <HeaderNav title="Atividades Pendentes"/>

        <Content padder>
          <List>
            {atividadesPendentes.map(atividadePendente => {
              return (
                <ListItem key={atividadePendente.id}>
                  <Text>{atividadePendente.texto}</Text>
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
