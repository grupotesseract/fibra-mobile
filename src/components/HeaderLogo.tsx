import React from 'react';
import { Box, Center } from 'native-base';
import Logo from './Logo';

const HeaderLogo = () => {
  return (
    <Center>
      <Box safeAreaTop />
      <Logo size='xlg' />
    </Center>
  );
};

export default HeaderLogo;
