import { createStore, applyMiddleware, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import { AuthState } from './ducks/auth/types'
import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga'
import { EmpresasState } from './ducks/empresas/types';
import { AsyncStorage } from 'react-native';
import { UsuariosState } from './ducks/usuarios/types';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export interface ApplicationState {
    auth: AuthState,
    usuariosReducer: UsuariosState,
    empresas: EmpresasState,
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store)

export { store, persistor };
