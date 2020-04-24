import React, { Component } from 'react'
import { Button, Icon, Text, View } from 'native-base'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import HeaderLogo from '../../../components/HeaderLogo'
import { ApplicationState } from '../../../store'
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { AntDesign } from '@expo/vector-icons';

interface StateProps {
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  deleteRDOAtual(): void,
  salvaHoraEntrada(): void
}

type Props = StateProps & DispatchProps

class MenuPrincipalRDO extends Component<Props> {


  handleInicioRDO = () => {
    this.setState({ loadingInicio: true }, async () => {
      const { navigation, deleteRDOAtual, salvaHoraEntrada } = this.props;
      await deleteRDOAtual();
      await salvaHoraEntrada();
      this.setState({ loadingInicio: false })
      navigation.navigate('SelecionaPlantaRDO')
    })
  }

  render() {
    return (
      <View style={{flexGrow: 1}}>
        <HeaderLogo/>

        <View padder>
          <Button
            block
            onPress={() => this.handleInicioRDO()}
            style={style.btnStyle}>
            <AntDesign name="profile" color="white" size={28} style={{ marginLeft: 12 }}/>
            <Text>Iniciar RDO</Text>
          </Button>

          <Button
            block
            onPress={() => this.props.navigation.navigate('SyncRDO')}
            style={style.btnStyle}>
            <Icon name="cloud-upload"/>
            <Text>Sincronização</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const style = {
  btnStyle: {
    marginVertical: 5,
  }
}


const mapStateToProps = (state: ApplicationState) => ({
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuPrincipalRDO)
