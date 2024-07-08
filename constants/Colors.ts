/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#1e2124';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    background: '#fff',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    text: '#11181C',
    tint: tintColorLight,
    accent300: '#EEEEEE',
  },
  dark: {
    background: '#1e2124',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    text: '#ECEDEE',
    tint: tintColorDark,
    accent300: '#282b30',
  },
  common: {
    dark: '#1e2124',
    gray: '#9BA1A6',
    gray100: '#424549',
    gray200: '#36393e',
    gray300: '#282b30',
    green: '#21A179',
    lightPurple: '#7289da',
    primary: '#3D348B',
    secondary: '#C42847',
    white: '#ffffff',
    yellow: '#E6AF2E',
  }
};
