import { Form, Input, Item, Label, Text, View } from 'native-base'
import React, { Component } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { NavigationAction } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import ActionButton from '../../components/ActionButton'
import Logo from '../../components/Logo'
import { ApplicationState } from '../../store'
import * as AuthActions from '../../store/ducks/auth/actions'
import { AuthState, LoginData } from '../../store/ducks/auth/types'
import { checkAuth } from '../../utils/authNavigation'

interface StateProps {
  auth: AuthState,
  navigation: NavigationAction
}

interface DispatchProps {
  authRequest(data: LoginData): void
}

type Props = StateProps & DispatchProps

interface State {
  user: string
  password: string
  auth: AuthState
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
    const { authRequest } = this.props
    const { user, password } = this.state

    authRequest({ user, password })
  }

  componentDidMount() {
    const { auth, navigation } = this.props
    checkAuth({ auth, navigation })
  }

  componentDidUpdate() {
    const { auth, navigation } = this.props
    checkAuth({ auth, navigation })
  }

  render() {
    const { user, password } = this.state
    const { auth } = this.props

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={style.container}>

        <View padder>
          <Logo center size="md" />

          <Text style={style.text}>Faça login para continuar</Text>

          <Form style={style.form}>
            <Item stackedLabel>
              <Label>Usuário</Label>
              <Input
                value={user}
                autoCapitalize='none'
                onChangeText={user => this.setState({ user })} />
            </Item>

            <Item stackedLabel>
              <Label>Senha</Label>
              <Input
                value={password}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })} />
            </Item>
          </Form>

          {auth.error && <Text>Usuário ou senha incorretos.</Text>}

          <ActionButton
            block
            onPress={() => this.authLogin()}
            style={style.buttonLogin}
            loading={auth.loading}>
            <Text>Login</Text>
          </ActionButton>

        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    paddingTop: 0,
  },
  form: {
    marginTop: 40,
  },
  buttonLogin: {
    marginTop: 60,
    justifyContent: 'center',
  },
  text: {
    fontWeight: '300',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  logo: {
    width: 'auto',
    height: 70,
    resizeMode: 'contain'
  }
})
