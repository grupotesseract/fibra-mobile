import { action } from 'typesafe-actions';
import { EmpresasTypes, Empresa } from './types';

export const empresasUpdate = () => action(EmpresasTypes.UPDATE)
export const empresasLoaded = (data: Empresa[]) => action(EmpresasTypes.LOADED, { data })
export const empresasFailure = () => action(EmpresasTypes.ERROR)