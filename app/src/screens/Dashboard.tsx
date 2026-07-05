import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../components/Header';
import { PieChartSimple } from '../components/PieChartSimple';
import { listarFeedbacks } from '../services/feedbackService';
import { Feedback } from '../types/Feedback';
import { globalStyles, theme } from '../styles/theme';

export function Dashboard({ navigation }: any) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        setLoading(true);
        const dados = await listarFeedbacks();
        setFeedbacks(dados);
        setLoading(false);
      }

      carregar();
    }, [])
  );

  const reclamacoes = feedbacks.filter((f) => f.tipo === 'reclamacao').length;
  const elogios = feedbacks.filter((f) => f.tipo === 'elogio').length;
  const sugestoes = feedbacks.filter((f) => f.tipo === 'sugestao').length;

  return (
    <View style={globalStyles.screen}>
      <View style={styles.headerRow}>
        <Header onMenu={() => navigation.openDrawer()} showLogo={false} />
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <Text style={styles.contentLabel}>Content</Text>
      <Text style={styles.reportTitle}>Relatório 1</Text>

      {loading ? (
        <ActivityIndicator color={theme.colors.dark} style={styles.loading} />
      ) : (
        <>
          <PieChartSimple reclamacoes={reclamacoes} elogios={elogios} sugestoes={sugestoes} />

          <View style={styles.legend}>
            <Text style={styles.legendText}>😡 Reclamações: {reclamacoes}</Text>
            <Text style={styles.legendText}>😍 Elogios: {elogios}</Text>
            <Text style={styles.legendText}>🙂 Sugestões: {sugestoes}</Text>
          </View>

          <Text style={styles.feedbackTitle}>feedbacks</Text>
          <View style={styles.totalBox}>
            <Text style={styles.total}>{feedbacks.length}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  headerTitle: {
    fontSize: 32,
    color: theme.colors.text
  },
  contentLabel: {
    marginLeft: 42,
    color: '#fff',
    fontSize: 11
  },
  reportTitle: {
    marginLeft: 42,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 18,
    color: '#000'
  },
  loading: {
    marginTop: 70
  },
  legend: {
    alignSelf: 'center',
    marginTop: 10
  },
  legendText: {
    color: theme.colors.text,
    fontWeight: '700'
  },
  feedbackTitle: {
    marginTop: 22,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 4,
    color: '#000'
  },
  totalBox: {
    borderWidth: 1,
    borderColor: '#000',
    width: 128,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6
  },
  total: {
    fontSize: 64,
    fontWeight: '900',
    color: '#000'
  }
});
