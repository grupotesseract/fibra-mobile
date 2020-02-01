import React from 'react'
import { Header, Left, Button, Icon, Body, Title, View } from 'native-base'
import { withNavigation } from 'react-navigation'
import { Platform, StatusBar } from 'react-native';

interface Props {
  navigation: any,
  title: string
}

class HeaderNav extends React.Component<Props> {
  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button
              hasText
              onPress={() => {this.props.navigation.goBack()}}
            >
              <Icon name='arrow-back' />
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
