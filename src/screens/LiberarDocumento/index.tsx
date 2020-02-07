import React, { Component } from 'react';
import { Container, Content, Text, Button, Icon, ListItem, List, View, Input, H3, CheckBox } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store'
import { Planta } from '../../store/ducks/planta/types';
import { Usuario } from '../../store/ducks/usuarios/types';
import { NavigationScreenProp } from 'react-navigation';

interface StateProps {
  plantaAtiva: Planta,
  usuarios: Usuario[],
  navigation: NavigationScreenProp<any, any>,
}

interface DispatchProps {
  liberarDocumentoPlanta(idProgramacao: number, now: string, usuarios: number[]): void,
}

type Props = StateProps & DispatchProps
class LiberarDocumento extends Component<Props> {

  state = {
    idsUsuariosSelecionados: [],
    now: new Date().toISOString(),
  }

  onPressBotaoColaborador = (idColaborador: number) => {
    const { idsUsuariosSelecionados } = this.state;
    let listaIds = [];
    if(!idsUsuariosSelecionados.includes(idColaborador)) {
      listaIds = [
        ...idsUsuariosSelecionados,
        idColaborador,
      ]
    } else {
      listaIds = idsUsuariosSelecionados.filter(id => id !== idColaborador)
    }
    this.setState({idsUsuariosSelecionados: listaIds})
  }

  liberarDocumento = async () => {
    const { navigation, liberarDocumentoPlanta, plantaAtiva } = this.props;
    const { idsUsuariosSelecionados } = this.state;
    const now = new Date().toISOString();
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    this.setState({ now });

    await liberarDocumentoPlanta(idProgramacao, now, idsUsuariosSelecionados);
    navigation.navigate({ routeName: 'MenuVistoria' })
  }

  render() {
    const { usuarios } = this.props;
    const { now, idsUsuariosSelecionados } = this.state;
    const nowDateObj = new Date();
    const hora = nowDateObj.getHours();
    const minuto = nowDateObj.getMinutes();

    const colaboradores = usuarios.filter(usuario => usuario.role === 'tecnico');
    return (
      <Container>
        <HeaderNav title="Liberação de Documento"/>

        <Content padder>
          <H3>Colaboradores</H3>
          <List>
            { colaboradores.map(colaborador => {
              return <ListItem
                key={colaborador.id}
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingRight: 0,
                  marginLeft: 0,
                  justifyContent: 'space-between',

                }}
                onPress={() => this.onPressBotaoColaborador(colaborador.id)}
              >
                <Text>{colaborador.nome}</Text>
                <CheckBox
                  checked={idsUsuariosSelecionados.includes(colaborador.id)}
                  onPress={() => this.onPressBotaoColaborador(colaborador.id)}
                  >
                </CheckBox>
              </ListItem>
            })}
          </List>
          <View style={{ marginVertical: 30 }}>
            <H3 style={{textAlign: 'center'}}>Liberação de documentos</H3>
            <View style={{flex: 1,flexDirection: 'row', alignContent: 'center', alignSelf: 'center', width: 150}}>
              <Input
                style={{ fontSize: 35 }}
                value={hora < 10 ? '0'+hora.toString() : hora.toString()}
                keyboardType="numeric"/>
              <Text style={{ fontSize: 30, textAlignVertical: 'center'}}>:</Text>
              <Input
                style={{ fontSize: 35 }}
                value={minuto < 10 ? '0'+minuto.toString() : minuto.toString()}
                keyboardType="numeric"/>
              <Text style={{fontSize: 30, textAlignVertical: 'center'}}>h</Text>
            </View>
          </View>
          <Button
            block
            disabled={idsUsuariosSelecionados.length <= 0}
            onPress={() => this.liberarDocumento()}
          >
            <Text>Iniciar manutenção</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  usuarios: state.usuariosReducer.listaUsuarios,
  plantaAtiva: state.plantaReducer.plantaAtiva,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LiberarDocumento)