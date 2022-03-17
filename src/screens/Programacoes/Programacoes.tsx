import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Spinner,
  Text,
  Toast,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { uploadFotos, uploadProgramacao } from '../../services/api';
import { ApplicationState } from '../../store';
import * as ProgramacoesActions from '../../store/ducks/programacoes/actions';
import { ProgramacaoRealizada } from '../../store/ducks/programacoes/types';
import ActionButton from '../../components/ActionButton';

interface StateProps {
  programacoesRealizadas: ProgramacaoRealizada[];
}

interface DispatchProps {
  deleteProgramacoes(): void;
  updateProgramacao({ idProgramacao, programacao }): void;
  uploadFotos({ idItem, idProgramacao, programacao }): void;
}

type Props = StateProps & DispatchProps;

const Programacoes = (props: Props) => {
  const [isSyncing, setIsSyncing] = useState(false)
  const { updateProgramacao, programacoesRealizadas } = props;

  const syncProgramacao = async (idProgramacao: number) => {
    const programacao = programacoesRealizadas.find(
      (p) => p.programacao.id === idProgramacao
    );

    let dadosEnviados = programacao.dadosEnviados || false;
    let errorSync = programacao.errorSync || false;



    if (programacao) {
      // Envia dados de programacao
      setIsSyncing(true)
      if (!dadosEnviados) {
        const res = await uploadProgramacao({ idProgramacao, programacao });
        if (res.error) {
          programacao.errorSync = true;

          Toast.show({
            title: String(res.error),
            isClosable: true,
            status: 'error',
          });
        } else {
          programacao.dadosEnviados = true;
          console.log('Dados enviados!', res);
        }

        await updateProgramacao({ idProgramacao, programacao });
      }

      //Envia fotos item por item
      const { fotosItens } = programacao;
      const promisesFotos = fotosItens.map(async (fotoItem) => {
        const idItem = fotoItem.id_item;
        const fotos = fotoItem.fotos || [];
        let fotosEnviadas = fotoItem.fotosEnviadas || false;

        if (!fotosEnviadas) {
          try {
            const res = await uploadFotos({ idProgramacao, idItem, fotos });
            if (res.error) {
              Toast.show({
                title: String(res.error),
                isClosable: true,
                status: 'error',
              });
            } else {
              fotoItem.fotosEnviadas = true;
              console.log('Dados enviados!', res);
            }
          } catch (err) {
            Toast.show({
              title: String(err),
              isClosable: true,
              status: 'error',
            });
          }
        }

        return fotoItem;
      });

      const fotosItensAtualizadas = await Promise.all(promisesFotos);
      await updateProgramacao({
        idProgramacao,
        programacao: {
          ...programacao,
          fotosItens: fotosItensAtualizadas,
          errorSync,
        },
      });
      setIsSyncing(false)

    }
  };

  return (
    <Box padding={7}>
      {isSyncing ? <Spinner size='lg' /> : null}

      <Box >
        {programacoesRealizadas?.map(
          (programacaoRealizada: ProgramacaoRealizada) => {
            const {
              errorSync,
              dadosEnviados,
              fotosItens,
            } = programacaoRealizada;
            const inicio =
              programacaoRealizada.programacao.data_inicio_prevista;
            const fim = programacaoRealizada.programacao.data_fim_prevista;
            const fotosEnviadas = fotosItens.reduce(
              (fotosEnviadas, fotoItem) =>
                fotosEnviadas + Number(!!fotoItem.fotosEnviadas),
              0
            );
            return (
              <Card key={programacaoRealizada.programacao.id}>
                <Box >
                  <Text>
                    Programação #{programacaoRealizada.programacao.id}
                  </Text>
                </Box>
                <Box>
                  <Box>
                    <Box>
                      <Text style={{ marginVertical: 5, fontWeight: 'bold' }}>
                        {`Sincronização `}
                      </Text>

                      <Text>
                        {`Informações: ${errorSync
                          ? 'reenvio pendente'
                          : dadosEnviados
                            ? 'sincronizadas'
                            : 'pendente'
                          }`}
                      </Text>
                      <Text>
                        {`Fotos de itens: ${fotosEnviadas} de ${fotosItens.length} sincronizadas`}
                      </Text>

                      <Button
                        style={{ marginTop: 12 }}
                        onPress={() =>
                          syncProgramacao(
                            programacaoRealizada.programacao.id
                          )
                        }
                      >
                        <Text>Sincronizar</Text>
                      </Button>
                    </Box>
                  </Box>
                </Box>

                {programacaoRealizada.errorSync && (
                  <Box >
                    <Text>
                      Ocorreu um erro ao sincronizar, tente novamente.
                    </Text>
                  </Box>
                )}
              </Card>
            );
          }
        )}

        <ActionButton onPress={() => props.deleteProgramacoes()}>
          Limpar programações
        </ActionButton>
      </Box>
    </Box>
  );

}

const mapStateToProps = (state: ApplicationState) => ({
  programacoesRealizadas: state.programacoesReducer.programacoesRealizadas,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(ProgramacoesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Programacoes);
