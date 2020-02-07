import React, { Component } from 'react'
import { Button, Icon, Text, View } from 'native-base'
import { ActivityIndicator } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import HeaderLogo from '../../components/HeaderLogo'
import { ApplicationState } from '../../store'
import { Planta } from '../../store/ducks/planta/types'
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types'

interface StateProps {
  plantaAtiva: Planta,
  navigation: NavigationScreenProp<any, any>,
  programacoesRealizadas: ProgramacaoRealizada[],
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps

class MenuVistoria extends Component<Props> {
  render() {
    const { plantaAtiva, programacoesRealizadas } = this.props;
    if (!plantaAtiva) {
      return <ActivityIndicator />
    }
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const programacao = programacoesRealizadas.find(p => p.programacao.id === idProgramacao)
    const { estoqueConcluido, entradaConcluida } = programacao;

    return (
      <View>
        <HeaderLogo/>

        <View padder>
          <Button
            block
            disabled={estoqueConcluido}
            onPress={() => this.props.navigation.navigate('Estoque')}
            style={style.btnStyle}>
            <Icon name="cube"/>
            <Text>Estoque de Material</Text>
          </Button>

          <Button
            block
            disabled={entradaConcluida}
            onPress={() => this.props.navigation.navigate('EntradaMateriais')}
            style={style.btnStyle}>
            <Icon name="download"/>
            <Text>Entrada de materiais</Text>
          </Button>

          <Button
            block
            onPress={() => this.props.navigation.navigate('ComentariosGerais')}
            style={style.btnStyle}>
            <Icon name="md-chatboxes"/>
            <Text>Comentários Gerais</Text>
          </Button>

          <Button
            block
            onPress={() => this.props.navigation.navigate('ManutencaoIluminacao')}
            style={style.btnStyle}>
            <Icon name="bulb"/>
            <Text>Manutenção Iluminação</Text>
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
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuVistoria)
