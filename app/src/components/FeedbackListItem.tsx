import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feedback } from '../types/Feedback';
import { theme } from '../styles/theme';

interface FeedbackListItemProps {
  feedback: Feedback;
  index: number;
  onPress: () => void;
}

const labels = {
  reclamacao: 'Reclamação',
  elogio: 'Elogio',
  sugestao: 'Sugestão'
};

export function FeedbackListItem({ feedback, index, onPress }: FeedbackListItemProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Ionicons name="star-outline" size={28} color={theme.colors.muted} />
      <View style={styles.info}>
        <Text style={styles.title}>Feedback {index + 1}</Text>
        <Text style={styles.subtitle}>{labels[feedback.tipo]} • {feedback.setor}</Text>
      </View>
      <Ionicons name="caret-forward" size={22} color={theme.colors.muted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 18
  },
  info: {
    flex: 1
  },
  title: {
    fontSize: 24,
    color: theme.colors.text
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: theme.colors.muted
  }
});
