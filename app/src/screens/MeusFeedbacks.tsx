import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../components/Header';
import { FeedbackListItem } from '../components/FeedbackListItem';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { listarFeedbacks, listarFeedbacksDoUsuario } from '../services/feedbackService';
import { Feedback } from '../types/Feedback';
import { globalStyles, theme } from '../styles/theme';

export function MeusFeedbacks({ navigation }: any) {
  const { user, isAdmin } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

 const carregar = useCallback(async () => {
  if (!user) return;

  const dados = await listarFeedbacksDoUsuario(user.id);

  setFeedbacks(dados);
}, [user]);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function run() {
        try {
          setLoading(true);
          await carregar();
        } finally {
          if (ativo) setLoading(false);
        }
      }

      run();
      return () => {
        ativo = false;
      };
    }, [carregar])
  );

  async function onRefresh() {
    setRefreshing(true);
    await carregar();
    setRefreshing(false);
  }

  return (
    <View style={globalStyles.screen}>
      <Header onMenu={() => navigation.openDrawer()} />

     <Text style={styles.title}>Usuário</Text>

      {loading ? (
        <ActivityIndicator style={styles.loading} color={theme.colors.dark} />
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => String(item.id)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum feedback encontrado ainda.</Text>
          }
          renderItem={({ item, index }) => (
            <FeedbackListItem
              feedback={item}
              index={index}
              onPress={() => navigation.navigate('FeedbackDetalhe', { id: item.id })}
            />
          )}
        />
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('FazerFeedback')}>
        <Text style={styles.floatingText}>+ Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoArea: {
    position: 'absolute',
    right: 24,
    top: 26
  },
  title: {
    marginTop: 70,
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 4,
    fontWeight: '800',
    color: theme.colors.text
  },
  loading: {
    marginTop: 80
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 90
  },
  empty: {
    textAlign: 'center',
    color: theme.colors.muted,
    marginTop: 40
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: theme.colors.dark,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20
  },
  floatingText: {
    color: '#fff',
    fontWeight: '700'
  }
});
