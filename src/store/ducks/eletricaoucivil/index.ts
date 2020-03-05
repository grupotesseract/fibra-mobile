import { Reducer } from 'redux';
import { EletricaOuCivilTypes, EletricaOuCivilState } from './types';

const INITIAL_STATE: EletricaOuCivilState = {
    manutencoesEletricaOuCivil: [],
}

const manutencaoEletricaOuCivilReducer: Reducer<EletricaOuCivilState> = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case EletricaOuCivilTypes.LIBERAR_DOCUMENTO:
        {
            const { now, usuarios } = action.payload;
            const { manutencaoAtual } = state;

          // Inclui um novo registro de liberação de documento
          return {
            ...state,
            manutencaoAtual: {
              ...manutencaoAtual,
              liberacaoDocumento: [
                {
                  data_hora: now,
                  usuarios,
                }
              ]
            }
          }
        }
        case EletricaOuCivilTypes.ARMAZENA_FOTOS:
        {
          const { fotos } = action.payload;
          const { manutencaoAtual } = state;
          return {
            ...state,
            manutencaoAtual: {
              ...manutencaoAtual,
              fotos,
            }
          }
        }
        case EletricaOuCivilTypes.ATUALIZA_COMENTARIOS_ADICIONAIS:
        {
          const { comentario } = action.payload;
          const { manutencaoAtual } = state;

          return {
            ...state,
            manutencaoAtual: {
              ...manutencaoAtual,
              comentariosAdicionais: comentario,
            }
          }
        }
        case EletricaOuCivilTypes.ATUALIZA_ATIVIDADE_REALIZADA:
        {
          const { comentario } = action.payload;
          const { manutencaoAtual } = state;

          return {
            ...state,
            manutencaoAtual: {
              ...manutencaoAtual,
              atividadeRealizada: comentario,
            }
          }
        }
        case EletricaOuCivilTypes.ATUALIZA_PROBLEMAS_ENCONTRADOS:
        {
          const { comentario } = action.payload;
          const { manutencaoAtual } = state;

          return {
            ...state,
            manutencaoAtual: {
              ...manutencaoAtual,
              problemasEncontrados: comentario,
            }
          }
        }
        case EletricaOuCivilTypes.DELETE_ALL:
            return {
                ...state,
                manutencoesEletricaOuCivil: [],
            }
        default:
            return state;
    }
}

export default manutencaoEletricaOuCivilReducer;
