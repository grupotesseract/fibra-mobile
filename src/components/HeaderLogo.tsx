import React from 'react';
import { Box } from 'native-base';
import { Platform, StatusBar, StyleSheet } from 'react-native';

import Logo from './Logo';

const HeaderLogo = () => {
  return (
    <Box>
      <Box safeAreaTop bg="#6200ee" />
      <Logo size='xlg' />
    </Box>
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
