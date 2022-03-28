import React, { Component } from 'react';
import { Box } from 'native-base';
import { FlatList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Planta } from '../../store/ducks/planta/types';
import { Entrada } from '../../store/ducks/programacoes/types';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { ApplicationState } from '../../store';
import ActionButton from '../../components/ActionButton';
import { CardEstoque } from '../../components/CardEstoque';

interface StateProps {
  plantaAtiva: Planta;
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  armazenaEntrada(idProgramacao: number, entradas: Entrada[]): void;
}

type Props = StateProps & DispatchProps;

class EntradaMateriais extends Component<Props> {
  state = {
    materiais: [],
  };

  componentDidMount() {
    const { plantaAtiva } = this.props;
    const entrada = plantaAtiva?.entrada || [];
    this.setState({ materiais: entrada });
  }

  concluiEntrada = async () => {
    const { materiais } = this.state;
    const { navigation, armazenaEntrada, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const entradas = materiais.map((material) => ({
      material_id: material.id,
      quantidade: material.quantidade,
    }));
    await armazenaEntrada(idProgramacao, entradas);
    navigation.navigate('MenuVistoria');
  };

  onChangeQuantidade = (idMaterial: number, quantidade: number) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidade: quantidade,
      };
    });
    this.setState({ materiais: novosMateriais });
  };

  onPressBotaoOK = (idMaterial: number, quantidadeConfirmada: boolean) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeConfirmada: !quantidadeConfirmada,
        quantidade: material.quantidade ? material.quantidade : 0,
      };
    });
    this.setState({ materiais: novosMateriais });
  };

  renderItem = ({ item }) => {
    return (
      <CardEstoque
        itemMaterial={item}
        onChangeQuantidade={this.onChangeQuantidade}
        onPressBotaoOK={this.onPressBotaoOK}
      />
    );
  };

  render() {
    const { materiais } = this.state;
    return (
      <Box padding={5} flex={1}>
        <FlatList
          data={materiais}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        ></FlatList>

        <ActionButton
          onPress={() => this.concluiEntrada()}
          isDisabled={
            !materiais.reduce((tudoConfirmado, material) => {
              return tudoConfirmado && material.quantidadeConfirmada;
            }, true)
          }
        >
          Concluído
        </ActionButton>
      </Box>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EntradaMateriais);
