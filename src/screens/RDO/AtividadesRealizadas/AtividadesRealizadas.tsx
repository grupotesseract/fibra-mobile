import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  Box,
  Icon,
  HStack,
  Pressable,
  Stack,
} from 'native-base';
import { Alert } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';
import * as RDOActions from '../../../store/ducks/rdo/actions';
import { AtividadeRealizada } from '../../../store/ducks/rdo/types';
import ActionButton from '../../../components/ActionButton';
import { AntDesign } from '@expo/vector-icons';

interface StateProps {
  atividadesRealizadas: AtividadeRealizada[];
  navigation: NavigationScreenProp<any, any>;
}

interface DispatchProps {
  adicionaAtividade(): void;
  deleteAtividade({ id }): void;
}

type Props = StateProps & DispatchProps;

class AtividadesRealizadas extends Component<Props> {
  state = {
    atividadesRealizadas: [],
  };

  componentDidMount() {
    this.refreshAtividades();
  }

  refreshAtividades = () => {
    const { atividadesRealizadas } = this.props;
    this.setState({
      atividadesRealizadas,
    });
  };

  addAtividade = async () => {
    const { adicionaAtividade } = this.props;

    await adicionaAtividade();
    this.refreshAtividades();
  };

  editaAtividade = ({ id }) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: 'EditaAtividade',
      params: { id },
    });
  };

  excluiAtividade = async ({ id }) => {
    const { deleteAtividade } = this.props;
    Alert.alert('Excluir Atividade', 'Deseja excluir esta atividade?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await deleteAtividade({ id });
          this.refreshAtividades();
        },
      },
    ]);
  };

  concluir = async () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  render() {
    const { atividadesRealizadas } = this.state;

    return (
      <Box flex={1} padding={7}>
        <Box flex={1} justifyContent='space-between'>
          <ScrollView>
            {atividadesRealizadas.length === 0 && (
              <Text> Nenhuma atividade cadastrada.</Text>
            )}
            <Stack space={5}>
              {atividadesRealizadas.map((atividade) => {
                return (
                  <Pressable
                    key={atividade.id}
                    onPress={() => this.editaAtividade({ id: atividade.id })}
                    borderColor='transparent'
                    borderWidth='1'
                    shadow={1}
                    padding={4}
                  >
                    <HStack alignItems='center' space={2}>
                      {atividade.concluido ? (
                        <Icon
                          as={AntDesign}
                          name='checkcircle'
                          color='success.500'
                        />
                      ) : (
                        <Icon
                          as={AntDesign}
                          name='exclamationcircle'
                          color='danger.500'
                        />
                      )}
                      <Text flex={1}>
                        {atividade.descricao || 'Atividade sem descrição'}
                      </Text>
                      <Icon
                        as={AntDesign}
                        name='close'
                        onPress={() =>
                          this.excluiAtividade({ id: atividade.id })
                        }
                      />
                    </HStack>
                  </Pressable>
                );
              })}
            </Stack>
          </ScrollView>
        </Box>

        <HStack space={3}>
          <ActionButton flex={1} onPress={() => this.addAtividade()}>
            Adicionar Atividade
          </ActionButton>
          <ActionButton flex={1} onPress={() => this.concluir()}>
            Concluir
          </ActionButton>
        </HStack>
      </Box>
    );
  }
}

const style = {
  btnStyle: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
  },
};

const mapStateToProps = (state: ApplicationState) => ({
  atividadesRealizadas:
    state.manutencaoRDOReducer.rdoAtual.atividadesRealizadas,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AtividadesRealizadas);
