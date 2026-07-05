import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from './Logo';
import { theme } from '../styles/theme';

interface HeaderProps {
  onMenu?: () => void;
  showLogo?: boolean;
}

export function Header({ onMenu, showLogo = true }: HeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenu} style={styles.menuButton}>
        <Ionicons name="menu" size={42} color={theme.colors.menu} />
      </TouchableOpacity>

      {showLogo && <Logo small />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuButton: {
    paddingRight: 12,
    paddingVertical: 4
  }
});
