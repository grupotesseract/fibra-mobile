import React, { Component } from 'react'
import { Button, Icon, Text, View } from 'native-base'
import { Alert } from 'react-native'
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
  salvaRDO(): void
  salvaHoraSaida(): void
}

type Props = StateProps & DispatchProps

class MenuRDO extends Component<Props> {

  concluirManutencao = () => {
    Alert.alert(
      'Concluir Manutenção',
      'Deseja concluir esta manutenção?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.handleConcluirManutencao() },
      ],
    )
  }

  handleConcluirManutencao = () => {
    this.setState({ loadingConcluir: true }, async () => {
      const { navigation, salvaRDO, salvaHoraSaida } = this.props;
      await salvaHoraSaida();
      await salvaRDO();
      this.setState({ loadingConcluir: false })
      navigation.navigate('Menu')
    })
  }

  render() {
    return (
      <View style={{flexGrow: 1}}>
        <HeaderLogo/>

        <View padder>
          <Button
            block
            onPress={() => this.props.navigation.navigate('AtividadesRealizadas')}
            style={style.btnStyle}>
            <AntDesign name="profile" color="white" size={28} style={{ marginLeft: 12 }}/>
            <Text>Atividades Realizadas no dia</Text>
          </Button>

          <Button
            block
            onPress={() => this.props.navigation.navigate({
              routeName: 'ComentariosRDO',
              params: {tipo:'problemas_encontrados'},
            })}
            style={style.btnStyle}>
            <AntDesign name="warning" color="white" size={24} style={{ marginLeft: 14 }}/>
            <Text>Problemas Encontrados</Text>
          </Button>

          <Button
            block
            onPress={() => this.props.navigation.navigate({
              routeName: 'ComentariosRDO',
              params: {tipo:'informacoes_adicionais'},
            })}
            style={style.btnStyle}>
            <AntDesign name="infocirlceo" color="white" size={24} style={{ marginLeft: 14 }}/>
            <Text>Informações Adicionais</Text>
          </Button>

          <Button
            block
            onPress={() => this.props.navigation.navigate({
              routeName: 'ComentariosRDO',
              params: {tipo:'observacoes'},
            })}
            style={style.btnStyle}>
            <Icon name="md-chatboxes"/>
            <Text>Observações</Text>
          </Button>

          <Button
            block
            onPress={() => this.props.navigation.navigate('FotosRDO')}
            style={style.btnStyle}>
            <Icon name="camera"/>
            <Text>Fotos</Text>
          </Button>
        </View>

        <View padder style={{justifyContent: 'flex-end', flexGrow: 1}}>
          <Button
            block
            onPress={() => this.concluirManutencao()}
          >
            <AntDesign name="check" color="white" size={28} style={{ marginLeft: 10 }}/>
            <Text>Concluir</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuRDO)
