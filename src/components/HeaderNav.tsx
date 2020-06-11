import { Body, Button, Header, Icon, Left, Title, View, Right } from 'native-base'
import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { withNavigation } from 'react-navigation'

interface Props {
  navigation: any,
  title: string,
  rightContent?: any,
}

class HeaderNav extends React.Component<Props> {
  render() {
    const { navigation, rightContent, title } = this.props;
    return (
      <View style={styles.view}>
        <Header>
          <Left>
            <Button
              hasText
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{title}</Title>
          </Body>
          {rightContent && <Right>{rightContent}</Right>}
        </Header>
      </View>
    );
  }
}

export default withNavigation(HeaderNav)

const styles = {
  view: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
}
