import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import { Button, NativeBaseProvider, Text, Box } from 'native-base'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import AppRoutes from './src/App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store'
import { LogBox } from 'react-native'
import customTheme from './src/theme/customTheme'



const App = () => {
  const [isReady, setIsReady] = useState(false)


  useEffect(() => {
    async function carregaFontes() {
      await Font.loadAsync({
        OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
        OpenSans_Light: require('./assets/fonts/OpenSans-Light.ttf'),
        OpenSans_SemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
        ...Ionicons.font,
      })
      setIsReady(true)
      console.log('app carregado');

    }
    carregaFontes()
  }, [])

  if (!isReady) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={customTheme}>
          <AppRoutes />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
