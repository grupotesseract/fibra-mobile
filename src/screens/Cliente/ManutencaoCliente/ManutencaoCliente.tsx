import React, { Component } from 'react';
import { Button, Icon, Text, View } from 'native-base';
import { ActivityIndicator, Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import HeaderLogo from '../../../components/HeaderLogo';
import { ApplicationState } from '../../../store';
import { Planta } from '../../../store/ducks/planta/types';
import * as ProgramacoesActions from '../../../store/ducks/programacoes/actions';
import { ProgramacaoRealizada } from '../../../store/ducks/programacoes/types';
import { AntDesign } from '@expo/vector-icons';

interface StateProps {
  plantaAtiva: Planta;
  navigation: NavigationScreenProp<any, any>;
  programacoesRealizadas: ProgramacaoRealizada[];
}

interface DispatchProps {
  concluiManutencaoEletrica({ idProgramacao }): void;
}

type Props = StateProps & DispatchProps;

class ManutencaoCliente extends Component<Props> {
  concluirManutencao = () => {
    Alert.alert('Concluir Manutenção', 'Deseja concluir esta manutenção?', [
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
      const { navigation, concluiManutencaoEletrica } = this.props;
      const idProgramacao = this.props.plantaAtiva.proximaProgramacao.id;
      // await concluiManutencaoEletrica({ idProgramacao })
      this.setState({ loadingConcluir: false });
      navigation.navigate('Menu');
    });
  };

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
      <View style={{ flexGrow: 1 }}>
        <HeaderLogo />

        <View padder>
          <Button
            block
            disabled={estoqueConcluido}
            onPress={() => this.props.navigation.navigate('QRCodeCliente')}
            style={style.btnStyle}
          >
            <AntDesign
              name='qrcode'
              color='white'
              size={28}
              style={{ marginLeft: 10 }}
            />
            <Text>QR Code</Text>
          </Button>

          <Button
            block
            onPress={() =>
              this.props.navigation.navigate('FotosManutencaoEletrica')
            }
            style={style.btnStyle}
          >
            <Icon name='camera' />
            <Text>Fotos</Text>
          </Button>

          <Button
            block
            onPress={() =>
              this.props.navigation.navigate('ManutencaoClienteComentarios')
            }
            style={style.btnStyle}
          >
            <Icon name='chatbox' />
            <Text>Comentários</Text>
          </Button>
        </View>

        <View padder style={{ justifyContent: 'flex-end', flexGrow: 1 }}>
          <Button block onPress={() => this.concluirManutencao()}>
            <AntDesign
              name='check'
              color='white'
              size={28}
              style={{ marginLeft: 10 }}
            />
            <Text>Concluir</Text>
          </Button>
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManutencaoCliente);
