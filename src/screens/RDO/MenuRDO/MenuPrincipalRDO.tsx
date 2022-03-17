import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import HeaderLogo from '../../../components/HeaderLogo'
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { Box, Icon, Stack } from 'native-base'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MenuItem from '../../../components/MenuItem'
import brandColors from '../../../theme/brandColors'

interface StateProps {
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  deleteRDOAtual(): void,
  salvaHoraEntrada(): void
}

type Props = StateProps & DispatchProps

const MenuPrincipalRDO = (props: Props) => {
  const { navigation, deleteRDOAtual, salvaHoraEntrada } = props;

  const handleInicioRDO = async () => {
    await deleteRDOAtual();
    await salvaHoraEntrada();
    navigation.navigate('SelecionaPlantaRDO')
  }

  return (
    <Box padding={7}>
      <HeaderLogo />

      <Stack space={2} mt={9}>

        <MenuItem
          icon={<Icon color={brandColors.white} as={AntDesign} name='profile' />}
          onPress={() => handleInicioRDO()}
          text='Iniciar RDO' />

        <MenuItem
          icon={<Icon color={brandColors.white} as={Ionicons} name='cloud-upload' />}
          onPress={() => navigation.navigate('SincronizacaoRDO')}
          text='Sincronização' />
      </Stack>
    </Box>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapDispatchToProps)(MenuPrincipalRDO)
