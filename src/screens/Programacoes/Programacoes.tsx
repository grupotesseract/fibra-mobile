import React, { Component } from 'react';
import { Container, Content, Text, Card, CardItem, Body, Left, Badge, View, Button, Icon, Spinner } from 'native-base';
import HeaderNav from '../../components/HeaderNav';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import { uploadProgramacao, uploadFotos } from '../../services/api';
import { iso2ddmmaaaa } from '../../utils/utils';

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

  componentDidMount() {
    const { programacoesRealizadas } = this.props;
    console.log( programacoesRealizadas );
  }

  syncProgramacao = async (idProgramacao: number) => {
    const { updateProgramacao, programacoesRealizadas } = this.props;
    const programacao = programacoesRealizadas.find(p => p.programacao.id === idProgramacao)

    let dadosEnviados = programacao.dadosEnviados || false;
    let errorSync = false;

    if (programacao) {
      // Envia dados de programacao
      if (!dadosEnviados) {
        uploadProgramacao({ idProgramacao, programacao })
          .then(res => {
            if (res.error) {
              errorSync = true;
              console.log("Erro ao tentar upload", res.error);
            } else {
              dadosEnviados = true;
              console.log("Dados enviados!", res)
            }

            updateProgramacao(
              {
                idProgramacao,
                programacao: {
                  ...programacao,
                  dadosEnviados,
                  errorSync
                }
              }
            );
          });
      }

      //Envia fotos item por item
      const { fotosItens } = programacao;
      fotosItens.forEach(fotoItem => {
        const idItem = fotoItem.id_item;
        const fotos = fotoItem.fotos || [];
        let fotosEnviadas = fotoItem.fotosEnviadas || false;

        console.log("FotoItem", fotoItem)
        if (!fotosEnviadas) {
          uploadFotos({ idProgramacao, idItem, fotos })
            .then(res => {
              if (res.error) {
                console.log("Erro ao subir fotos", res.error);
              } else {
                fotosEnviadas = true;
                console.log("Dados enviados!", res)
              }

              updateProgramacao(
                {
                  idProgramacao,
                  programacao: {
                    ...programacao,
                    fotosItens: fotosItens.map(fi => {
                      if (fi.id_item !== fotoItem.id_item) {
                        return fi;
                      }
                      return {
                        ...fi,
                        fotosEnviadas
                      }
                    })
                  }
                }
              );
            });
        }
      })
    }
  }

  render() {
    const { programacoesRealizadas } = this.props;

    return (
      <Container>
        <HeaderNav title="Listagem de Programações" />

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
                      <Text>Manutenção prevista para</Text>
                      <Text note>{iso2ddmmaaaa(inicio)} - {iso2ddmmaaaa(fim)}</Text>
                      <Text>Itens com fotos armazenadas: {fotosItens.length}</Text>
                      <Text>Itens com fotos enviadas: {fotosEnviadas}</Text>
                      {/* <Text>data_inicio_prevista {programacaoRealizada.programacao.data_inicio_prevista}</Text>
                      <Text>data_fim_prevista {programacaoRealizada.programacao.data_fim_prevista}</Text>
                      <Text>data_inicio_real {programacaoRealizada.programacao.data_inicio_real}</Text>
                      <Text>data_fim_real {programacaoRealizada.programacao.data_fim_real}</Text>
                      <Text>comentarioGeral {programacaoRealizada.programacao.comentarioGeral}</Text>
                      <Text>qtdFotos {programacaoRealizada.fotosItens.length}</Text> */}

                  <View style={{ flexDirection: "row" }}>
                    <Badge
                      style={style.badgeSync}
                      primary={!errorSync && !dadosEnviados}
                      warning={errorSync}
                      success={dadosEnviados && !errorSync}>
                      <Text>Informações</Text>
                    </Badge>
                    <Badge
                      style={style.badgeSync}
                      primary={fotosEnviadas === 0}
                      warning={fotosEnviadas > 0 && fotosEnviadas < fotosItens.length}
                      success={fotosEnviadas === fotosItens.length}>
                      <Text>Fotos</Text>
                    </Badge>
                  </View>

                      <Button
                        full
                        onPress={() => this.syncProgramacao(programacaoRealizada.programacao.id)}
                      >
                        <Text>Sincronizar</Text>
                      </Button>
                    </Body>
                  </Left>
                </CardItem>

                { programacaoRealizada.errorSync &&
                <CardItem footer bordered>
                  <Text>Ocorreu um erro ao sincronizar os dados, tente novamente.</Text>
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
