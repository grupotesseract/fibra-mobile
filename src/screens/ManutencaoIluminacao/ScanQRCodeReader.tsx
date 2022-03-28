import React, { Component } from 'react';
import {
  NavigationEventSubscription,
  NavigationScreenProp,
} from 'react-navigation';
import { QRCodeReader } from '../../components/QRCodeReader';

import { ActivityIndicator } from 'react-native';
import { Spinner, View } from 'native-base';

interface ScanProps {
  navigation: NavigationScreenProp<any, any>;
}

type ScanState = {
  isFocused: boolean;
};

type Props = ScanProps;

class ScanQRCodeReader extends Component<Props, ScanState> {
  focusListener: NavigationEventSubscription;
  blurListener: NavigationEventSubscription;

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () =>
      this.setState({ isFocused: true })
    );
    this.blurListener = this.props.navigation.addListener('willBlur', () =>
      this.setState({ isFocused: false })
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.blurListener.remove();
  }

  render() {
    const { navigation } = this.props;

    if (!this.state.isFocused) {
      return (
        <View flex={1}>
          <Spinner size={'lg'} />
        </View>
      );
    }
    return <QRCodeReader navigation={navigation} />;
  }
}

export default ScanQRCodeReader;
