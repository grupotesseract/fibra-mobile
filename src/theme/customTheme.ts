import { extendTheme } from 'native-base';
import brandColors from './brandColors';
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
    // cinza para botões desabilitados
    trueGray: {
      300: brandColors.disabled,
    },
    //set brand colors for specif uses
    brand: brandColors,
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
    Icon: {
      defaultProps: {
        size: 7,
      },
    },
    Text: {
      defaultProps: {
        fontSize: 'md',
      },
    },
    Divider: {
      baseStyle: {
        bg: brandColors.disabled,
      },
    },
  },
});

export default customTheme;
