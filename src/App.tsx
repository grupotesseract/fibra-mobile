import React from "react";
import { Root } from "native-base";
import { createDrawerNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

import Login from './screens/Login/Login';
import Menu from './screens/Menu/Menu';
import SelecionaPlanta from './screens/SelecionaPlanta';

const AuthStack = createSwitchNavigator(
  { 
    Login: { screen: Login }, 
    Menu: { screen: Menu }, 
    SelecionaPlanta: { screen: SelecionaPlanta }, 
  },
  {
    // headerMode: 'none',
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(AuthStack);

export default () =>
  <Root>
    <AppContainer />
</Root>;