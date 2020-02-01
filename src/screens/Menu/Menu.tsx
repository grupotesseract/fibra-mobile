import React, { Component } from 'react';
import { Button, Icon, Text, View } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import HeaderLogo from '../../components/HeaderLogo';
import * as AuthActions from '../../store/ducks/auth/actions';
import { AuthState } from '../../store/ducks/auth/types';
import { checkAuth } from '../../utils/authNavigation';

interface Props {
  auth: AuthState,
  navigation: NavigationScreenProp<any, any>,
  authCancel(): void
}
class Menu extends Component<Props> {

  logoff = async () => {
    const { authCancel, navigation } = this.props
    await authCancel()
    await checkAuth({ auth: {}, navigation })
  }

  render() {
    const { navigation, auth } = this.props
    const { navigate } = navigation
    const { role } = auth.data

    return (
      <View>
        <HeaderLogo />

        <View padder>
          <Button onPress={() => navigate('SelecionaPlanta')}>
            <Icon name="bulb" />
            <Text>Manutenção de iluminação</Text>
          </Button>

          <Button onPress={() => navigate('Colaboradores')}>
            <Icon name="person" />
            <Text>Colaboradores</Text>
          </Button>

          {role === 'admin' &&
            <>
              <Button onPress={() => navigate('SyncEmpresas')}>
                <Icon name="cloud-download" />
                <Text>Empresas, plantas e usuários</Text>
              </Button>

              <Button onPress={() => navigate('Programacoes')}>
                <Icon name="cube" />
                <Text>Programações</Text>
              </Button>
            </>
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
