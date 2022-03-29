import { Component } from 'react';
import { Icon, Box, Stack } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import HeaderLogo from '../../components/HeaderLogo';
import * as AuthActions from '../../store/ducks/auth/actions';
import { AuthState } from '../../store/ducks/auth/types';
import { checkAuth } from '../../utils/authNavigation';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MenuItem from '../../components/MenuItem';
import brandColors from '../../theme/brandColors';

interface Props {
  auth: AuthState;
  navigation: NavigationScreenProp<any, any>;
  authCancel(): void;
}

const Menu = (props: Props) => {
  const { authCancel, auth, navigation } = props;
  const { navigate } = navigation;
  const { role } = auth.data;

  const logoff = async () => {
    await authCancel();
    await checkAuth({ auth: {}, navigation });
  };
  return (
    <Box padding={7}>
      <HeaderLogo />

      <Stack space={2} mt={9}>
        <MenuItem
          icon={<Icon color={brandColors.white} as={Ionicons} name='bulb' />}
          onPress={() => navigate('SelecionaPlanta')}
          text='Manutenção de Iluminação'
        />

        <MenuItem
          icon={
            <Icon color={brandColors.white} as={AntDesign} name='profile' />
          }
          text='RDO'
          onPress={() => navigate('MenuPrincipalRDO')}
        />

        <MenuItem
          icon={<Icon color={brandColors.white} as={Ionicons} name='person' />}
          onPress={() => navigate('Colaboradores')}
          text='Colaboradores'
        />

        <MenuItem
          icon={
            <Icon
              color={brandColors.white}
              as={Ionicons}
              name='cloud-download'
            />
          }
          onPress={() => navigate('SyncEmpresas')}
          text='Atualizar Empresas'
        />

        {role === 'admin' && (
          <MenuItem
            icon={<Icon color={brandColors.white} as={Ionicons} name='cube' />}
            onPress={() => navigate('Programacoes')}
            text='Programações'
          />
        )}

        <MenuItem
          icon={<Icon color={brandColors.primary} as={Ionicons} name='exit' />}
          onPress={() => logoff()}
          text='Sair'
          invertColors
        />
      </Stack>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
