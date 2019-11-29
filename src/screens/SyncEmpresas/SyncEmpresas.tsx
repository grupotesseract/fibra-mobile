import React, { Component } from 'react';
import { Container, Content, Button, Text, Card, CardItem, Body, Spinner } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as EmpresasActions from '../../store/ducks/empresas/actions'
import { connect } from 'react-redux';
import { EmpresasState, Empresa } from '../../store/ducks/empresas/types';
import { ApplicationState } from '../../store'
import ActionButton from '../../components/ActionButton';

interface StateProps {
  empresas: EmpresasState
}

interface DispatchProps {
  empresasUpdate(): void
}

type Props = StateProps & DispatchProps

interface State {
}

class SyncEmpresas extends Component<Props, State> {

  atualizarEmpresas = async () => {
    const { empresasUpdate } = this.props;
    await empresasUpdate();
  }

  render() {
    const { empresas } = this.props;
    const { listaEmpresas, loading } = empresas;

    const totalPlantasReducer = (total: number, empresa: Empresa) => total + empresa.plantas.length;
    const totalPlantas = listaEmpresas.reduce(totalPlantasReducer, 0);

    console.log("listaEmpresas", listaEmpresas)
    const role = 'admin';
    return (
      <Container>
        <HeaderNav title="Sincronizar Empresas"/>
        <Content padder contentContainerStyle={{ flex:1, flexDirection:'column', justifyContent: 'space-between'}}>
          <Card>
            <CardItem header>
              <Text>Empresas</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {listaEmpresas.length} empresas armazenadas neste dispositivo
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Plantas</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {totalPlantas} plantas aramazenadas no total.
                </Text>
              </Body>
            </CardItem>
          </Card>
          <ActionButton 
            block 
            loading={loading}
            disabled={(role !== 'admin')}
            onPress={() => this.atualizarEmpresas()}>
            <Text>Atualizar empresas e usuários</Text>
          </ActionButton>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  empresas: state.empresas,
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(EmpresasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SyncEmpresas)