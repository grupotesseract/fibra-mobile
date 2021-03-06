import React, { Component } from 'react'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Left,
  Text,
  Toast,
} from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import HeaderNav from '../../components/HeaderNav'
import { uploadFotos, uploadProgramacao } from '../../services/api'
import { ApplicationState } from '../../store'
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types'
import { iso2ddmmaaaa } from '../../utils/utils'
import { ActivityIndicator } from 'react-native'

interface StateProps {
  programacoesRealizadas: ProgramacaoRealizada[],
}

interface DispatchProps {
  deleteProgramacoes(): void,
  updateProgramacao({ idProgramacao, programacao }): void,
  uploadFotos({ idItem, idProgramacao, programacao }): void,
}

type Props = StateProps & DispatchProps

class Programacoes extends Component<Props> {

  state = {
    isSyncing: false
  }

  syncProgramacao = async (idProgramacao: number) => {
    const { updateProgramacao, programacoesRealizadas } = this.props;
    const programacao = programacoesRealizadas.find(p => p.programacao.id === idProgramacao)

    let dadosEnviados = programacao.dadosEnviados || false;
    let errorSync = programacao.errorSync || false;

    if (programacao) {
      // Envia dados de programacao
      this.setState({isSyncing : true});
      if (!dadosEnviados) {
        const res = await uploadProgramacao({ idProgramacao, programacao });
        if (res.error) {
          programacao.errorSync = true;

          Toast.show({
            text: String(res.error),
            buttonText: 'Ok',
            type: "danger"
          })
        } else {
          programacao.dadosEnviados = true;
          console.log("Dados enviados!", res)
        }

        await updateProgramacao({ idProgramacao, programacao });
      }

      //Envia fotos item por item
      const { fotosItens } = programacao;
      const promisesFotos = fotosItens.map(async fotoItem => {
        const idItem = fotoItem.id_item;
        const fotos = fotoItem.fotos || [];
        let fotosEnviadas = fotoItem.fotosEnviadas || false;

        if (!fotosEnviadas) {
          try {
            const res = await uploadFotos({ idProgramacao, idItem, fotos });
            if (res.error) {
              Toast.show({
                text: String(res.error),
                buttonText: 'Ok',
                type: "danger"
              })
            } else {
              fotoItem.fotosEnviadas = true;
              console.log("Dados enviados!", res)
            }
          } catch (err) {
            Toast.show({
              text: String(err),
              buttonText: 'Ok',
              type: "danger"
            });
          }
        }

        return fotoItem
      });

      const fotosItensAtualizadas = await Promise.all(promisesFotos);
      await updateProgramacao(
        {
          idProgramacao,
          programacao: {
            ...programacao,
            fotosItens: fotosItensAtualizadas,
            errorSync
          },
        }
      );
      this.setState({isSyncing : false});
    }
  }

  render() {
    const { programacoesRealizadas } = this.props;
    const { isSyncing } = this.state;

    return (
      <Container>
        <HeaderNav title="Programações" />
        {
          isSyncing ? <ActivityIndicator size='large' /> : null
        }

        <Content padder>
          {
            programacoesRealizadas?.map((programacaoRealizada: ProgramacaoRealizada) => {

              const { errorSync, dadosEnviados, fotosItens } = programacaoRealizada;
              const inicio = programacaoRealizada.programacao.data_inicio_prevista;
              const fim = programacaoRealizada.programacao.data_fim_prevista
              const fotosEnviadas = fotosItens.reduce((fotosEnviadas, fotoItem) => fotosEnviadas + Number(!!fotoItem.fotosEnviadas), 0)
              return <Card key={programacaoRealizada.programacao.id}>
                <CardItem header bordered>
                  <Text>Programação #{programacaoRealizada.programacao.id}</Text>
                </CardItem>
                <CardItem>
                  <Left>
                    <Body>

                      <Text style={{marginVertical: 5, fontWeight: 'bold'}}> Sincronização </Text>

                      <Text> Informações: { errorSync ? 'reenvio pendente' : dadosEnviados ? 'sincronizadas' : 'pendente' } </Text>
                      <Text> Fotos de itens: { fotosEnviadas } de { fotosItens.length } sincronizadas </Text>

                      <Button
                        full
                        style={{ marginTop: 12 }}
                        onPress={() => this.syncProgramacao(programacaoRealizada.programacao.id)}
                      >
                        <Text>Sincronizar</Text>
                      </Button>
                    </Body>
                  </Left>
                </CardItem>

                { programacaoRealizada.errorSync &&
                <CardItem footer bordered>
                  <Text>Ocorreu um erro ao sincronizar, tente novamente.</Text>
                </CardItem>
                }
              </Card>
            })
          }

          <Button
            full
            onPress={() => this.props.deleteProgramacoes()}
          >
            <Text>Limpar programações</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const style = {
  badgeSync: {
      margin: 5,
      height: 40,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Programacoes)
