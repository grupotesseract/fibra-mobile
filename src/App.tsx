import React from "react";
import { Root } from "native-base";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from './screens/Login/Login';
import Menu from './screens/Menu/Menu';
import SelecionaPlanta from './screens/SelecionaPlanta';
import ConfirmarPeriodoManutencao from './screens/ConfirmarPeriodoManutencao';
import LiberarDocumento from './screens/LiberarDocumento';
import MenuVistoria from "./screens/MenuVistoria/MenuVistoria";
import Estoque from "./screens/Estoque/Estoque";
import EntradaMateriais from "./screens/EntradaMateriais/EntradaMateriais";
import ManutencaoIluminacao from "./screens/ManutencaoIluminacao/ManutencaoIluminacao";
import ComentariosGerais from "./screens/ComentariosGerais/ComentariosGerais";
import ManutencaoItem from "./screens/ManutencaoIluminacao/ManutencaoItem";
import FotosItem from "./screens/FotosItem/FotosItem";

const AuthStack = createStackNavigator(
  { 
    Login: { screen: Login }, 
    Menu: { screen: Menu }, 
    MenuVistoria: { screen: MenuVistoria }, 
    Estoque: { screen: Estoque }, 
    EntradaMateriais: { screen: EntradaMateriais }, 
    ManutencaoIluminacao: { screen: ManutencaoIluminacao },
    ManutencaoItem: { screen: ManutencaoItem },
    FotosItem: { screen: FotosItem },
    ComentariosGerais: { screen: ComentariosGerais },
    SelecionaPlanta: { screen: SelecionaPlanta }, 
    ConfirmarPeriodoManutencao: { screen: ConfirmarPeriodoManutencao }, 
    LiberarDocumento: { screen: LiberarDocumento }, 
  },
  {
    headerMode: 'none',
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(AuthStack);

export default () =>
  <Root> 
    <AppContainer />
</Root>;