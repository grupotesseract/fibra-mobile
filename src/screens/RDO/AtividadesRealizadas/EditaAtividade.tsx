import React, { Component } from 'react'
import {
  Box,
  Button,
  FormControl,
  Text,
  TextArea,
  View,
} from 'native-base'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import HeaderNav from '../../../components/HeaderNav'
import { ApplicationState } from '../../../store'
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { AtividadeRealizada } from '../../../store/ducks/rdo/types';

interface StateProps {
  atividadesRealizadas: AtividadeRealizada[],
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  atualizaAtividade({ id, descricao, concluido }): void
}

type Props = StateProps & DispatchProps

class EditaAtividade extends Component<Props> {

  state = {
    descricao: '',
    concluido: false,
  }

  salvaAtividade = async (concluido: boolean) => {
    const { navigation, atualizaAtividade } = this.props;
    const id = navigation.state.params?.id || null;

    const { descricao } = this.state;

    await atualizaAtividade({ id, descricao, concluido });
    navigation.navigate({
      routeName: 'AtividadesRealizadas',
      params: { id }
    });
  }

  componentDidMount() {
    const { atividadesRealizadas } = this.props;
    const { navigation } = this.props;
    const id = navigation.state.params?.id || null;

    const atividade = atividadesRealizadas.find(atividade => atividade.id === id)
    if (!atividade) {
      return;
    }

    this.setState({
      descricao: atividade.descricao,
      concluido: atividade.concluido,
    })
  };

  render() {
    const { descricao, concluido } = this.state;

    return <Box>
      <HeaderNav title='Edita Atividade' />
      <Box style={{ flex: 1, justifyContent: 'space-between' }}>
        <KeyboardAvoidingView behavior="height">
          <FormControl>
            <ScrollView>
              <TextArea
                variant='underlined'
                numberOfLines={50}
                value={descricao}
                onChangeText={(descricao) => this.setState({ descricao })} />
            </ScrollView>
          </FormControl>
        </KeyboardAvoidingView>
      </Box>

      <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
        <Button

          onPress={() => this.salvaAtividade(false)}
          style={{ backgroundColor: 'red' }} >
          <Text>Atualiza Pendente</Text>
        </Button>
        <Button

          onPress={() => this.salvaAtividade(true)}
          style={{ backgroundColor: 'green' }} >
          <Text>Atualiza e conclui</Text>
        </Button>
      </View>

    </Box>
  };
}



const mapStateToProps = (state: ApplicationState) => ({
  atividadesRealizadas: state.manutencaoRDOReducer.rdoAtual.atividadesRealizadas
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditaAtividade)
