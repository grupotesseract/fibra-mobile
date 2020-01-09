import React from 'react'
import { Header, Body, View } from 'native-base'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaa',
    paddingTop: 20,
    marginBottom: 10
  }
})

const HeaderLogo = () => {
  return (
    <View style={styles.container}>
      <Header transparent style={{ backgroundColor: 'white' }}>
        <Body>
        </Body>
      </Header>
    </View>
  )
}

export default HeaderLogo
