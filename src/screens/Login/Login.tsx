import React, { Component } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Label, Form, Input, Item, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { LoginData, AuthState } from '../../store/ducks/auth/types'
import * as AuthActions from '../../store/ducks/auth/actions'
import { ApplicationState } from '../../store'
import ActionButton from '../../components/ActionButton';
import HeaderLogo from '../../components/HeaderLogo';
import { checkAuth } from '../../utils/authNavigation'
import { NavigationAction } from 'react-navigation';
import styles from './styles';

interface StateProps {
  auth: AuthState,
  navigation: NavigationAction
}

interface DispatchProps {
  authRequest(data: LoginData): void
}

type Props = StateProps & DispatchProps

interface State {
  user: string;
  password: string;
  auth: AuthState;
}
class Login extends Component<Props, State> {

  state = {
    user: '',
    password: '',
    auth: {
      loading: false,
      error: false,
    }
  }

  authLogin() {
    const { authRequest } = this.props;
    const { user, password } = this.state;

    authRequest({ user, password });
  }


  componentDidMount() {
    const { auth, navigation } = this.props;
    checkAuth({ auth, navigation });
  }

  componentDidUpdate() {
    const { auth, navigation } = this.props;
    checkAuth({ auth, navigation });
  }

  render() {
    const { user, password } = this.state;
    const { auth } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 10 }}>
          <Form>
            <View style={{ flexDirection: 'row', padding: 20 }}>
              <Icon name="lock" />
              <Text style={{ paddingLeft: 10 }}>
                Olá, entre com seus dados de acesso:
              </Text>
            </View>

            <Item floatingLabel>
              <Label>Usuário</Label>
              <Input value={user} onChangeText={(user) => this.setState({ user })} />
            </Item>
            <Item floatingLabel>
              <Label>Senha</Label>
              <Input value={password} secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
            </Item>
          </Form>

          { auth.error && <Text>Usuário ou senha incorretos.</Text>}

          <ActionButton
            block
            onPress={() => this.authLogin()}
            style={{marginBottom: 10}}
            loading={auth.loading}
          >
            <Text>Login</Text>
          </ActionButton>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login)
