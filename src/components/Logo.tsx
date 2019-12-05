import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'

const logoStyles = StyleSheet.create({
  logo: {
    // width: '100%',
    // resizeMode: 'contain',
    // flex: 1,
    // overflow: 'hidden'
  }
})

export default class Logo extends Component {
  render() {
    return (
      <Image
        style={logoStyles.logo}
        source={require('../../assets/fibra-logo.png')} />
    )
  }
}
