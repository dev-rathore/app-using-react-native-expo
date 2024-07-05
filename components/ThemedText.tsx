import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'text4xl' | 'text3xl' | 'text2xl' | 'textXl' | 'textLg' | 'textBase' | 'textSm' | 'textXs';
  fontWeight?: 'fontBold' | 'fontMedium' | 'fontRegular' | 'fontLight';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  fontWeight = 'fontRegular',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'text4xl' ? styles['text4xl'] : undefined,
        type === 'text3xl' ? styles['text3xl'] : undefined,
        type === 'text2xl' ? styles['text2xl'] : undefined,
        type === 'textXl' ? styles['textXl'] : undefined,
        type === 'textLg' ? styles['textLg'] : undefined,
        type === 'textBase' ? styles['textBase'] : undefined,
        type === 'textSm' ? styles['textSm'] : undefined,
        type === 'textXs' ? styles['textXs'] : undefined,
        fontWeights[fontWeight],
        style,
      ]}
      {...rest}
    />
  );
}

export const fontWeights = StyleSheet.create({
  fontBold: {
    fontWeight: 'bold',
  },
  fontMedium: {
    fontWeight: '500',
  },
  fontRegular: {
    fontWeight: '400',
  },
  fontLight: {
    fontWeight: '300',
  },
});

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  'text4xl': {
    fontSize: 32,
    lineHeight: 32,
  },
  'text3xl': {
    fontSize: 30,
    lineHeight: 32,
  },
  'text2xl': {
    fontSize: 24,
    lineHeight: 32,
  },
  'textXl': {
    fontSize: 20,
    lineHeight: 28,
  },
  'textLg': {
    fontSize: 18,
    lineHeight: 28,
  },
  'textBase': {
    fontSize: 16,
    lineHeight: 24,
  },
  'textSm': {
    fontSize: 14,
    lineHeight: 20,
  },
  'textXs': {
    fontSize: 12,
    lineHeight: 16,
  },
});
