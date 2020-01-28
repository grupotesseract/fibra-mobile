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
      <KeyboardAvoidingView
        behavior="padding"
        style={style.container}>

        <View>
          <Image
            style={style.logo}
            source={require('../../../assets/fibra-logo.png')} />

          <Text style={style.text}>Faça login para continuar</Text>

          <Form style={style.form}>
            <Item floatingLabel>
              <Label style={style.label}>Usuário</Label>
              <Input value={user}
                style={style.input}
                onChangeText={user => this.setState({ user })}/>
            </Item>

            <Item floatingLabel>
              <Label style={style.label}>Senha</Label>
              <Input value={password}
                style={style.input}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}/>
            </Item>
          </Form>

          { auth.error && <Text>Usuário ou senha incorretos.</Text> }

          <ActionButton
            onPress={() => this.authLogin()}
            style={style.buttonLogin}
            loading={auth.loading}>
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 40,
    paddingTop: 0,
  },
  form: {
    marginTop: 40,
  },
  buttonLogin: {
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: 60,
  },
  input: {},
  text: {
    fontWeight: '300',
    fontSize: 16,
    opacity: 0.75,
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
  },
  logo: {
    width: 'auto',
    height: 70,
    resizeMode: 'contain'
  }
})
