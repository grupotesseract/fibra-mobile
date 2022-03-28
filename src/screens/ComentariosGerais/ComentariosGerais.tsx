import React, { Component } from 'react';
import { Box, TextArea } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import { Planta } from '../../store/ducks/planta/types';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import ActionButton from '../../components/ActionButton';

interface StateProps {
  plantaAtiva: Planta;
  programacoesRealizadas: ProgramacaoRealizada[];
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  armazenaComentarioItem({ idProgramacao, idItem, comentario }): void;
  armazenaComentariosGerais({ idProgramacao, comentario }): void;
}

type Props = StateProps & DispatchProps;

class ComentariosGerais extends Component<Props> {
  state = {
    comentario: '',
  };

  salvaComentario = async () => {
    const {
      navigation,
      plantaAtiva,
      armazenaComentarioItem,
      armazenaComentariosGerais,
    } = this.props;
    const idItem = navigation.state.params?.idItem || null;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const { comentario } = this.state;

    if (idItem) {
      await armazenaComentarioItem({ idItem, idProgramacao, comentario });
    } else {
      await armazenaComentariosGerais({ idProgramacao, comentario });
    }
    navigation.goBack();
  };

  componentDidMount() {
    const { plantaAtiva, programacoesRealizadas, navigation } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const programacao = programacoesRealizadas.find(
      (p: ProgramacaoRealizada) => p.programacao.id === idProgramacao
    );
    const idItem = navigation.state.params?.idItem || null;
    if (programacao) {
      if (idItem) {
        const Comentario = programacao.comentarios.find(
          (comentario) => comentario.item_id == idItem
        );
        this.setState({
          comentario: Comentario ? Comentario.comentario : null,
        });
      } else {
        const comentario = programacao.programacao.comentarioGeral;
        this.setState({
          comentario,
        });
      }
    }
  }

  render() {
    const { comentario } = this.state;
    return (
      <Box flex={1} padding={7}>
        <TextArea
          flex={1}
          value={comentario}
          variant='outline'
          mb={2}
          onChangeText={(comentario) => this.setState({ comentario })}
        />
        <ActionButton onPress={() => this.salvaComentario()}>
          Concluído
        </ActionButton>
      </Box>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComentariosGerais);
