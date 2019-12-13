import React, { Component } from 'react';
import { Container, Content, Button, Text, Card, CardItem, Body, Spinner, View } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as EmpresasActions from '../../store/ducks/empresas/actions'
import { connect } from 'react-redux';
import { EmpresasState, Empresa } from '../../store/ducks/empresas/types';
import { ApplicationState } from '../../store'
import ActionButton from '../../components/ActionButton';
import { UsuariosState } from '../../store/ducks/usuarios/types';

interface StateProps {
  empresasReducer: EmpresasState
  usuariosReducer: UsuariosState
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
    const { empresasReducer, usuariosReducer } = this.props;
    const { listaEmpresas, loading } = empresasReducer;
    const { listaUsuarios } = usuariosReducer;

    const totalPlantasReducer = (total: number, empresa: Empresa) => total + empresa.plantas.length;
    const totalPlantas = listaEmpresas.reduce(totalPlantasReducer, 0);

    const totalUsuarios = listaUsuarios.length;

    const role = 'admin';
    return (
      <Container>
        <HeaderNav title="Sincronizar Empresas"/>
        <Content padder contentContainerStyle={{ flex:1, flexDirection:'column', justifyContent: 'space-between'}}>
          <View>
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
                    {totalPlantas} plantas armazenadas no total
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Text>Usuários</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    {totalUsuarios} usuários armazenados e autorizados a utilizarem este dispostivo
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </View>
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
  empresasReducer: state.empresasReducer,
  usuariosReducer: state.usuariosReducer,
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(EmpresasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SyncEmpresas)