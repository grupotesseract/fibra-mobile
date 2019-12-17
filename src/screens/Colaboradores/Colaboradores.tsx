import React, { Component } from 'react';
import { Container, Content, Text, ListItem, List } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { Usuario } from '../../store/ducks/usuarios/types';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

interface StateProps {
  usuarios: Usuario[],
}

interface DispatchProps {
  liberarDocumentoPlanta(idProgramacao: number, now: Date, usuarios: number[]): void,
}

type Props = StateProps & DispatchProps

class Colaboradores extends Component<Props> {

    render() {
    const { usuarios } = this.props;
    const colaboradores = usuarios.filter(usuario => usuario.role === 'tecnico');
        return (
          <Container>
            <HeaderNav title="Listagem de Colaboradores"/>

            <Content padder>
              <List>
                { colaboradores.map(colaborador => {
                  return <ListItem
                  key={colaborador.id} >
                    <Text>{colaborador.nome}</Text>
                  </ListItem>
                })}
              </List>
            </Content>
          </Container>
        );
      }
}


const mapStateToProps = (state: ApplicationState) => ({
  usuarios: state.usuariosReducer.listaUsuarios,
})

export default connect(mapStateToProps)(Colaboradores)