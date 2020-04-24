import React from "react";
import { Root } from "native-base";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";

import Login from './screens/Login/Login';
import Menu from './screens/Menu/Menu';
import SelecionaPlanta from './screens/SelecionaPlanta/SelecionarPlanta';
import SelecionaPlantaRDO from './screens/RDO/SelecionaPlanta/SelecionarPlanta';
import RDOLiberarDocumentoEquipe from './screens/RDO/LiberarDocumento/EquipeLiberacao';
import RDOLiberarDocumentoRegistro from './screens/RDO/LiberarDocumento/RegistroLiberacao';
import ConfirmarPeriodoManutencao from './screens/ConfirmarPeriodoManutencao';
import LiberarDocumento from './screens/LiberarDocumento';
import MenuVistoria from "./screens/MenuVistoria/MenuVistoria";
import EstoqueScreen from "./screens/Estoque/Estoque";
import EntradaMateriais from "./screens/EntradaMateriais/EntradaMateriais";
import ManutencaoIluminacao from "./screens/ManutencaoIluminacao/ManutencaoIluminacao";
import ScanQRCodeReader from "./screens/ManutencaoIluminacao/ScanQRCodeReader";
import ComentariosGerais from "./screens/ComentariosGerais/ComentariosGerais";
import ManutencaoItem from "./screens/ManutencaoIluminacao/ManutencaoItem";
import Colaboradores from "./screens/Colaboradores/Colaboradores";
import { store, persistor } from "./store";
import SyncEmpresas from "./screens/SyncEmpresas/SyncEmpresas";
import Programacoes from "./screens/Programacoes/Programacoes";
import FotosItemScreen from "./screens/FotosItem/FotosItem";
import MenuRDO from "./screens/RDO/MenuRDO/MenuRDO";
import MenuPrincipalRDO from "./screens/RDO/MenuRDO/MenuPrincipalRDO";
import SincronizacaoRDO from "./screens/RDO/Sincronizacao/Sincronizacao";
import ComentariosRDO from "./screens/RDO/Comentarios/Comentarios";
import FotosRDO from "./screens/RDO/FotosRDO/FotosRDO";
import ManutencaoCliente from "./screens/Cliente/ManutencaoCliente/ManutencaoCliente";
import ManutencaoClienteComentarios from "./screens/Cliente/Comentarios/Comentarios";
import AtividadesRealizadas from "./screens/RDO/AtividadesRealizadas/AtividadesRealizadas";
import EditaAtividade from "./screens/RDO/AtividadesRealizadas/EditaAtividade";

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    Menu: { screen: Menu },
    MenuVistoria: { screen: MenuVistoria },
    Estoque: { screen: EstoqueScreen },
    EntradaMateriais: { screen: EntradaMateriais },
    ManutencaoIluminacao: { screen: ManutencaoIluminacao },
    ScanQRCodeReader: { screen: ScanQRCodeReader },
    ManutencaoItem: { screen: ManutencaoItem },
    FotosItem: { screen: FotosItemScreen },
    ComentariosGerais: { screen: ComentariosGerais },
    SelecionaPlanta: { screen: SelecionaPlanta },
    ConfirmarPeriodoManutencao: { screen: ConfirmarPeriodoManutencao },
    LiberarDocumento: { screen: LiberarDocumento },
    Colaboradores: { screen: Colaboradores },
    SyncEmpresas: { screen: SyncEmpresas },
    Programacoes: { screen: Programacoes },
    SelecionaPlantaRDO: { screen: SelecionaPlantaRDO },
    RDOLiberarDocumentoEquipe: { screen: RDOLiberarDocumentoEquipe },
    RDOLiberarDocumentoRegistro: { screen: RDOLiberarDocumentoRegistro },
    MenuRDO: { screen: MenuRDO },
    ComentariosRDO: { screen: ComentariosRDO },
    FotosRDO: { screen: FotosRDO },
    ManutencaoCliente: { screen: ManutencaoCliente },
    ManutencaoClienteComentarios: { screen: ManutencaoClienteComentarios },
    AtividadesRealizadas: { screen: AtividadesRealizadas },
    EditaAtividade: { screen: EditaAtividade },
    MenuPrincipalRDO: { screen: MenuPrincipalRDO },
    SincronizacaoRDO: { screen: SincronizacaoRDO },
  },
  {
    headerMode: 'none',
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(AuthStack);

export default () =>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root>
        <AppContainer />
      </Root>
    </PersistGate>
  </Provider>;
