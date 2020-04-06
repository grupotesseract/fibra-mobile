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
import { Planta } from '../../../store/ducks/planta/types'
import * as ProgramacoesActions from '../../../store/ducks/programacoes/actions'
import { ProgramacaoRealizada } from '../../../store/ducks/programacoes/types'

interface StateProps {
  plantaAtiva: Planta,
  programacoesRealizadas: ProgramacaoRealizada[],
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  armazenaComentarioManutencaoEletrica({ tipoComentario, comentario }): void
}

type Props = StateProps & DispatchProps

class ManutencaoEletricaComentarios extends Component<Props> {

  state = {
    comentario: '',
  }

  salvaComentario = async () => {
    const { navigation, armazenaComentarioManutencaoEletrica } = this.props;
    const tipoComentario = navigation.state.params?.tipo || null;

    const { comentario } = this.state;

    await armazenaComentarioManutencaoEletrica({ tipoComentario, comentario });
    navigation.goBack();
  }

  componentDidMount() {
    // Carregar comentario do redux?
  }

  render() {
    const { comentario } = this.state;
    return <Container>
      <HeaderNav title={"Comentários"} />
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
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManutencaoEletricaComentarios)
