import { Reducer } from 'redux';
import { PlantaTypes, PlantaState } from './types';

const INITIAL_STATE: PlantaState = {
    plantaAtiva: {
        id: 0,
    },
}

const plantaReducer: Reducer<PlantaState> = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case PlantaTypes.SET:
            return {
                ...state, plantaAtiva: action.payload.data,
            };
        case PlantaTypes.SET_TODOS_MATERIAIS_ITEM:
            const { idItem, todosMateriais } = action.payload;
            const { plantaAtiva } = state;
            const itens = plantaAtiva.itens.map(item => {
              if(item.id !== idItem) {
                return item
              }
              return {
                ...item,
                todosMateriais
              }
            })
            return {
                ...state,
                plantaAtiva: {
                  ...plantaAtiva,
                  itens,
                },
            };
        default:
            return state;
    }
}

export default plantaReducer;
