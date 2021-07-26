import React from 'react'
import  AppLoading from 'expo-app-loading'
import { Container, StyleProvider } from 'native-base'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import AppRoutes from './src/App'
import getTheme from './src/theme/components'
import material from './src/theme/variables/material'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store'
import { YellowBox } from 'react-native'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
      OpenSans_Light: require('./assets/fonts/OpenSans-Light.ttf'),
      OpenSans_SemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
      ...Ionicons.font,
    })
    this.setState({ isReady: true })
  }

  render() {
    YellowBox.ignoreWarnings(['Remote debugger'])

    if (!this.state.isReady) {
      return <AppLoading/>
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppRoutes/>
            </PersistGate>
          </Provider>
        </Container>
      </StyleProvider>
    )
  }
}
