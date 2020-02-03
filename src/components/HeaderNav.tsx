import { Body, Button, Header, Icon, Left, Title, View } from 'native-base'
import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { withNavigation } from 'react-navigation'

interface Props {
  navigation: any,
  title: string
}

class HeaderNav extends React.Component<Props> {
  render() {
    return (
      <View style={styles.view}>
        <Header>
          <Left>
            <Button
              hasText
              onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>

          <Body>
            <Title>{this.props.title}</Title>
          </Body>
        </Header>
      </View>
    )
  }
}

export default withNavigation(HeaderNav)

const styles = {
  view: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
}
