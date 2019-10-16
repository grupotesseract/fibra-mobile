import React, { Component } from 'react';
import { Image, View, KeyboardAvoidingView } from 'react-native';
import { Label, Form, Button, Input, Item, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Auth, LoginData } from '../../store/ducks/auth/types'
import * as AuthActions from '../../store/ducks/auth/actions'
import { ApplicationState } from '../../store'

interface StateProps {
  auth: Auth
}

interface DispatchProps {
  authRequest(data: LoginData): void
}

type Props = StateProps & DispatchProps

interface State {
  user: string
  password: string
}
class Login extends Component<Props, State> {

  state = {
    user: 'admin@grupotesseract.com.br',
    password: '12344321'
  }

  authLogin() {
    const { authRequest } = this.props;
    const { user, password } = this.state; 

    authRequest({ user, password });
    this.props.navigation.navigate('Menu');
  }

  render() {
    const { user, password } = this.state;
    return (
      <KeyboardAvoidingView 
        behavior="padding"
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 10 }}>
        <Image
          style={{ width: 300, height: 87, marginTop: 10 }}
          resizeMode="contain"
          source={require('../../../assets/fibraheader.png')} />
        <Form>
          <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
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
        <Button block onPress={() => this.authLogin()} style={{marginBottom: 10}}>
          <Text>Login</Text>
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth.data
})

const mapDispatchToProps = (dispatch: Dispatch) => 
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login)