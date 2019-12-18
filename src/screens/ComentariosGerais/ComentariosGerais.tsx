import React, { Component } from 'react';
import { Container, Content, Text, Button, View, Textarea, Form } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { NavigationScreenProp } from 'react-navigation';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import { Planta } from '../../store/ducks/planta/types';

interface StateProps {
  plantaAtiva: Planta,
  programacoesRealizadas: ProgramacaoRealizada[],
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  armazenaComentarioItem({ idProgramacao, idItem, comentario }): void
  armazenaComentariosGerais({ idProgramacao, comentario }): void
}

type Props = StateProps & DispatchProps

class ComentariosGerais extends Component<Props> {

  state = {
    comentario: '',
  }

  salvaComentario = async () => {
    const { navigation, plantaAtiva, armazenaComentarioItem, armazenaComentariosGerais } = this.props;
    const idItem = navigation.state.params?.idItem || null;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const { comentario } = this.state;

    if (idItem) {
      await armazenaComentarioItem({ idItem, idProgramacao, comentario });
    } else {
      await armazenaComentariosGerais({ idProgramacao, comentario});
    }
    navigation.goBack();
  }

  componentDidMount() {
    const { plantaAtiva, programacoesRealizadas, navigation } = this.props;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    const programacao = programacoesRealizadas.find( (p: ProgramacaoRealizada) => p.programacao.id === idProgramacao);
    const idItem = navigation.state.params?.idItem || null;
    if (programacao) {
      if (idItem) {
        const Comentario = programacao.comentarios.find(comentario => comentario.item_id == idItem)
        this.setState({
          comentario: Comentario ? Comentario.comentario : null
        })
      } else {
        const comentario = programacao.programacao.comentarioGeral;
        this.setState({
          comentario
        })
      }
    }
  }

  render() {
    const { comentario } = this.state;
    return <Container>
      <HeaderNav title={"Comentários"} />
      <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
        <KeyboardAvoidingView
          behavior="height"
        >
          <ScrollView>
            <Form>
              <Textarea
                rowSpan={50}
                bordered
                value={comentario}
                onChangeText={(comentario) => this.setState({comentario})}
              />
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
      </Content>
      <View style={{ flexDirection: 'row', marginVertical: 5 }}>
        <Button
          block
          onPress={() => this.salvaComentario()}
          style={style.btnStyle} >
          <Text>Concluído</Text>
        </Button>
      </View>
    </Container>
  };
}

const style = {
    btnStyle: {
        marginVertical: 5,
        flex: 1
    }
}


const mapStateToProps = (state: ApplicationState) => ({
  plantaAtiva: state.plantaReducer.plantaAtiva,
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComentariosGerais)
