import React, { Component } from 'react';
import { Button, Icon, Stack, Text, Box } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import HeaderLogo from '../../components/HeaderLogo';
import { ApplicationState } from '../../store';
import { Planta } from '../../store/ducks/planta/types';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import MenuItem from '../../components/MenuItem';
import brandColors from '../../theme/brandColors';
import { Ionicons } from '@expo/vector-icons';

interface StateProps {
  plantaAtiva: Planta;
  navigation: NavigationScreenProp<any, any>;
  programacoesRealizadas: ProgramacaoRealizada[];
}

interface DispatchProps { }

type Props = StateProps & DispatchProps;

class MenuVistoria extends Component<Props> {
  render() {
    const { plantaAtiva, programacoesRealizadas } = this.props;
    if (!plantaAtiva) {
      return <ActivityIndicator color='blue' />;
    }
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const programacao = programacoesRealizadas.find(
      (p) => p.programacao.id === idProgramacao
    );
    const { estoqueConcluido, entradaConcluida } = programacao;

    return (
      <Box padding={7}>
        <HeaderLogo />

        <Stack space={2} mt={9}>
          <MenuItem
            isDisabled={estoqueConcluido}
            onPress={() => this.props.navigation.navigate('Estoque')}
            style={style.btnStyle}
            icon={<Icon color={brandColors.white} as={Ionicons} name='cube' />}
            text='Estoque de Materiais'
          />

          <MenuItem
            isDisabled={entradaConcluida}
            onPress={() => this.props.navigation.navigate('EntradaMateriais')}
            style={style.btnStyle}
            icon={
              <Icon color={brandColors.white} as={Ionicons} name='download' />
            }
            text='Entrada de Materiais'
          />

          <MenuItem
            onPress={() => this.props.navigation.navigate('ComentariosGerais')}
            style={style.btnStyle}
            icon={
              <Icon color={brandColors.white} as={Ionicons} name='chatbox' />
            }
            text='Comentários Gerais'
          />

          <MenuItem
            onPress={() =>
              this.props.navigation.navigate('ManutencaoIluminacao')
            }
            style={style.btnStyle}
            icon={<Icon color={brandColors.white} as={Ionicons} name='bulb' />}
            text='Manutenção Iluminação'
          />
        </Stack>
      </Box>
    );
  }
}

const style = {
  btnStyle: {
    marginVertical: 5,
  },
};

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuVistoria);
