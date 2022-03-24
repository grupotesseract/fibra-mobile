import React, { Component } from 'react';
import { Box, Text, Button } from 'native-base';
import HeaderNav from '../../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store'
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  salvaHoraInicioAtividades(): void,
  salvaHoraInicioLEM(): void,
  salvaHoraInicioLET(): void,
}

type Props = StateProps & DispatchProps
class RegistroLiberacao extends Component<Props> {

  state = {
  }

  liberarDocumento = async () => {
    const { navigation, salvaHoraInicioAtividades } = this.props;

    await salvaHoraInicioAtividades();
    navigation.navigate({ routeName: 'MenuRDO' })
  }

  handleAtividadesPendentes = async () => {
    const { navigation } = this.props;
    navigation.navigate('AtividadesPendentes');
  }

  handlePressButton = async (tipoComentario: string) => {
    const { navigation, salvaHoraInicioLET, salvaHoraInicioLEM } = this.props;

    switch (tipoComentario) {
      case 'LET':
        await salvaHoraInicioLET();
        break;
      case 'LEM':
        await salvaHoraInicioLEM();
        break;
      case 'IT':
      case 'OS':
      default:
        break;
    }
    navigation.navigate({
      routeName: 'ComentariosRDO',
      params: { tipo: tipoComentario },
    })
  }

  render() {

    return (
      <Box>
        <HeaderNav title="Liberação de Documento" />

        <Box>

          <Button

            onPress={() => this.handlePressButton('IT')}
            style={style.btnStyle}>
            <Text>IT</Text>
          </Button>
          <Button

            onPress={() => this.handlePressButton('OS')}
            style={style.btnStyle}>
            <Text>OS</Text>
          </Button>
          <Button

            onPress={() => this.handlePressButton('LEM')}
            style={style.btnStyle}>
            <Text>LEM</Text>
          </Button>
          <Button

            onPress={() => this.handlePressButton('LET')}
            style={style.btnStyle}>
            <Text>LET</Text>
          </Button>
          <Button

            onPress={() => this.handleAtividadesPendentes()}
            style={style.btnStyle}>
            <Text>ATIVIDADES PENDENTES</Text>
          </Button>

          <Button

            onPress={() => this.liberarDocumento()}
          >
            <Text>Iniciar RDO</Text>
          </Button>
        </Box>
      </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistroLiberacao)
