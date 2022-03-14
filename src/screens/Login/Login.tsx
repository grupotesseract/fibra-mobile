import React, { Component } from 'react';
import { NavigationAction } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Logo from '../../components/Logo';
import { ApplicationState } from '../../store';
import * as AuthActions from '../../store/ducks/auth/actions';
import { AuthState, LoginData } from '../../store/ducks/auth/types';
import { checkAuth } from '../../utils/authNavigation';
import { Center, FormControl, Input, Stack, Text } from 'native-base';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import ActionButton from '../../components/ActionButton';

interface StateProps {
  auth: AuthState;
  navigation: NavigationAction;
}

interface DispatchProps {
  authRequest(data: LoginData): void;
}

type Props = StateProps & DispatchProps;

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
    },
  };

  authLogin() {
    const { authRequest } = this.props;
    const { user, password } = this.state;

    this.setState({ password: '' });
    authRequest({ user, password })

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

      <Center flex={1}>
        <KeyboardAvoidingView behavior='padding'>
          <Stack>
            <Logo center size='xlg' />

            <Text style={style.text}>44.0.0</Text>

            <FormControl mt={10}>
              <Stack space={4}>
                <Stack>
                  <FormControl.Label>Usuário</FormControl.Label>
                  <Input
                    padding={0}
                    value={user}
                    autoCapitalize='none'
                    onChangeText={(user) => this.setState({ user })}
                  />
                </Stack>
                <Stack>
                  <FormControl.Label>Senha</FormControl.Label>
                  <Input
                    padding={0}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </Stack>
                {auth.error && <Text>Usuário ou senha incorretos.</Text>}
              </Stack>
            </FormControl>
            <ActionButton
              block
              onPress={() => this.authLogin()}
              mt={60}
              isLoading={auth.loading}
            > Login
            </ActionButton>
          </Stack>
        </KeyboardAvoidingView>
      </Center >
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const style = StyleSheet.create({
  text: {
    fontWeight: '300',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
});
