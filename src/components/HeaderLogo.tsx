import React from 'react'
import { Header, Body, View, Left, Right, Button, Icon } from 'native-base'
import { StyleSheet } from 'react-native'
import Logo from './Logo'

const HeaderLogo = () => {
  return (
    <View>
      <Header transparent>
        <Left>
          <Button onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
          {/* <Button
            transparent
            onPress={() => this.logoff()}
            style={style.btnStyle}
          >
            <Icon name="exit" />
          </Button> */}
        </Left>

        <Body>
          <Logo size="xs" />
        </Body>
      </Header>
    </View>
  )
}

export default HeaderLogo

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaa',
    paddingTop: 20,
    marginBottom: 10
  }
})

const style = {
  btnStyle: {
    marginVertical: 5,
  }
}
