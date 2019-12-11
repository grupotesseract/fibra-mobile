import React, { Component } from 'react';
import { Container, Content, Text, Button, Icon, ListItem, List, View, Input, H3, CheckBox } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import { bindActionCreators, Dispatch } from 'redux';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store'
import { Planta } from '../../store/ducks/planta/types';
import { Usuario } from '../../store/ducks/usuarios/types';

interface StateProps {
  plantaAtiva: Planta,
  usuarios: Usuario[],
}

interface DispatchProps {
  liberarDocumentoPlanta(idProgramacao: number, now: Date, usuarios: number[]): void,
}

type Props = StateProps & DispatchProps
class LiberarDocumento extends Component<Props> {

  state = {
    idsUsuariosSelecionados: [],
    now: new Date(),
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
    const { now, idsUsuariosSelecionados } = this.state;
    const idProgramacao = plantaAtiva.proximaProgramacao.id;
    
    await liberarDocumentoPlanta(idProgramacao, now, idsUsuariosSelecionados);
    navigation.navigate({ routeName: 'MenuVistoria' })
  }

  render() {
    const { usuarios } = this.props;
    const { now, idsUsuariosSelecionados } = this.state;
    const hora = now.getHours();
    const minuto = now.getMinutes();

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
          <Button block onPress={() => this.liberarDocumento()}>
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