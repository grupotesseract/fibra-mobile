import { action } from 'typesafe-actions';
import { PlantaTypes, Planta } from './types';

export const setPlantaAtiva = (data: Planta) => action(PlantaTypes.SET, { data })
export const setTodosMateriaisItem = ({ idItem, todosMateriais }) => action(PlantaTypes.SET_TODOS_MATERIAIS_ITEM, { idItem, todosMateriais })
