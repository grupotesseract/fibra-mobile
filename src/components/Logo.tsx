import React, { Component } from 'react'
import { Image, Dimensions } from 'react-native'

export default class Logo extends Component {
  render() {
    return (
      <Image
        resizeMode='cover'
        source={require('../../assets/fibra-logo.png')} />
    )
  }
}
