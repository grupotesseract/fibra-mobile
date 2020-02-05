import { Container, Content, List, ListItem, Text } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeaderNav from '../../components/HeaderNav'
import { ApplicationState } from '../../store'
import { Usuario } from '../../store/ducks/usuarios/types'

interface StateProps {
  usuarios: Usuario[],
}

type Props = StateProps

class Colaboradores extends Component<Props> {

  render() {
    const { usuarios } = this.props
    const colaboradores = usuarios.filter(usuario => usuario.role === 'tecnico')

    return (
      <Container>
        <HeaderNav title="Colaboradores"/>

        <Content padder>
          <List>
            {colaboradores.map(colaborador => {
              return (
                <ListItem key={colaborador.id}>
                  <Text>{colaborador.nome}</Text>
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
  usuarios: state.usuariosReducer.listaUsuarios,
})

export default connect(mapStateToProps)(Colaboradores)
