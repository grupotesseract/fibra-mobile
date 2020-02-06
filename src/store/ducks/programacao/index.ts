import { Reducer } from 'redux';
import { ProgramacaoTypes, Programacao} from './types';

const programacaoReducer: Reducer<Programacao> = (state = {},action) => {
    switch (action.type) {
        case ProgramacaoTypes.ARMAZENA_COMENTARIOS_GERAIS:
        {
          const { idProgramacao, comentario } = action.payload;

          if(state.id !== idProgramacao) {
            return state;
          }

          return {
            ...state,
              comentarioGeral: comentario,
          }
        }
        case ProgramacaoTypes.CONCLUI_MANUTENCAO:
        {
          const { idProgramacao } = action.payload;

          if(state.id !== idProgramacao) {
            return state;
          }

          const now = new Date().toISOString();
          return {
            ...state,
            data_fim_real: now,
          }
        }
        case ProgramacaoTypes.CONFIRMA_PERIODO:
        {
          const { idProgramacao, dataInicioReal } = action.payload;

          if(state.id !== idProgramacao) {
            return state;
          }

          return {
            ...state,
            data_inicio_real: state.data_inicio_real || dataInicioReal,
          }
        }
    }
}

export default programacaoReducer;
