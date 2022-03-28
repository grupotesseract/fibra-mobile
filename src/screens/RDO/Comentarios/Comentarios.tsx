import React, { Component } from 'react';
import { Box, TextArea } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../../store';
import * as RDOActions from '../../../store/ducks/rdo/actions';
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';
import ActionButton from '../../../components/ActionButton';

interface StateProps {
  rdoAtual: ManutencaoRDO;
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  atualizaComentario({ tipoComentario, comentario }): void;
  salvaHoraFinalLEM(): void;
  salvaHoraFinalLET(): void;
}

type Props = StateProps & DispatchProps;

class ComentariosRDO extends Component<Props> {
  state = {
    comentario: '',
  };

  salvaComentario = async () => {
    const {
      navigation,
      atualizaComentario,
      salvaHoraFinalLEM,
      salvaHoraFinalLET,
    } = this.props;
    const tipoComentario = navigation.state.params?.tipo || null;

    const { comentario } = this.state;

    if (tipoComentario === 'LEM') {
      await salvaHoraFinalLEM();
    }

    if (tipoComentario === 'LET') {
      await salvaHoraFinalLET();
    }

    await atualizaComentario({ tipoComentario, comentario });
    navigation.goBack();
  };

  componentDidMount() {
    const { navigation, rdoAtual } = this.props;
    const tipoComentario = navigation.state.params?.tipo || null;

    const title = ((tipoComentario: String) => {
      switch (tipoComentario) {
        case 'IT':
        case 'OS':
        case 'LEM':
        case 'LET':
          return 'Registrar ' + tipoComentario;
        case 'problemas_encontrados':
          return 'Problemas Encontrados';
        case 'informacoes_adicionais':
          return 'Informações Adicionais';
        case 'observacoes':
          return 'Observações';
      }
    })(tipoComentario);
    this.props.navigation.setParams({ title });

    const comentario = ((tipoComentario: String) => {
      switch (tipoComentario) {
        case 'IT':
          return rdoAtual.liberacaoIT;
        case 'OS':
          return rdoAtual.liberacaoOS;
        case 'LEM':
          return rdoAtual.liberacaoLEM;
        case 'LET':
          return rdoAtual.liberacaoLET;
        case 'problemas_encontrados':
          return rdoAtual.problemasEncontrados;
        case 'informacoes_adicionais':
          return rdoAtual.infosAdicionais;
        case 'observacoes':
          return rdoAtual.observacoes;
      }
    })(tipoComentario);

    this.setState({
      comentario,
    });
  }

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title');
    return {
      title: `${title}`,
    };
  };

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
  rdoAtual: state.manutencaoRDOReducer.rdoAtual,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComentariosRDO);
