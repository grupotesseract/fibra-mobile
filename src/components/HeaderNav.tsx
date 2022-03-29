import React from 'react';
import { Box, Button, HStack, Icon, Text, View } from 'native-base';
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
        <HStack>
          <Button
            onPress={() => { navigation.goBack() }}
          >
            <Icon name='arrow-back' />
          </Button>

          <Text fontSize="xl">{title}</Text >

          {rightContent && <Box>{rightContent}</Box>}
        </HStack>
      </View>
    );
  }
}

export default withNavigation(HeaderNav);
