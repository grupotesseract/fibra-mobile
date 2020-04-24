import React, { Component } from 'react';
import { Container, Content, Text, Button, ListItem, List, View, Input, H3, CheckBox } from 'native-base';
import HeaderNav from '../../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store'
import { Usuario } from '../../../store/ducks/usuarios/types';
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

  handlePressButton = async (tipoComentario: string) => {
    const { navigation, salvaHoraInicioLET, salvaHoraInicioLEM } = this.props;

    switch(tipoComentario) {
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
      <Container>
        <HeaderNav title="Liberação de Documento"/>

        <Content padder>

          <Button
            block
            onPress={() => this.handlePressButton('IT')}
            style={style.btnStyle}>
            <Text>IT</Text>
          </Button>
          <Button
            block
            onPress={() => this.handlePressButton('OS')}
            style={style.btnStyle}>
            <Text>OS</Text>
          </Button>
          <Button
            block
            onPress={() => this.handlePressButton('LEM')}
            style={style.btnStyle}>
            <Text>LEM</Text>
          </Button>
          <Button
            block
            onPress={() => this.handlePressButton('LET')}
            style={style.btnStyle}>
            <Text>LET</Text>
          </Button>

          <Button
            block
            onPress={() => this.liberarDocumento()}
          >
            <Text>Iniciar RDO</Text>
          </Button>
        </Content>
      </Container>
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
