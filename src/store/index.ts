import { createStore, applyMiddleware, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'
import { AuthState } from './ducks/auth/types'
import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga'
import { EmpresasState } from './ducks/empresas/types';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export interface ApplicationState {
    auth: AuthState,
    empresas: EmpresasState
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store)
export { store, persistor };