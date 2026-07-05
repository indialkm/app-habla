import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';

export function BackButton() {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={theme.colors.dark} />
      <Text style={styles.text}>Voltar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8
  },
  text: {
    color: theme.colors.dark,
    fontWeight: '700'
  }
});
