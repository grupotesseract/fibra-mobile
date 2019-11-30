import React, { Component } from 'react';
import { Container, Icon, Content, Button, Text } from 'native-base';
import HeaderLogo from '../../components/HeaderLogo';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../store/ducks/auth/actions'
import { checkAuth } from '../../utils/authNavigation'
import { AuthState } from '../../store/ducks/auth/types';
import { NavigationAction } from 'react-navigation';

interface Props {
  auth: AuthState,
  navigation: NavigationAction
  authCancel(): void
}
class Menu extends Component<Props> {

  logoff  = async () => {
    const { authCancel, navigation } = this.props;
    await authCancel();
    await checkAuth({ auth: {}, navigation });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container>
          <HeaderLogo/>
          <Content padder>
              <Button
                onPress={() => navigate('SelecionaPlanta')}
                style={style.btnStyle}
              >
                <Icon name="bulb"/>
                <Text>Manutenção de iluminação</Text>
              </Button>
              <Button 
                onPress={() => navigate('Colaboradores')}
                style={style.btnStyle}
                >
                <Icon name="person"/>
                <Text>Colaboradores</Text>
              </Button>
              <Button 
                onPress={() => navigate('SyncEmpresas')}
                style={style.btnStyle}
                >
                <Icon name="cloud-download"/>
                <Text>Empresas, plantas e usuários</Text>
              </Button>
              <Button 
                onPress={() => navigate('Programacoes')}
                style={style.btnStyle}
                >
                <Icon name="cube"/>
                <Text>Programações</Text>
              </Button>
              <Button 
                onPress={() => this.logoff()}
                style={style.btnStyle}
                >
                <Icon name="exit"/>
                <Text>Sair</Text>
              </Button>
          </Content>
        </Container>
    );
  }
}

const style = {
  btnStyle: {
    marginVertical: 5,
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu)