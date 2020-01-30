import React, { Component } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { Container, Icon, Content, Button, Text, View, Header, Left, Right } from 'native-base';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Planta } from '../../store/ducks/planta/types';
import { NavigationScreenProp } from 'react-navigation';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import { ApplicationState } from '../../store';
import Logo from '../../components/Logo';

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
        <Header transparent>
          <Left>
            <Logo size="xs" />
          </Left>

          <Right>
            <Button light
              // onPress={() => this.logoff()}
              style={style.btnStyle}>

              <Icon name="exit" />
            </Button>
          </Right>
        </Header>

        <View padder>
          <Button
            disabled={estoqueConcluido}
            onPress={() => this.props.navigation.navigate('Estoque')}
            style={style.btnStyle}>

            <Icon name="cube" />
            <Text>Estoque de Material</Text>
          </Button>

          <Button
            disabled={entradaConcluida}
            onPress={() => this.props.navigation.navigate('EntradaMateriais')}
            style={style.btnStyle}>

            <Icon name="download" />
            <Text>Entrada de materiais</Text>
          </Button>

          <Button
            onPress={() => this.props.navigation.navigate('ComentariosGerais')}
            style={style.btnStyle}>

            <Icon name="md-chatboxes" />
            <Text>Comentários Gerais</Text>
          </Button>

          <Button
            onPress={() => this.props.navigation.navigate('ManutencaoIluminacao')}
            style={style.btnStyle}>

            <Icon name="bulb" />
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
