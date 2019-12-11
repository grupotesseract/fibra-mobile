import { Reducer } from 'redux';
import { PlantaTypes, PlantaState } from './types';

const INITIAL_STATE: PlantaState = {
    plantaAtiva: {
        id: 0,
        liberacoesDocumento: [],
    },
}

const plantaReducer: Reducer<PlantaState> = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case PlantaTypes.CONFIRMAR_PERIODO_MANUTENCAO:
            return { 
                ...state, 
                plantaAtiva: {
                    ...state.plantaAtiva,
                    proximaProgramacao: {
                        ...state.plantaAtiva.proximaProgramacao,
                        data_inicio_real: action.payload.date,
                    }
                }, 
            };
        case PlantaTypes.LIBERAR_DOCUMENTO:
            const liberacoesDocumento = state.plantaAtiva.liberacoesDocumento || [];
            return { 
                ...state, 
                plantaAtiva: {
                    ...state.plantaAtiva,
                    liberacoesDocumento: [
                        ...liberacoesDocumento,
                        {
                            data_hora: action.payload.data_hora,
                            usuarios: action.payload.usuarios,
                        } 
                    ]
                }, 
            };
        case PlantaTypes.SET:
            return { 
                ...state, plantaAtiva: action.payload.data, 
            };
        default:
            return state;
    }
}

export default plantaReducer;