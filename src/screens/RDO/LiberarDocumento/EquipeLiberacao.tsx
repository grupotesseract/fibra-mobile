import React, { Component } from 'react';
import {
  Box,
  Text,
  Button,
  Input,
  Heading,
  Checkbox,
  Stack,
  HStack,
  Divider,
  ScrollView,
} from 'native-base';
import { bindActionCreators, Dispatch } from 'redux';

import * as RDOActions from '../../../store/ducks/rdo/actions';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { Usuario } from '../../../store/ducks/usuarios/types';
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  usuarios: Usuario[];
  navigation: NavigationScreenProp<any, any>;
  equipeFiscalizacao: String;
}

interface DispatchProps {
  selecionarEquipe({ colaboradores, equipeFiscalizacao }): void;
  salvaHoraInicioAtividades(): void;
}

type Props = StateProps & DispatchProps;
class EquipeLiberacao extends Component<Props> {
  state = {
    idsUsuariosSelecionados: [],
    now: new Date().toISOString(),
    equipeFiscalizacao: '',
  };

  onPressBotaoColaborador = (idColaborador: number) => {
    const { idsUsuariosSelecionados } = this.state;
    let listaIds = [];
    if (!idsUsuariosSelecionados.includes(idColaborador)) {
      listaIds = [...idsUsuariosSelecionados, idColaborador];
    } else {
      listaIds = idsUsuariosSelecionados.filter((id) => id !== idColaborador);
    }
    this.setState({ idsUsuariosSelecionados: listaIds });
  };

  liberarDocumento = async () => {
    const {
      navigation,
      selecionarEquipe,
      salvaHoraInicioAtividades,
    } = this.props;
    const { idsUsuariosSelecionados, equipeFiscalizacao } = this.state;

    await selecionarEquipe({
      colaboradores: idsUsuariosSelecionados,
      equipeFiscalizacao,
    });
    await salvaHoraInicioAtividades();
    navigation.navigate({ routeName: 'RDOLiberarDocumentoRegistro' });
  };

  render() {
    const { usuarios } = this.props;
    const { idsUsuariosSelecionados, equipeFiscalizacao } = this.state;

    const colaboradores = usuarios.filter(
      (usuario) => usuario.role === 'tecnico'
    );
    return (
      <ScrollView>
        <Stack padding={7} flex={1} space={4}>
          <Heading>Equipe de fiscalização</Heading>

          <Box>
            <HStack alignItems='center'>
              <Text bold>Equipe: </Text>
              <Input
                value={equipeFiscalizacao}
                onChangeText={(equipeFiscalizacao) =>
                  this.setState({ equipeFiscalizacao })
                }
                flex={1}
                variant='unstyled'
              />
            </HStack>
            <Divider />
          </Box>

          <Heading>Colaboradores</Heading>
          {colaboradores.map((colaborador) => {
            return (
              <Checkbox
                key={colaborador.id}
                value={colaborador.id.toString()}
                isChecked={idsUsuariosSelecionados.includes(colaborador.id)}
                onChange={() => this.onPressBotaoColaborador(colaborador.id)}
                ml={2}
              >
                {colaborador.nome}
              </Checkbox>
            );
          })}
          <Button
            isDisabled={idsUsuariosSelecionados.length <= 0}
            onPress={() => this.liberarDocumento()}
          >
            Registrar Equipe
          </Button>
        </Stack>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  usuarios: state.usuariosReducer.listaUsuarios,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EquipeLiberacao);
