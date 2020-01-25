import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { QRCodeReader } from '../../components/QRCodeReader';

import {
  ActivityIndicator,
  View,
} from 'react-native'

interface StateProps {
  navigation: NavigationScreenProp<any, any>,
}

type Props = StateProps

class ScanQRCodeReader extends Component<Props> {

    constructor(props) {
      super(props);

      this.state = {
        isFocused: false
      };
    }

    componentDidMount() {
      this.focusListner = this.props.navigation.addListener(
        'didFocus',
        () => this.setState({ isFocused: true }),
      );
      this.blurListner = this.props.navigation.addListener(
        'willBlur',
        () => this.setState({ isFocused: false }),
      );
    }
    
    componentWillUnmount() {
      this.focusListner.remove();
      this.blurListner.remove();
    }

    render() {

      const { navigation } = this.props;

      if (!this.state.isFocused) {
        return (
          <View contentContainerStyle={styles.container} style={styles.spinner}>
            <ActivityIndicator size='large' />
          </View>
        );
      }
      return <QRCodeReader
        navigation={navigation}
          />
      
    }
}

const styles = {
  container: {
    flexGrow: 1
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default ScanQRCodeReader;