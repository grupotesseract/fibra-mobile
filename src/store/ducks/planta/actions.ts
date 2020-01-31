import { action } from 'typesafe-actions';
import { PlantaTypes, Planta } from './types';

export const setPlantaAtiva = (data: Planta) => action(PlantaTypes.SET, { data })