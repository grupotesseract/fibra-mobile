import React from "react";
import { Box } from "native-base";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

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
import AtividadesPendentes from "./screens/RDO/AtividadesPendentes/AtividadesPendentes";
import TodosMateriaisItem from "./screens/ManutencaoIluminacao/TodosMateriaisItem";
import brandColors from "./theme/brandColors";


const AuthStack = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { headerShown: false } },
    Menu: { screen: Menu, navigationOptions: { headerShown: false } },
    MenuVistoria: { screen: MenuVistoria },
    Estoque: { screen: EstoqueScreen },
    EntradaMateriais: { screen: EntradaMateriais, navigationOptions: {} },
    ManutencaoIluminacao: { screen: ManutencaoIluminacao },
    ScanQRCodeReader: { screen: ScanQRCodeReader },
    ManutencaoItem: { screen: ManutencaoItem },
    FotosItem: { screen: FotosItemScreen },
    ComentariosGerais: { screen: ComentariosGerais },
    SelecionaPlanta: { screen: SelecionaPlanta, navigationOptions: { title: 'Selecionar Planta' } },
    ConfirmarPeriodoManutencao: { screen: ConfirmarPeriodoManutencao },
    LiberarDocumento: { screen: LiberarDocumento },
    Colaboradores: { screen: Colaboradores },
    SyncEmpresas: { screen: SyncEmpresas, navigationOptions: { title: 'Sincronizar Empresas' } },
    Programacoes: { screen: Programacoes, navigationOptions: { title: 'Programações' } },
    SelecionaPlantaRDO: { screen: SelecionaPlantaRDO, navigationOptions: { title: 'Selecionar Planta' } },
    RDOLiberarDocumentoEquipe: { screen: RDOLiberarDocumentoEquipe },
    RDOLiberarDocumentoRegistro: { screen: RDOLiberarDocumentoRegistro },
    MenuRDO: { screen: MenuRDO },
    ComentariosRDO: { screen: ComentariosRDO },
    FotosRDO: { screen: FotosRDO },
    ManutencaoCliente: { screen: ManutencaoCliente },
    ManutencaoClienteComentarios: { screen: ManutencaoClienteComentarios },
    AtividadesRealizadas: { screen: AtividadesRealizadas },
    EditaAtividade: { screen: EditaAtividade },
    MenuPrincipalRDO: { screen: MenuPrincipalRDO, navigationOptions: { headerShown: false } },
    SincronizacaoRDO: { screen: SincronizacaoRDO, navigationOptions: { title: 'Sincronizar RDOs' } },
    AtividadesPendentes: { screen: AtividadesPendentes },
    TodosMateriaisItem: { screen: TodosMateriaisItem },
  },
  {
    initialRouteName: "Login",
    headerMode: "screen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: brandColors.primary,
      },
      headerTintColor: '#fff',
    },
  }
);

const AppContainer = createAppContainer(AuthStack);

export default () => {
  return (
    <Box flex={1}>
      <AppContainer />
    </Box>

  )
}
