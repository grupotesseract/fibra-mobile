import { Reducer } from 'redux';
import { ProgramacoesTypes, ProgramacoesState } from './types';

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
        case ProgramacoesTypes.UPDATE:
        case ProgramacoesTypes.ADD:
            return { 
                ...state, 
                programacoesRealizadas: [
                    ...state.programacoesRealizadas,
                    action.payload.programacaoRealizada,
                ], 
            };
        default:
            return state;
    }
}

export default programacoesReducer;