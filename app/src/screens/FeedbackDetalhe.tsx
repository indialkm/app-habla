import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BackButton } from '../components/BackButton';
import { buscarFeedbackPorId, excluirFeedback } from '../services/feedbackService';
import { Feedback } from '../types/Feedback';
import { globalStyles, theme } from '../styles/theme';
import { useAuth } from '../context/AuthContext';

const tipoLabel = {
  elogio: 'Positive',
  reclamacao: 'Reclamação',
  sugestao: 'Sugestão'
};

const emojisPorNota = ['😡', '😢', '😯', '😐', '🙂', '😌', '😍'];

export function FeedbackDetalhe({ navigation }: any) {
  const route = useRoute<any>();
  const { isAdmin } = useAuth();
  const { id } = route.params;
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    const dado = await buscarFeedbackPorId(Number(id));
    setFeedback(dado);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [id])
  );

  async function apagar() {
    if (!feedback) return;

    Alert.alert('Apagar feedback', 'Tem certeza que deseja apagar este feedback?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: async () => {
          await excluirFeedback(feedback.id);
          navigation.goBack();
        }
      }
    ]);
  }

  if (loading || !feedback) {
    return (
      <View style={[globalStyles.screen, styles.center]}>
        <ActivityIndicator color={theme.colors.dark} />
      </View>
    );
  }

  const emoji = emojisPorNota[Math.max(feedback.nota - 1, 0)] || '🙂';
  const dataFormatada = new Date(feedback.data).toLocaleDateString('pt-BR');

  return (
    <View style={[globalStyles.screen, styles.screen]}>
      <BackButton />

      <View style={styles.hero}>
        <View style={styles.fakeShapeOne} />
        <View style={styles.fakeShapeTwo} />
        <View style={styles.fakeShapeThree} />
        <Text style={styles.heroTitle}>{tipoLabel[feedback.tipo]}</Text>
        <Text style={styles.heroEmoji}>{emoji}</Text>
        <Text style={styles.heroSubtitle}>Section header</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Feedback {feedback.id}</Text>
        <Text style={styles.date}>{dataFormatada} • {feedback.setor}</Text>
        <Text style={styles.author}>{feedback.usuario?.name || 'Anônimo'}</Text>

        {isAdmin && (
          <TouchableOpacity style={styles.trashButton} onPress={apagar}>
            <Ionicons name="trash-outline" size={42} color={theme.colors.dark} />
          </TouchableOpacity>
        )}

        <Text style={styles.message}>"{feedback.mensagem}"</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
    backgroundColor: theme.colors.soft
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hero: {
    height: 250,
    backgroundColor: '#d1ccd4',
    justifyContent: 'flex-end',
    padding: 12,
    overflow: 'hidden'
  },
  fakeShapeOne: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#a9a5ae',
    top: 55,
    right: 70,
    transform: [{ rotate: '6deg' }]
  },
  fakeShapeTwo: {
    position: 'absolute',
    width: 74,
    height: 74,
    borderRadius: 26,
    backgroundColor: '#a9a5ae',
    top: 58,
    left: 112,
    transform: [{ rotate: '55deg' }]
  },
  fakeShapeThree: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#a9a5ae',
    top: 130,
    left: 72
  },
  heroTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800'
  },
  heroEmoji: {
    fontSize: 80,
    marginTop: 4
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 12
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingTop: 16
  },
  title: {
    fontSize: 34,
    color: theme.colors.text
  },
  date: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.muted
  },
  author: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 4
  },
  trashButton: {
    marginTop: 8,
    padding: 6
  },
  message: {
    marginTop: 46,
    fontSize: 12,
    textAlign: 'center',
    color: theme.colors.text
  }
});
