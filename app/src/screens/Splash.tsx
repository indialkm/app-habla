import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Logo } from '../components/Logo';
import { theme } from '../styles/theme';

export function Splash() {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
