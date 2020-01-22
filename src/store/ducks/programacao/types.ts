/**
 * Action types
 */

 export enum ProgramacaoTypes {
    CONFIRMA_PERIODO = '@programacoes/CONFIRMA_PERIODO',
    UPDATE_PROGRAMACAO = '@programacoes/UPDATE_PROGRAMACAO',
    ARMAZENA_COMENTARIOS_GERAIS = '@programacoes/ARMAZENA_COMENTARIOS_GERAIS',
    CONCLUI_MANUTENCAO = '@programacoes/CONCLUI_MANUTENCAO',
 }

/**
 * Data types
*/
export interface Programacao {
    id?: number
    data_inicio_prevista?: string
    data_fim_prevista?: string
    data_inicio_real?: string
    data_fim_real?: string
    comentarioGeral?: string
}

