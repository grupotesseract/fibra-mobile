import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Button,
  Text,
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
      <Container>
        <HeaderNav title='Período Manutenção' />
        <Content
          padder
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text>Confirmar período de Manutenção</Text>
            <Form>
              <Item>
                <Label>Início</Label>
                <Text>{iso2ddmmaaaa(dataInicioPrevista)}</Text>
              </Item>
              <Item>
                <Label>Fim</Label>
                <Text>{iso2ddmmaaaa(dataFimPrevista)}</Text>
              </Item>
            </Form>
          </View>
          <Button block onPress={() => this.confirmarPeriodo()}>
            <Text>Confirmar período</Text>
          </Button>
        </Content>
      </Container>
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
