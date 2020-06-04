import { Programacao } from "../programacao/types";

/**
 * Action types
 */

 export enum PlantaTypes {
    SET = '@planta/SET',
    SET_TODOS_MATERIAIS_ITEM = '@planta/SET_TODOS_MATERIAIS_ITEM',
 }

 /**
  * Data types
  */
export interface Material {
    id: number,
    reator_id?: number,
    base_id?: number,
    nome: string,
    potencia?: string,
    tensao?: string,
    base?: string,
    reator?: string,
    tipoMaterial?: string,
    tipoMaterialTipo?: string,
    tipoMaterialAbreviacao?: string,
    quantidadeInstalada?: number,
    quantidade?: number,
    quantidadeBase?: number,
    quantidadeReator?: number,
    quantidadeConfirmada?: boolean,
}

// Item é uma sala dentro de uma planta
export interface Item {
    id: number
    nome?: string
    qrcode?: string
    circuito?: string
    materiais?: Material[],
    todosMateriais?: Material[],
    concluido?: boolean
}

export interface AtividadePendente {
    id: number
    texto?: string
}

export interface Planta {
    id: number
    nome?: string
    proximaProgramacao?: Programacao
    itens?: Item[]
    estoque?: Material[]
    entrada?: Material[]
    atividadesPendentes?: AtividadePendente
}

/**
 * State type
 */
export interface PlantaState {
    readonly plantaAtiva: Planta
}
