import { useEffect, useState } from 'react';
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

const Login = (props: Props) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState<AuthState>(props.auth);

  useEffect(() => {
    const { auth, navigation } = props;
    checkAuth({ auth, navigation });
    setAuth(props.auth);
  }, [props]);

  function authLogin() {
    const { authRequest } = props;
    authRequest({ user, password });
    setPassword('');
  }

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
                  onChangeText={(user) => setUser(user)}
                />
              </Stack>
              <Stack>
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  padding={0}
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
              </Stack>
              {auth.error && <Text>Usuário ou senha incorretos.</Text>}
            </Stack>
          </FormControl>
          <ActionButton
            onPress={() => authLogin()}
            mt={60}
            isLoading={auth.loading}
          >
            Login
          </ActionButton>
        </Stack>
      </KeyboardAvoidingView>
    </Center>
  );
};

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
