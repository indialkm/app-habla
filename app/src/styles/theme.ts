import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    background: '#d9d9d9',
    dark: '#2d2d2d',
    menu: '#5b5b5b',
    text: '#24242c',
    muted: '#5f5f68',
    input: '#2d2d2d',
    white: '#ffffff',
    soft: '#f7f0f8',
    grayBox: '#b8b8b8',
    danger: '#ff3b35',
    happy: '#8ec84a',
    warning: '#ffd34f',
    sad: '#46b8f2'
  },
  spacing: {
    page: 24,
    radius: 18
  }
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.page
  },
  input: {
    backgroundColor: theme.colors.input,
    color: theme.colors.white,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    minHeight: 38
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 4,
    color: theme.colors.text
  }
});
