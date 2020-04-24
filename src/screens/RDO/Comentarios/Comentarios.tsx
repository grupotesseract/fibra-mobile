import React, { Component } from 'react'
import {
  Button,
  Container,
  Content,
  Form,
  Text,
  Textarea,
  View,
} from 'native-base'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import HeaderNav from '../../../components/HeaderNav'
import { ApplicationState } from '../../../store'
import * as RDOActions from '../../../store/ducks/rdo/actions'
import { ManutencaoRDO } from '../../../store/ducks/rdo/types';

interface StateProps {
  rdoAtual: ManutencaoRDO,
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  atualizaComentario({ tipoComentario, comentario }): void
  salvaHoraFinalLEM(): void
  salvaHoraFinalLET(): void
}

type Props = StateProps & DispatchProps

class ComentariosRDO extends Component<Props> {

  state = {
    comentario: '',
  }

  salvaComentario = async () => {
    const { navigation, atualizaComentario, salvaHoraFinalLEM, salvaHoraFinalLET } = this.props;
    const tipoComentario = navigation.state.params?.tipo || null;

    const { comentario } = this.state;

    if(tipoComentario === 'LEM') {
      await salvaHoraFinalLEM();
    }

    if(tipoComentario === 'LET') {
      await salvaHoraFinalLET();
    }

    await atualizaComentario({ tipoComentario, comentario });
    navigation.goBack();
  }

  componentDidMount() {
    const { navigation, rdoAtual } = this.props;
    const tipoComentario = navigation.state.params?.tipo || null;
    const comentario = ((tipoComentario: String) => {
      switch (tipoComentario) {
        case 'IT':
          return rdoAtual.liberacaoIT;
        case 'OS':
          return  rdoAtual.liberacaoOS;
        case 'LEM':
          return  rdoAtual.liberacaoLEM;
        case 'LET':
          return rdoAtual.liberacaoLET;
        case 'problemas_encontrados':
          return rdoAtual.problemasEncontrados;
        case 'informacoes_adicionais':
          return rdoAtual.infosAdicionais;
        case 'observacoes':
          return rdoAtual.observacoes;
      }
    })(tipoComentario);

    this.setState({
      comentario
    })
  };

  render() {
    const tipoComentario = this.props.navigation.state.params?.tipo || null;
    const { comentario } = this.state;

    const title = ((tipoComentario: String) => {
      switch (tipoComentario) {
        case 'IT':
        case 'OS':
        case 'LEM':
        case 'LET':
          return 'Registrar '+tipoComentario;
        case 'problemas_encontrados':
          return 'Problemas Encontrados';
        case 'informacoes_adicionais':
          return 'Informações Adicionais';
        case 'observacoes':
          return 'Observações';
      }
    })(tipoComentario);

    return <Container>
      <HeaderNav title={title} />
      <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
        <KeyboardAvoidingView behavior="height">
          <Form>
            <ScrollView>
              <Textarea
                underline={false}
                rowSpan={50}
                bordered
                value={comentario}
                onChangeText={(comentario) => this.setState({comentario})}/>
            </ScrollView>
          </Form>
        </KeyboardAvoidingView>
      </Content>

      <View style={{ flexDirection: 'row', padding: 20 }}>
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
  rdoAtual: state.manutencaoRDOReducer.rdoAtual
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(RDOActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComentariosRDO)
