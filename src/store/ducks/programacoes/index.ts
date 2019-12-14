import { Reducer } from 'redux';
import { ProgramacoesTypes, ProgramacoesState, FotosItem } from './types';

const INITIAL_STATE: ProgramacoesState = {
    programacoesRealizadas: [],
}

const programacoesReducer: Reducer<ProgramacoesState> = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case ProgramacoesTypes.LIBERAR_DOCUMENTO:
        {
            const { idProgramacao, now, usuarios } = action.payload;
            const { programacoesRealizadas } = state;

            // Inclui um novo registro de liberação de documento
            return {
                ...state,
                programacoesRealizadas: programacoesRealizadas.map(programacaoRealizada => {
                    if (programacaoRealizada?.programacao?.id !== idProgramacao) {
                        return programacaoRealizada;
                    }
                    return {
                        ...programacaoRealizada,
                        liberacoesDocumento: [
                            ...programacaoRealizada.liberacoesDocumento,
                            {
                                data_hora: now,
                                usuarios,
                            }
                        ]
                    }
                })
            }
        }
        case ProgramacoesTypes.CONFIRMA_PERIODO:
        {
            const { idProgramacao, dataInicioReal } = action.payload;
            const { programacoesRealizadas } = state;

            // Modifica a data de inicio da programacao que tem o id recebido
            return {
                ...state,
                programacoesRealizadas: programacoesRealizadas.map(programacaoRealizada => {
                    if (programacaoRealizada?.programacao?.id !== idProgramacao) {
                        return programacaoRealizada;
                    }
                    return {
                        ...programacaoRealizada,
                        programacao: {
                            ...programacaoRealizada.programacao,
                            data_inicio_real: dataInicioReal,
                        }
                    }
                })
            }
        }
        case ProgramacoesTypes.ADD:
        {
            const { programacoesRealizadas } = state;
            const { programacaoRealizada } = action.payload;

            // Caso já exista a programação, nada acontece feijoada
            const indexProgramacao = programacoesRealizadas.findIndex(programacao => programacao.programacao.id === programacaoRealizada.programacao.id);
            if ( indexProgramacao >= 0) {
                return {
                    ...state,
                };
            }
            return {
                ...state,
                programacoesRealizadas: [
                    ...programacoesRealizadas,
                    programacaoRealizada,
                ],
            };
        }
        case ProgramacoesTypes.ARMAZENA_FOTOS:
        {
            const { idItem, idProgramacao, fotos } = action.payload;
            const { programacoesRealizadas } = state;
            return {
                ...state,
                programacoesRealizadas: programacoesRealizadas.map(programacaoRealizada => {
                    if (programacaoRealizada?.programacao?.id !== idProgramacao) {
                        return programacaoRealizada;
                    }
                    const { fotosItens } = programacaoRealizada;
                    // Caso já tenha fotos desse item, sobrescreve
                    const indexFotoItem = fotosItens.findIndex(fotoitem => fotoitem.id_item === idItem);
                    if (indexFotoItem >= 0) {
                        return {
                            ...programacaoRealizada,
                            fotosItens: fotosItens.map((fotosItem: FotosItem) => {
                                if (fotosItem.id_item !== idItem) {
                                    return fotosItem
                                }
                                return {
                                    fotos,
                                    id_item: idItem
                                }
                            }),
                        }
                    }
                    return {
                        ...programacaoRealizada,
                        fotosItens: [
                            ...fotosItens,
                            {
                                fotos,
                                id_item: idItem
                            }

                        ]
                    }
                })
            }
        }
        case ProgramacoesTypes.ARMAZENA_QUANTIDADES:
        {
            const { idProgramacao, quantidadesSubstituidas } = action.payload;
            const { programacoesRealizadas } = state;

            return {
                ...state,
                programacoesRealizadas: programacoesRealizadas.map(programacaoRealizada => {
                    if (programacaoRealizada?.programacao?.id !== idProgramacao) {
                        return programacaoRealizada;
                    }
                    // Subsititui as quantidades que já estão armazenadas
                    const quantidadesArmazenadas = programacaoRealizada.quantidadesSubstituidas.map( qtdArmazenada => {
                        const indexNovaQtd = quantidadesSubstituidas.findIndex( qtdSubstituida => {
                          return qtdSubstituida.base_id === qtdArmazenada.base_id &&
                            qtdSubstituida.reator_id === qtdArmazenada.reator_id &&
                            qtdSubstituida.material_id === qtdArmazenada.material_id &&
                            qtdSubstituida.item_id === qtdArmazenada.item_id;
                        })

                        if(indexNovaQtd >= 0) {
                          // Remove da lista as quantidades subsitituidas que foram atualizadas
                          const qtdRetorno = quantidadesSubstituidas[indexNovaQtd];
                          quantidadesSubstituidas.splice(indexNovaQtd, 1);
                          return qtdRetorno;
                        }
                        return qtdArmazenada;
                    })

                    return {
                      ...programacaoRealizada,
                      quantidadesSubstituidas: [
                        ...quantidadesArmazenadas,
                        ...quantidadesSubstituidas,
                      ]
                    };
                })
            }
        }
        case ProgramacoesTypes.ARMAZENA_COMENTARIO_ITEM:
        {
            const { idProgramacao, comentario, idItem } = action.payload;
            const { programacoesRealizadas } = state;

            return {
                ...state,
                programacoesRealizadas: programacoesRealizadas.map(programacaoRealizada => {
                    if (programacaoRealizada?.programacao?.id !== idProgramacao) {
                        return programacaoRealizada;
                    }
                    const { comentarios } = programacaoRealizada;
                    const indexComentario = comentarios.findIndex(c => c.item_id === idItem)
                    // Subsititui o comentario que já está armazenado
                    if (indexComentario >= 0) {
                      return {
                        ...programacaoRealizada,
                        comentarios: comentarios.splice(indexComentario, 1, {
                          comentario,
                          item_id: idItem
                        })
                      }
                    }
                    return {
                      ...programacaoRealizada,
                      comentarios: [
                        ...comentarios,
                        {
                          comentario,
                          item_id: idItem
                        }
                      ]
                    }
                })
            }
        }
        case ProgramacoesTypes.CONCLUI_ITEM:
        {
          const { idProgramacao, idItem } = action.payload;
          const { programacoesRealizadas } = state;
          return {
                ...state,
                programacoesRealizadas: programacoesRealizadas.map(programacaoRealizada => {
                    if (programacaoRealizada?.programacao?.id !== idProgramacao) {
                        return programacaoRealizada;
                    }
                    const itensVistoriados = programacaoRealizada.itensVistoriados || [];
                    const indexItem = itensVistoriados.findIndex(i => i.id_item === idItem)
                    // Subsititui o item que já está armazenado
                    if (indexItem >= 0) {
                      return {
                        ...programacaoRealizada,
                        itensVistoriados: itensVistoriados.splice(indexItem, 1, {
                          concluido: true,
                          id_item: idItem
                        })
                      }
                    }
                    return {
                      ...programacaoRealizada,
                      itensVistoriados: [
                        ...itensVistoriados,
                        {
                          concluido: true,
                          id_item: idItem
                        }
                      ]
                    }
                })
            }
        }
        case ProgramacoesTypes.ARMAZENA_COMENTARIOS_GERAIS:
        {
          const { idProgramacao, comentario } = action.payload;
          const { programacoesRealizadas } = state;

          return {
                ...state,
                programacoesRealizadas: programacoesRealizadas.map(programacaoRealizada => {
                    if (programacaoRealizada?.programacao?.id !== idProgramacao) {
                        return programacaoRealizada;
                    }
                    return {
                      ...programacaoRealizada,
                      programacao: {
                        ...programacaoRealizada.programacao,
                        comentarioGeral: comentario,
                      }
                    }
                })
            }
        }
        case ProgramacoesTypes.DELETE_ALL:
            return {
                ...state,
                programacoesRealizadas: [],
            }
        default:
            return state;
    }
}

export default programacoesReducer;