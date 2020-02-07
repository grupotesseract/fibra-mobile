import { Header, Left, Right, Text, View } from 'native-base'
import React from 'react'
import { Platform, StatusBar } from 'react-native'

import Logo from './Logo'

const HeaderLogo = () => {
  return (
    <View style={style.view}>
      <Header transparent>
        <Left>
          <Logo size="xs" />
        </Left>

        <Right>
          <Text style={style.text}>Serviços Especializados de Engenharia</Text>
        </Right>
      </Header>
    </View>
  )
}

const style = {
  view: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    fontFamily: 'OpenSans_Light',
    fontSize: 13,
  }
}

export default HeaderLogo
