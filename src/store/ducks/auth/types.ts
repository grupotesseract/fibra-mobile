/**
 * Action types
 */

 export enum AuthTypes {
     AUTH_REQUEST = '@auth/AUTH_REQUEST',
     AUTH_SUCCESS = '@auth/AUTH_SUCCESS',
     AUTH_FAILURE = '@auth/AUTH_FAILURE',
 }

 /**
  * Data types
  */

export interface Auth {
    id?: number
    nome?: string
    token?: string
}

export interface LoginData {
    user: string
    password: string
}

/**
 * State type
 */
export interface AuthState {
    readonly data: Auth
    readonly loading: boolean
    readonly error: boolean
}