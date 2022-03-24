import React, { Component } from 'react';
import { Box, Text, Button, List, Input, Heading, Checkbox, Stack, Pressable } from 'native-base';
import HeaderNav from '../../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store'
import { Usuario } from '../../../store/ducks/usuarios/types';
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  usuarios: Usuario[],
  navigation: NavigationScreenProp<any, any>,
  equipeFiscalizacao: String;
}

interface DispatchProps {
  selecionarEquipe({ colaboradores, equipeFiscalizacao }): void,
  salvaHoraInicioAtividades(): void
}

type Props = StateProps & DispatchProps
class EquipeLiberacao extends Component<Props> {

  state = {
    idsUsuariosSelecionados: [],
    now: new Date().toISOString(),
    equipeFiscalizacao: '',
  }

  onPressBotaoColaborador = (idColaborador: number) => {
    const { idsUsuariosSelecionados } = this.state;
    let listaIds = [];
    if (!idsUsuariosSelecionados.includes(idColaborador)) {
      listaIds = [
        ...idsUsuariosSelecionados,
        idColaborador,
      ]
    } else {
      listaIds = idsUsuariosSelecionados.filter(id => id !== idColaborador)
    }
    this.setState({ idsUsuariosSelecionados: listaIds })
  }

  liberarDocumento = async () => {
    const { navigation, selecionarEquipe, salvaHoraInicioAtividades } = this.props;
    const { idsUsuariosSelecionados, equipeFiscalizacao } = this.state;

    await selecionarEquipe({
      colaboradores: idsUsuariosSelecionados,
      equipeFiscalizacao,
    });
    await salvaHoraInicioAtividades();
    navigation.navigate({ routeName: 'RDOLiberarDocumentoRegistro' })
  }

  render() {
    const { usuarios } = this.props;
    const { idsUsuariosSelecionados, equipeFiscalizacao } = this.state;

    const colaboradores = usuarios.filter(usuario => usuario.role === 'tecnico');
    return (
      <Box>
        <HeaderNav title="Liberação de Documento" />

        <Box>
          <Heading>Equipe de fiscalização</Heading>
          <Stack style={{ marginBottom: 30 }}>
            <Text>Equipe:</Text>
            <Input
              value={equipeFiscalizacao}
              onChangeText={equipeFiscalizacao => this.setState({ equipeFiscalizacao })} />
          </Stack>
          <Heading>Colaboradores</Heading>
          <List>
            {colaboradores.map(colaborador => {
              return <Pressable
                key={colaborador.id}
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingRight: 0,
                  marginLeft: 0,

                }}
                onPress={() => this.onPressBotaoColaborador(colaborador.id)}
              >
                <Text>{colaborador.nome}</Text>
                <Checkbox
                  isChecked={idsUsuariosSelecionados.includes(colaborador.id)}
                  onPress={() => this.onPressBotaoColaborador(colaborador.id)}
                >
                </Checkbox>
              </Pressable>
            })}
          </List>
          <Button

            isDisabled={idsUsuariosSelecionados.length <= 0}
            onPress={() => this.liberarDocumento()}
          >
            <Text>Registrar Equipe</Text>
          </Button>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  usuarios: state.usuariosReducer.listaUsuarios,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EquipeLiberacao)
