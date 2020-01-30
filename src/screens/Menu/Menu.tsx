import React, { Component } from 'react'
import { Header, Left, Right, Button, Icon, Text, View } from 'native-base'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from '../../store/ducks/auth/actions'
import { checkAuth } from '../../utils/authNavigation'
import { AuthState } from '../../store/ducks/auth/types'
import { NavigationAction } from 'react-navigation'
import Logo from '../../components/Logo'

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
        <Header transparent>
          <Left>
            <Logo size="xs" />
          </Left>

          <Right>
            <Button light
              onPress={() => this.logoff()}
              style={style.btnStyle}>

              <Icon name="exit" />
            </Button>
          </Right>
        </Header>

        <View padder>
          <Button
            onPress={() => navigate('SelecionaPlanta')}
            style={style.btnStyle}>

            <Icon name="bulb" />
            <Text>Manutenção de iluminação</Text>
          </Button>

          <Button
            onPress={() => navigate('Colaboradores')}
            style={style.btnStyle}>

            <Icon name="person" />
            <Text>Colaboradores</Text>
          </Button>

          {role === 'admin' &&
            <>
              <Button
                onPress={() => navigate('SyncEmpresas')}
                style={style.btnStyle}>

                <Icon name="cloud-download" />
                <Text>Empresas, plantas e usuários</Text>
              </Button>

              <Button
                onPress={() => navigate('Programacoes')}
                style={style.btnStyle}>

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

const style = {
  btnStyle: {
    marginVertical: 5,
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
