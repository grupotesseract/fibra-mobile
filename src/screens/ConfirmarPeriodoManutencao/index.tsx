import React, { Component } from 'react';
import { Container, Content, Form, Item, Label, Button, Text } from 'native-base';
import HeaderNav from '../../components/HeaderNav';

import { bindActionCreators, Dispatch } from 'redux';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store'
import { Planta } from '../../store/ducks/planta/types';
import { ActivityIndicator } from 'react-native';

interface StateProps {
  plantaAtiva: Planta,
}

interface DispatchProps {
  confirmaPeriodoProgramacao(idProgramacao: number, dataInicioReal: Date): void,
}

type Props = StateProps & DispatchProps

const iso2ddmmaaaa = (utfData: string) => utfData.split('-').reverse().join('/');

class ConfirmarPeriodoManutencao extends Component<Props> {

  confirmarPeriodo = async () => {
    const { navigation, confirmaPeriodoProgramacao, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    await confirmaPeriodoProgramacao(idProgramacao, new Date());
    navigation.navigate('LiberarDocumento');
  }

  render() {
    const { plantaAtiva } = this.props;

    console.log(plantaAtiva);
    if (!plantaAtiva) {
      return <ActivityIndicator />
    }

    const { proximaProgramacao } = plantaAtiva;
    console.log(proximaProgramacao);
    if (!proximaProgramacao) {
      return <ActivityIndicator />
    }
    const dataInicioPrevista = proximaProgramacao.data_inicio_prevista.split('T')[0];
    const dataFimPrevista = proximaProgramacao.data_fim_prevista.split('T')[0];
    return (
      <Container>
        
        <HeaderNav title="Período Manutenção"/>

        <Content padder contentContainerStyle={{ flex:1, flexDirection:'column', justifyContent: 'space-between'}}>
          <Text>
            Confirmar período de Manutenção
          </Text>
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
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmarPeriodoManutencao)