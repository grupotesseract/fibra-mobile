import { Planta } from "../planta/types";

/**
 * Action types
 */

 export enum EmpresasTypes {
     UPDATE = '@empresas/UPDATE',
     LOADED = '@empresas/LOADED',
     ERROR = '@empresas/ERROR',
 }

 /**
  * Data types
  */

export interface Empresa {
    id?: number
    nome?: string
    plantas: Planta[]
}

/**
 * State type
 */
export interface EmpresasState {
    readonly listaEmpresas: Empresa[]
    readonly loading: boolean
    readonly error: boolean
}