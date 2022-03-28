import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Box, Icon, Stack } from 'native-base';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import HeaderLogo from '../../../components/HeaderLogo';
import { ApplicationState } from '../../../store';
import * as RDOActions from '../../../store/ducks/rdo/actions';
import MenuItem from '../../../components/MenuItem';
import brandColors from '../../../theme/brandColors';

interface StateProps {
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  deleteRDOAtual(): void;
  salvaHoraEntrada(): void;
}

type Props = StateProps & DispatchProps;

class MenuPrincipalRDO extends Component<Props> {
  handleInicioRDO = () => {
    this.setState({ loadingInicio: true }, async () => {
      const { navigation, deleteRDOAtual, salvaHoraEntrada } = this.props;
      await deleteRDOAtual();
      await salvaHoraEntrada();
      this.setState({ loadingInicio: false });
      navigation.navigate('SelecionaPlantaRDO');
    });
  };

  render() {
    return (
      <Box padding={7}>
        <HeaderLogo />

        <Stack space={2} mt={9}>
          <MenuItem
            icon={
              <Icon color={brandColors.white} as={AntDesign} name='profile' />
            }
            onPress={() => this.handleInicioRDO()}
            text='Iniciar RDO'
          />

          <MenuItem
            icon={
              <Icon
                color={brandColors.white}
                as={Ionicons}
                name='cloud-upload'
              />
            }
            onPress={() => this.props.navigation.navigate('SincronizacaoRDO')}
            text='Sincronização'
          />
        </Stack>
      </Box>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuPrincipalRDO);
