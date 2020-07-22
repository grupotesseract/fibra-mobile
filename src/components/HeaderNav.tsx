import React from 'react';
import { Body, Button, Header, Icon, Left, Right, Title, View } from 'native-base';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

interface Props {
  navigation: any;
  title: string;
  rightContent?: any;
}

const styles = StyleSheet.create({
  view: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});

class HeaderNav extends React.Component<Props> {
  render() {
    const { navigation, rightContent, title } = this.props;
    return (
      <View style={styles.view}>
        <Header>
          <Left>
            <Button
              hasText
              onPress={() => { navigation.goBack() }}
            >
              <Icon name='arrow-back' />
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

export default withNavigation(HeaderNav);
