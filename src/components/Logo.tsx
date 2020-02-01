import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { View } from 'native-base'

const Logo = (props) => {
  let size = logoSize[props.size]
  let style = props.center ? {
    alignSelf: 'center', ...size
  } : size

  return (
    <View>
      <Image
        style={style}
        resizeMode='center'
        source={require('../../assets/fibra-logo.png')}
      />
    </View>
  )
}

export default Logo

const logoSize = StyleSheet.create({
  lg: { width: 224, height: 120 },
  md: { width: 146, height: 78 },
  sm: { width: 104, height: 56 },
  xs: { width: 90, height: 48 }
})
