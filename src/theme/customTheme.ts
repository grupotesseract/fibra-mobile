import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#e8ecff',
      100: '#c0c5f5',
      200: '#979fe9',
      300: '#6d79de',
      400: '#4552d4',
      500: '#1d2781',
      600: '#1d2781',
      700: '#161f69',
      800: '#0b1341',
      900: '#04051b',
    },
    // Redefinig only one shade, rest of the color will remain same.
    mainColors: {
      primary: '#1d2781',
    },
    fontConfig: {
      OpenSans: {
        100: { normal: 'OpenSans_Light' },
        200: { normal: 'OpenSans_Light' },
        300: { normal: 'OpenSans_Light' },
        400: { normal: 'OpenSans' },
        500: { normal: 'OpenSans' },
        600: { normal: 'OpenSans' },
        700: { normal: 'OpenSans_SemiBold' },
        800: { normal: 'OpenSans_SemiBold' },
        900: { normal: 'OpenSans_SemiBold' },
      },
    },
    fonts: {
      heading: 'OpenSans',
      body: 'OpenSans',
      mono: 'OpenSans',
    },
  },
  components: {
    Input: {
      defaultProps: {
        size: 'md',
        variant: 'underlined',
      },
    },
  },
});

export default customTheme;
