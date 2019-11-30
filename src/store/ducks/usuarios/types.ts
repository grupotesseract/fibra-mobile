/**
 * Action types
 */

 export enum UsuariosTypes {
     UPDATE = '@usuarios/UPDATE',
     LOADED = '@usuarios/LOADED',
     ERROR = '@usuarios/ERROR',
 }

 /**
  * Data types
  */

export interface Usuario {
    id: number
    login: string
    role: string
    password: string
    nome?: string
}

/**
 * State type
 */
export interface UsuariosState {
    readonly listaUsuarios: Usuario[]
    readonly loading: boolean
    readonly error: boolean
}