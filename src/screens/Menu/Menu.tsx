import React, { Component } from 'react'
import { Button, Icon, Text, View } from 'native-base'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import HeaderLogo from '../../components/HeaderLogo'
import * as AuthActions from '../../store/ducks/auth/actions'
import { AuthState } from '../../store/ducks/auth/types'
import { checkAuth } from '../../utils/authNavigation'
import { AntDesign } from '@expo/vector-icons';

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
        <HeaderLogo/>

        <View padder>
          <Button
            block
            onPress={() => navigate('SelecionaPlanta')}
            style={style.btnStyle}>
            <Icon name="bulb"/>
            <Text>Manutenção de Iluminação</Text>
          </Button>

          <Button
            block
            onPress={() => navigate('MenuPrincipalRDO')}
            style={style.btnStyle}>
            <AntDesign name="profile" color="white" size={28} style={{ marginLeft: 12 }}/>
            <Text>RDO</Text>
          </Button>

          {/* <Button
            block
            onPress={() => navigate('ManutencaoCliente')}
            style={style.btnStyle}>
            <AntDesign name="tool" size={28} color="white" style={{marginLeft: 10}}/>
            <Text>Manutenção Cliente</Text>
          </Button> */}

          <Button
            block
            onPress={() => navigate('Colaboradores')}
            style={style.btnStyle}>
            <Icon name="person"/>
            <Text>Colaboradores</Text>
          </Button>

          <Button
            block
            onPress={() => navigate('SyncEmpresas')}
            style={style.btnStyle}>
            <Icon name="cloud-download"/>
            <Text>Atualizar Empresas</Text>
          </Button>

          {role === 'admin' &&
            <Button
              block
              onPress={() => navigate('Programacoes')}
              style={style.btnStyle}>
              <Icon name="cube"/>
              <Text>Programações</Text>
            </Button>
          }

          <Button
            block
            bordered
            onPress={() => this.logoff()}
            style={style.btnStyle}>
            <Icon name="exit"/>
            <Text>Sair</Text>
          </Button>
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

const style = {
  btnStyle: {
    marginVertical: 5
  }
}
