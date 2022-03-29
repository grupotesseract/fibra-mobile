import React, { Component } from 'react';
import { Box, FlatList } from 'native-base';
import { ApplicationState } from '../../store';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Planta } from '../../store/ducks/planta/types';
import { NavigationScreenProp } from 'react-navigation';
import { Estoque } from '../../store/ducks/programacoes/types';
import ActionButton from '../../components/ActionButton';
import { CardEstoque } from '../../components/CardEstoque';

interface StateProps {
  plantaAtiva: Planta;
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  armazenaEstoque(idProgramacao: number, estoques: Estoque[]): void;
}

type Props = StateProps & DispatchProps;

class EstoqueScreen extends Component<Props> {
  state = {
    materiais: [],
  };

  componentDidMount() {
    const { plantaAtiva } = this.props;
    const { estoque } = plantaAtiva;
    this.setState({ materiais: estoque });
  }

  onChangeQuantidade = (idMaterial, quantidade) => {
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

  onPressBotaoOK = (idMaterial, quantidadeConfirmada) => {
    const { materiais } = this.state;
    const novosMateriais = materiais.map((material) => {
      if (material.id !== idMaterial) {
        return material;
      }
      return {
        ...material,
        quantidadeConfirmada: !quantidadeConfirmada,
      };
    });
    this.setState({ materiais: novosMateriais });
  };

  concluiEstoque = async () => {
    const { materiais } = this.state;
    const { navigation, armazenaEstoque, plantaAtiva } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const estoques = materiais.map((material) => ({
      material_id: material.id,
      quantidade_inicial: material.quantidade,
    }));
    await armazenaEstoque(idProgramacao, estoques);
    navigation.navigate('MenuVistoria');
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
          onPress={() => this.concluiEstoque()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EstoqueScreen);
