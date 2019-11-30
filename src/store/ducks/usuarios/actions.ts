import { action } from 'typesafe-actions';
import { UsuariosTypes, Usuario } from './types';

export const usuariosUpdate = () => action(UsuariosTypes.UPDATE)
export const usuariosLoaded = (data: Usuario[]) => action(UsuariosTypes.LOADED, { data })
export const usuariosFailure = () => action(UsuariosTypes.ERROR)