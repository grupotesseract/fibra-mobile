import { action } from 'typesafe-actions';
import { PlantaTypes, Planta } from './types';

export const liberarDocumentoPlanta = (data_hora: Date, usuarios: number[]) => action(PlantaTypes.LIBERAR_DOCUMENTO, { data_hora, usuarios })
export const confirmaPeriodoPlanta = (date: Date) => action(PlantaTypes.CONFIRMAR_PERIODO_MANUTENCAO, { date })
export const setPlantaAtiva = (data: Planta) => action(PlantaTypes.SET, { data })