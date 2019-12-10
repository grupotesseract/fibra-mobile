/**
 * Action types
 */

 export enum PlantaTypes {
     SET = '@planta/SET',
     LIBERAR_DOCUMENTO = '@planta/LIBERAR_DOCUMENTO',
     CONFIRMAR_PERIODO_MANUTENCAO = '@planta/CONFIRMAR_PERIODO_MANUTENCAO',
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
}

export interface LiberacaoDocumento {
    usuarios?: number[]
    data_hora?: string
}

export interface Entrada {
    material_id: number
    quantidade: number
}

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

export interface Material {
    id: number,
    nome: string,
    base?: any,
    reator?: any,
    tipoMaterial?: string,
    quantidadeInstalada?: number
}

// Item é uma sala dentro de uma planta
export interface Item {
    id: number
    nome?: string
    qrcode?: string
    circuito?: string
    materiais?: Material[]
}

export interface Planta {
    id: number
    nome?: string
    proximaProgramacao?: Programacao
    liberacoesDocumento?: LiberacaoDocumento[]
    entradas?: Entrada[]
    quantidadesSubstituidas?: QuantidadeSubstituida[]
    estoques?: Estoque[]
    itens?: Item[]
}

/**
 * State type
 */
export interface PlantaState {
    readonly plantaAtiva: Planta
}