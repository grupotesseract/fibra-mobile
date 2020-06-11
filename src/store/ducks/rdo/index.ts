import { Reducer } from 'redux';
import { RDOTypes, RDOState, ManutencaoRDO } from './types';

const INITIAL_RDO: ManutencaoRDO = {
  id: 0,
  fotos: [],
  colaboradores: [],
  fotosEnviadas: false,
  dadosEnviados: false,
  errorSync: false,
  liberacaoIT: '',
  liberacaoOS: '',
  liberacaoLEM: '',
  liberacaoLET: '',

  dataHoraEntrada: '',
  dataHoraSaida: '',
  dataHoraInicioAtividades: '',
  dataHoraInicioLET: '',
  dataHoraInicioLEM: '',
  dataHoraFinalLET: '',
  dataHoraFinalLEM: '',

  observacoes: '',
  infosAdicionais: '',
  atividadesRealizadas: [],
  problemasEncontrados: '',

  loading: false,
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
            obraAtividade,
          }
        }
      }
    case RDOTypes.SALVA_HORA:
      {
        const { tipo } = action.payload;
        const { rdoAtual } = state;

        const now = new Date().toISOString();
        //Retorna o objeto de acordo com o tipo de hora
        const registroHora = ((tipo: String) => {
          switch (tipo) {
            case 'entrada':
              if(rdoAtual.dataHoraEntrada !== ''){
                return null;
              }
              return { dataHoraEntrada: now };
            case 'saida':
              return { dataHoraSaida: now };
            case 'inicioLEM':
              if(rdoAtual.dataHoraInicioLEM !== ''){
                return null;
              }
              return { dataHoraInicioLEM: now };
            case 'inicioLET':
              if(rdoAtual.dataHoraInicioLET !== ''){
                return null;
              }
              return { dataHoraInicioLET: now };
            case 'finalLEM':
              return { dataHoraFinalLEM: now };
            case 'finalLET':
              return { dataHoraFinalLET: now };
            case 'inicioatividades':
              if(rdoAtual.dataHoraInicioAtividades !== ''){
                return null;
              }
              return { dataHoraInicioAtividades: now };
          }
        })(tipo);

        return {
          ...state,
          rdoAtual: {
            ...rdoAtual,
            ...registroHora,
          }
        }
      }
    case RDOTypes.ARMAZENA_FOTOS:
      {
        const { fotos } = action.payload;
        const { rdoAtual } = state;
        return {
          ...state,
          rdoAtual: {
            ...rdoAtual,
            fotos,
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
    case RDOTypes.ADICIONA_ATIVIDADE:
      {
        const { rdoAtual } = state;
        const { atividadesRealizadas } = rdoAtual;
        let maxId = 0;
        atividadesRealizadas.forEach(atividade => {
          if(atividade.id >= maxId) {
            maxId = atividade.id;
          }
        });
        maxId++;
        return {
          ...state,
          rdoAtual: {
            ...rdoAtual,
            atividadesRealizadas: [
              ...atividadesRealizadas,
              {
                id: maxId,
                concluido: false,
              }
            ]
          }
        }
      }
    case RDOTypes.ATUALIZA_ATIVIDADE:
      {
        const { id, descricao, concluido } = action.payload;
        const { rdoAtual } = state;
        const { atividadesRealizadas } = rdoAtual;
        const indexAtividade = atividadesRealizadas.findIndex(atividade => atividade.id === id)

        if(indexAtividade === -1) {
          return state;
        }

        const atividadeAtualizada = {
          id,
          descricao,
          concluido,
        }

        atividadesRealizadas.splice(indexAtividade, 1, atividadeAtualizada);

        return {
          ...state,
          rdoAtual: {
            ...rdoAtual,
            atividadesRealizadas,
          }
        }
      }
    case RDOTypes.DELETE_ATIVIDADE:
      {
        const { id } = action.payload;
        const { rdoAtual } = state;
        const { atividadesRealizadas } = rdoAtual;
        const indexAtividade = atividadesRealizadas.findIndex(atividade => atividade.id === id)

        if(indexAtividade === -1) {
          return state;
        }

        atividadesRealizadas.splice(indexAtividade, 1);

        return {
          ...state,
          rdoAtual: {
            ...rdoAtual,
            atividadesRealizadas,
          }
        }
      }
    case RDOTypes.SALVA_RDO:
    {
      const { rdos, rdoAtual } = state;
      let maxId = 0;
      rdos.forEach(rdo => {
        if (rdo.id >= maxId) {
          maxId = rdo.id;
        }
      })
      return {
        ...state,
        rdos: [
          ...rdos,
          {
            ...rdoAtual,
            id: maxId++,
          },
        ],
        rdoAtual: INITIAL_RDO,
      }
    }
    case RDOTypes.UPDATE_RDO:
    {
      const { rdos } = state;
      const { rdo } = action.payload;

      return {
        ...state,
        rdos: rdos.map(rdoAtual => {
          if(rdoAtual.id !== rdo.id) {
            return rdoAtual;
          }
          return {
            ...rdoAtual,
            ...rdo,
          }
        })
      }
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
