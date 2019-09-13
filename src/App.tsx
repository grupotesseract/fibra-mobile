import React from "react";
import { Root } from "native-base";
import { createDrawerNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

import Login from './screens/Login/Login';

const AuthStack = createSwitchNavigator(
  { 
    Login: { screen: Login }, 
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