import { Programacao } from "../programacao/types";

/**
 * Action types
 */

 export enum PlantaTypes {
    SET = '@planta/SET',
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
    concluido?: boolean
}

export interface Planta {
    id: number
    nome?: string
    proximaProgramacao?: Programacao
    itens?: Item[]
    estoque?: Material[]
    entrada?: Material[]
}

/**
 * State type
 */
export interface PlantaState {
    readonly plantaAtiva: Planta
}