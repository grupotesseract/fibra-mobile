import React, { Component } from 'react';
import {
  Text,
  Box,
  Input,
  Heading,
  Checkbox,
  Stack,
  ScrollView,
  Center,
  HStack,
} from 'native-base';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { ApplicationState } from '../../store';
import { Planta } from '../../store/ducks/planta/types';
import { Usuario } from '../../store/ducks/usuarios/types';
import { NavigationScreenProp } from 'react-navigation';
import ActionButton from '../../components/ActionButton';

interface StateProps {
  plantaAtiva: Planta;
  usuarios: Usuario[];
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  liberarDocumentoPlanta(
    idProgramacao: number,
    now: string,
    usuarios: number[]
  ): void;
}

type Props = StateProps & DispatchProps;
class LiberarDocumento extends Component<Props> {
  state = {
    idsUsuariosSelecionados: [],
    now: new Date().toISOString(),
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
    const { navigation, liberarDocumentoPlanta, plantaAtiva } = this.props;
    const { idsUsuariosSelecionados } = this.state;
    const now = new Date().toISOString();
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    this.setState({ now });

    await liberarDocumentoPlanta(idProgramacao, now, idsUsuariosSelecionados);
    navigation.navigate({ routeName: 'MenuVistoria' });
  };

  render() {
    const { usuarios } = this.props;
    const { now, idsUsuariosSelecionados } = this.state;
    const nowDateObj = new Date();
    const hora = nowDateObj.getHours();
    const minuto = nowDateObj.getMinutes();

    const colaboradores = usuarios.filter(
      (usuario) => usuario.role === 'tecnico'
    );
    return (
      <Box padding={7}>
        <ScrollView>
          <Stack space={5}>
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
          </Stack>
          <Stack space={4} marginY={30}>
            <Heading>Liberação de documentos</Heading>
            <Center>
              <HStack alignItems='center'>
                <Input
                  fontSize='35'
                  value={hora < 10 ? '0' + hora.toString() : hora.toString()}
                  keyboardType='numeric'
                />
                <Text fontSize='35'>:</Text>
                <Input
                  fontSize='35'
                  value={
                    minuto < 10 ? '0' + minuto.toString() : minuto.toString()
                  }
                  keyboardType='numeric'
                />
                <Text fontSize='35'>h</Text>
              </HStack>
            </Center>
          </Stack>
          <ActionButton
            isDisabled={idsUsuariosSelecionados.length <= 0}
            onPress={() => this.liberarDocumento()}
          >
            Iniciar manutenção
          </ActionButton>
        </ScrollView>
      </Box>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  usuarios: state.usuariosReducer.listaUsuarios,
  plantaAtiva: state.plantaReducer.plantaAtiva,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LiberarDocumento);
