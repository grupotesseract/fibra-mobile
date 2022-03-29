import React, { Component } from 'react';
import { Box, HStack, TextArea } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../../store';
import * as RDOActions from '../../../store/ducks/rdo/actions';
import { AtividadeRealizada } from '../../../store/ducks/rdo/types';
import ActionButton from '../../../components/ActionButton';

interface StateProps {
  atividadesRealizadas: AtividadeRealizada[];
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  atualizaAtividade({ id, descricao, concluido }): void;
}

type Props = StateProps & DispatchProps;

class EditaAtividade extends Component<Props> {
  state = {
    descricao: '',
    concluido: false,
  };

  salvaAtividade = async (concluido: boolean) => {
    const { navigation, atualizaAtividade } = this.props;
    const id = navigation.state.params?.id || null;

    const { descricao } = this.state;

    await atualizaAtividade({ id, descricao, concluido });
    navigation.navigate({
      routeName: 'AtividadesRealizadas',
      params: { id },
    });
  };

  componentDidMount() {
    const { atividadesRealizadas } = this.props;
    const { navigation } = this.props;
    const id = navigation.state.params?.id || null;

    const atividade = atividadesRealizadas.find(
      (atividade) => atividade.id === id
    );
    if (!atividade) {
      return;
    }

    this.setState({
      descricao: atividade.descricao,
      concluido: atividade.concluido,
    });
  }

  render() {
    const { descricao } = this.state;

    return (
      <Box padding={7} flex={1}>
        <TextArea
          flex={1}
          value={descricao}
          variant='outline'
          mb={2}
          onChangeText={(descricao) => this.setState({ descricao })}
        />
        <HStack space={2}>
          <ActionButton
            flex={1}
            colorScheme='danger'
            onPress={() => this.salvaAtividade(false)}
          >
            Atualiza Pendente
          </ActionButton>
          <ActionButton
            flex={1}
            colorScheme='success'
            onPress={() => this.salvaAtividade(true)}
          >
            Atualiza e conclui
          </ActionButton>
        </HStack>
      </Box>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  atividadesRealizadas:
    state.manutencaoRDOReducer.rdoAtual.atividadesRealizadas,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditaAtividade);
