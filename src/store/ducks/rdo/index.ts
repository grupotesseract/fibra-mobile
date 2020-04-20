import { Reducer } from 'redux';
import { RDOTypes, RDOState, ManutencaoRDO } from './types';

const INITIAL_RDO: ManutencaoRDO = {
  fotos: [],
  colaboradores: [],
  fotosEnviadas: false,
  dadosEnviados: false,
  errorSync: false,
  liberacaoIT: null,
  liberacaoOS: null,
  liberacaoLEM: null,
  liberacaoLET: null,
  observacoes: null,
  infosAdicionais: null,
  atividadesRealizadas: [],
  problemasEncontrados: null,
};

const INITIAL_STATE: RDOState = {
  rdoAtual: INITIAL_RDO,
  rdos: [],
}

const manutencaoRDOReducer: Reducer<RDOState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RDOTypes.SELECIONAR_PLANTA:
      {
        const { plantaSelecionadaId, obraAtividade } = action.payload;
        const { rdoAtual } = state;

        return {
          ...state,
          rdoAtual: {
            ...rdoAtual,
            plantaSelecionadaId,
            obraAtividade
          }
        }
      }
    case RDOTypes.SELECIONAR_EQUIPE:
      {
        const { colaboradores, equipeFiscalizacao } = action.payload;
        const { rdoAtual } = state;
        return {
          ...state,
          rdoAtual: {
            ...rdoAtual,
            colaboradores,
            equipeFiscalizacao,
          }
        }
      }
    case RDOTypes.ATUALIZA_COMENTARIO:
      {
        const { comentario, tipoComentario } = action.payload;
        const { rdoAtual } = state;

        //Retorna o objeto de acordo com o tipo de comentário
        const comentarioAtualizado = ((tipoComentario: String) => {
          switch(tipoComentario) {
            case 'IT':
              return { liberacaoIT: comentario };
            case 'OS':
              return { liberacaoOS: comentario };
            case 'LEM':
              return { liberacaoLEM: comentario };
            case 'LET':
              return { liberacaoLET: comentario };
            case 'problemas_encontrados':
              return { problemasEncontrados: comentario };
            case 'informacoes_adicionais':
              return { infosAdicionais: comentario };
            case 'observacoes':
              return { observacoes: comentario };
          }
        })(tipoComentario);

        return {
          ...state,
          rdoAtual: {
            ...rdoAtual,
            ...comentarioAtualizado,
          }
        }
      }
    case RDOTypes.SALVA_RDO:
      const { rdos, rdoAtual } = state;
      return {
        ...state,
        rdos: [
          ...rdos,
          rdoAtual
        ],
        rdoAtual: INITIAL_RDO,
      }
    case RDOTypes.DELETE_ATUAL:
      return {
        ...state,
        rdoAtual: INITIAL_RDO,
      }
    case RDOTypes.DELETE_ALL:
      return {
        ...state,
        rdos: [],
      }
    default:
      return state;
  }
}

export default manutencaoRDOReducer;
