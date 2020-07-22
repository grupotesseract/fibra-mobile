import React from 'react';
import { Header, Body, View, Left, Text, Right } from 'native-base';
import { Platform, StatusBar, StyleSheet } from 'react-native';

import Logo from './Logo';

const HeaderLogo = () => {
  return (
    <Header transparent style={styles.header}>
      <Left>
        <Logo size='xlg' />
      </Left>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'OpenSans_Light',
    fontSize: 13,
  },
});

export default HeaderLogo;
