import React, { Component } from 'react';
import { Image, View, KeyboardAvoidingView } from 'react-native';
import { Label, Form, Button, Input, Item, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Auth, LoginData, AuthState } from '../../store/ducks/auth/types'
import * as AuthActions from '../../store/ducks/auth/actions'
import { ApplicationState } from '../../store'
import ActionButton from '../../components/ActionButton';
import { auth } from '../../store/ducks/auth/sagas';
import HeaderLogo from '../../components/HeaderLogo';

interface StateProps {
  auth: AuthState
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
    user: 'admin@grupotesseraact.com.br',
    password: '12344321',
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

  checkAuth() {
    const { auth, navigation } = this.props;
    console.log("AUTH", auth)
    if(!auth.loading && !auth.error && auth.data && auth.data.token) {
      navigation.navigate('Menu');
    }
  }

  componentDidMount() {
    // this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  render() {
    const { user, password } = this.state;
    const { auth } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <HeaderLogo />
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
          { auth.error && <Text> Ocorreu um erro. </Text>}
          <ActionButton 
            block 
            onPress={() => this.authLogin()} 
            style={{marginBottom: 10}}
            loading = {auth.loading}
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