import { action } from 'typesafe-actions';
import { ProgramacoesTypes, ProgramacaoRealizada } from './types';

export const addProgramacao = (programacaoRealizada: ProgramacaoRealizada) => action(ProgramacoesTypes.ADD, { programacaoRealizada })
export const liberarDocumentoPlanta = (idProgramacao: number, now: Date, usuarios: number[]) => action(ProgramacoesTypes.LIBERAR_DOCUMENTO, { idProgramacao, now, usuarios })
export const confirmaPeriodoProgramacao = (idProgramacao: number, dataInicioReal: Date) => action(ProgramacoesTypes.CONFIRMA_PERIODO, { idProgramacao, dataInicioReal })
export const updateProgramacao = (programacaoRealizada: ProgramacaoRealizada) => action(ProgramacoesTypes.UPDATE, { programacaoRealizada })