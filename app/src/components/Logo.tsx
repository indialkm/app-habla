import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <View style={[styles.wrap, small && styles.smallWrap]}>
      <Text style={[styles.text, small && styles.smallText]}>HablaComigo</Text>
      <View style={[styles.tail, small && styles.smallTail]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#000',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'center',
    position: 'relative'
  },
  smallWrap: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  text: {
    color: theme.colors.white,
    fontSize: 20
  },
  smallText: {
    fontSize: 10
  },
  tail: {
    position: 'absolute',
    right: 8,
    bottom: -16,
    width: 22,
    height: 22,
    backgroundColor: '#000',
    borderBottomRightRadius: 22,
    transform: [{ rotate: '18deg' }]
  },
  smallTail: {
    width: 12,
    height: 12,
    bottom: -8,
    right: 5
  }
});
