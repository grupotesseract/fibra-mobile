/**
 * Action types
 */

 export enum ProgramacoesTypes {
    ADD = '@programacoes/ADD',
    CONFIRMA_PERIODO = '@programacoes/CONFIRMA_PERIODO',
    LIBERAR_DOCUMENTO = '@programacoes/LIBERAR_DOCUMENTO',
    ARMAZENA_FOTOS = '@programacoes/ARMAZENA_FOTOS',
    DELETE_ALL = '@programacoes/DELETE_ALL',
 }

/**
 * Data types
*/

export interface QuantidadeSubstituida {
    material_id: number
    item_id: number
    quantidade_substituida: number
    data_manutencao: string
}

export interface Estoque {
    material_id: number
    quantidade_inicial: number
}

export interface Entrada {
    material_id: number
    quantidade: number
}

export interface Programacao {
    id?: number
    data_inicio_prevista?: string
    data_fim_prevista?: string
    data_inicio_real?: string
    data_fim_real?: string
    comentarioGeral?: string
}

export interface LiberacaoDocumento {
    usuarios?: number[]
    data_hora?: string
}

export interface Comentario {
    item_id: number
    comentario: string
}

export interface FotosItem {
    fotos: string[]
    id_item: number
}

export interface ProgramacaoRealizada {
    programacao?: Programacao
    liberacoesDocumento?: LiberacaoDocumento[]
    entradas?: Entrada[]
    quantidadesSubstituidas?: QuantidadeSubstituida[]
    estoques?: Estoque[]
    comentarios?: Comentario[]
    fotosItens: FotosItem[]
}

/**
 * State type
 */
export interface ProgramacoesState {
    readonly programacoesRealizadas: ProgramacaoRealizada[]
}