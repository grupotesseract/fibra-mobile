import React, { Component } from 'react';
import {
  Container,
  Button,
  Text,
  Box,
  Stack,
  HStack,
  Divider,
} from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Planta } from '../../store/ducks/planta/types';
import { ActivityIndicator, View } from 'react-native';
import { iso2ddmmaaaa } from '../../utils/utils';
import { NavigationScreenProp } from 'react-navigation';
import ActionButton from '../../components/ActionButton';

interface StateProps {
  plantaAtiva: Planta;
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  confirmaPeriodoProgramacao(
    idProgramacao: number,
    dataInicioReal: string
  ): void;
}

type Props = StateProps & DispatchProps;

class ConfirmarPeriodoManutencao extends Component<Props> {
  confirmarPeriodo = async () => {
    const { navigation, confirmaPeriodoProgramacao, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const now = new Date().toISOString();
    await confirmaPeriodoProgramacao(idProgramacao, now);
    navigation.navigate('LiberarDocumento');
  };

  render() {
    const { plantaAtiva } = this.props;

    if (!plantaAtiva) {
      return <ActivityIndicator color='blue' />;
    }

    const { proximaProgramacao } = plantaAtiva;
    if (!proximaProgramacao) {
      return <ActivityIndicator color='blue' />;
    }
    const dataInicioPrevista = proximaProgramacao.data_inicio_prevista.split(
      'T'
    )[0];
    const dataFimPrevista = proximaProgramacao.data_fim_prevista.split('T')[0];
    return (
      <Stack padding={7} flex={1}
        justifyContent='space-between'
      >
        <Stack space={2}>
          <Text>Confirmar período de Manutenção</Text>
          <HStack space={2} alignItems='center'>
            <Text bold ml={2} >Início</Text >
            <Text>{iso2ddmmaaaa(dataInicioPrevista)}</Text>
          </HStack>
          <Divider />
          <HStack space={2} alignItems='center'>
            <Text bold ml={2}>Fim</Text>
            <Text>{iso2ddmmaaaa(dataFimPrevista)}</Text>
          </HStack>
          <Divider />
        </Stack>
        <ActionButton onPress={() => this.confirmarPeriodo()}>
          Confirmar período
        </ActionButton>
      </Stack>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmarPeriodoManutencao);
