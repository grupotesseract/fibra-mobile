import { Programacao, Estoque } from "../programacoes/types";

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
export interface Material {
    id: number,
    nome: string,
    potencia?: string,
    tensao?: string,
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
    itens?: Item[]
    estoque: Estoque[]
}

/**
 * State type
 */
export interface PlantaState {
    readonly plantaAtiva: Planta
}