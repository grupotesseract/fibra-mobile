import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { QRCodeReader } from '../../components/QRCodeReader';

import { ActivityIndicator, View } from 'react-native';

interface ScanProps {
  navigation: NavigationScreenProp<any, any>;
}

type ScanState = {
  isFocused: boolean;
};

type Props = ScanProps;

class ScanQRCodeReader extends Component<Props, ScanState> {
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
        <View contentContainerStyle={styles.container} style={styles.spinner}>
          <ActivityIndicator color='blue' size='large' />
        </View>
      );
    }
    return <QRCodeReader navigation={navigation} />;
  }
}

const styles = {
  container: {
    flexGrow: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ScanQRCodeReader;
