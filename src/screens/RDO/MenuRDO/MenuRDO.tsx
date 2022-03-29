import React, { Component } from 'react';
import { Box, Icon, Stack } from 'native-base';
import { Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import HeaderLogo from '../../../components/HeaderLogo';
import { ApplicationState } from '../../../store';
import * as RDOActions from '../../../store/ducks/rdo/actions';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MenuItem from '../../../components/MenuItem';
import brandColors from '../../../theme/brandColors';

interface StateProps {
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  salvaRDO(): void;
  salvaHoraSaida(): void;
}

type Props = StateProps & DispatchProps;

class MenuRDO extends Component<Props> {
  concluirManutencao = () => {
    Alert.alert('Concluir RDO', 'Deseja concluir o RDO?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'OK', onPress: () => this.handleConcluirManutencao() },
    ]);
  };

  handleConcluirManutencao = () => {
    this.setState({ loadingConcluir: true }, async () => {
      const { navigation, salvaRDO, salvaHoraSaida } = this.props;
      await salvaHoraSaida();
      await salvaRDO();
      this.setState({ loadingConcluir: false });
      navigation.navigate('Menu');
    });
  };

  render() {
    return (
      <Box padding={7} flex={1}>
        <HeaderLogo />
        <Stack justifyContent='space-between' flex={1}>
          <Stack space={2} mt={9}>
            <MenuItem
              icon={
                <Icon color={brandColors.white} name='profile' as={AntDesign} />
              }
              text='Atividades Realizadas no dia'
              onPress={() =>
                this.props.navigation.navigate('AtividadesRealizadas')
              }
            />

            <MenuItem
              icon={
                <Icon color={brandColors.white} name='warning' as={AntDesign} />
              }
              text='Problemas Encontrados'
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'ComentariosRDO',
                  params: { tipo: 'problemas_encontrados' },
                })
              }
            />

            <MenuItem
              icon={
                <Icon
                  color={brandColors.white}
                  name='infocirlceo'
                  as={AntDesign}
                />
              }
              text='Informações Adicionais'
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'ComentariosRDO',
                  params: { tipo: 'informacoes_adicionais' },
                })
              }
            />

            <MenuItem
              icon={
                <Icon color={brandColors.white} name='chatbox' as={Ionicons} />
              }
              text='Observações'
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'ComentariosRDO',
                  params: { tipo: 'observacoes' },
                })
              }
            />

            <MenuItem
              icon={
                <Icon color={brandColors.white} name='camera' as={Ionicons} />
              }
              text='Fotos'
              onPress={() => this.props.navigation.navigate('FotosRDO')}
            />
          </Stack>
          <MenuItem
            icon={
              <Icon color={brandColors.white} name='check' as={AntDesign} />
            }
            text='Concluir'
            onPress={() => this.concluirManutencao()}
          />
        </Stack>
      </Box>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuRDO);
