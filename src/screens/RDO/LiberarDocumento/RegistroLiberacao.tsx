import React, { Component } from 'react';
import { Stack } from 'native-base';
import { bindActionCreators, Dispatch } from 'redux';
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store'
import { NavigationScreenProp } from 'react-navigation';
import ActionButton from '../../../components/ActionButton';

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
      <Stack padding={7} space={3}>
        <ActionButton justifyContent='flex-start' onPress={() => this.handlePressButton('IT')}>
          IT
        </ActionButton>
        <ActionButton justifyContent='flex-start' onPress={() => this.handlePressButton('OS')}>
          OS
        </ActionButton>
        <ActionButton justifyContent='flex-start' onPress={() => this.handlePressButton('LEM')}>
          LEM
        </ActionButton>
        <ActionButton justifyContent='flex-start' onPress={() => this.handlePressButton('LET')}>
          LET
        </ActionButton>
        <ActionButton justifyContent='flex-start' onPress={() => this.handleAtividadesPendentes()}>
          ATIVIDADES PENDENTES
        </ActionButton>
        <ActionButton justifyContent='flex-start' onPress={() => this.liberarDocumento()}>
          Iniciar RDO
        </ActionButton>
      </Stack>
    );
  }
}


const mapStateToProps = (state: ApplicationState) => ({
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistroLiberacao)
