/**
 * Action types
 */

 export enum RDOTypes {
    SELECIONAR_PLANTA = '@rdo/SELECIONAR_PLANTA',
    SELECIONAR_EQUIPE = '@rdo/SELECIONAR_EQUIPE',
    ATUALIZA_COMENTARIO = '@rdo/ATUALIZA_COMENTARIO',
    ADICIONA_ATIVIDADE = '@rdo/ADICIONA_ATIVIDADE',
    ATUALIZA_ATIVIDADE = '@rdo/ATUALIZA_ATIVIDADE',
    DELETE_ATIVIDADE = '@rdo/DELETE_ATIVIDADE',
    ARMAZENA_FOTOS = '@rdo/ARMAZENA_FOTOS',
    SALVA_HORA = '@rdo/SALVA_HORA',
    DELETE_ATUAL = '@rdo/DELETE_ATUAL',
    DELETE_ALL = '@rdo/DELETE_ALL',
    SALVA_RDO = '@rdo/SALVA_RDO',
    UPDATE_RDO = '@rdo/UPDATE_RDO',
 }

/**
 * Data types
*/

export interface AtividadeRealizada {
  id: number;
  descricao?: string;
  concluido: boolean;
}

export interface ManutencaoRDO {
    id: number;

    plantaSelecionadaId?: number;
    obraAtividade?: string;
    equipeFiscalizacao?: string;
    colaboradores: number[];

    liberacaoIT?: string;
    liberacaoOS?: string;
    liberacaoLEM?: string;
    liberacaoLET?: string;

    dataHoraEntrada?: string;
    dataHoraSaida?: string;
    dataHoraInicioAtividades?: string;
    dataHoraInicioLET?: string;
    dataHoraInicioLEM?: string;
    dataHoraFinalLET?: string;
    dataHoraFinalLEM?: string;

    fotos: {}[];
    observacoes?: string;
    infosAdicionais?: string;
    atividadesRealizadas?: AtividadeRealizada[];
    problemasEncontrados?: string;

    fotosEnviadas?: boolean;
    dadosEnviados?: boolean;
    errorSync?: boolean;
    loading?: boolean;
}

/**
 * State type
 */
export interface RDOState {
    readonly rdoAtual: ManutencaoRDO;
    readonly rdos: ManutencaoRDO[]
}
