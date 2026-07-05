import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../components/Header';
import { FeedbackListItem } from '../components/FeedbackListItem';
import { listarFeedbacks } from '../services/feedbackService';
import { Feedback, SetorFiltro } from '../types/Feedback';
import { globalStyles, theme } from '../styles/theme';

const setores: SetorFiltro[] = ['TODOS', 'RH', 'FISCAL', 'TI', 'JURIDICO'];

export function Relatorio({ navigation }: any) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [setor, setSetor] = useState<SetorFiltro>('TODOS');

  async function carregar() {
    const dados = await listarFeedbacks();
    setFeedbacks(dados);
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  const filtrados = setor === 'TODOS'
    ? feedbacks
    : feedbacks.filter((f) => f.setor === setor);

  function exportarJson() {
    const json = JSON.stringify(filtrados, null, 2);

    if (Platform.OS === 'web') {
      const webDocument = (globalThis as any).document;
      const webURL = (globalThis as any).URL;
      const WebBlob = (globalThis as any).Blob;

      if (webDocument && webURL && WebBlob) {
        const blob = new WebBlob([json], { type: 'application/json' });
        const url = webURL.createObjectURL(blob);
        const a = webDocument.createElement('a');
        a.href = url;
        a.download = 'feedbacks-habla.json';
        a.click();
        webURL.revokeObjectURL(url);
        return;
      }
    }

    Alert.alert('JSON gerado', json.slice(0, 700));
  }

  return (
    <View style={globalStyles.screen}>
      <View style={styles.topRow}>
        <Header onMenu={() => navigation.openDrawer()} showLogo={false} />
        <Text style={styles.title}>Relatório</Text>
      </View>

      <View style={styles.filtersRow}>
        <View>
          <Text style={styles.label}>Setor</Text>
          <View style={styles.selectBox}>
            <Text style={styles.selectText}>{setor}</Text>
          </View>
        </View>

        <Ionicons name="filter-outline" size={46} color={theme.colors.dark} />

        <TouchableOpacity style={styles.exportButton} onPress={exportarJson}>
          <Text style={styles.exportText}>Exportar em JSON</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chipsRow}>
        {setores.map((s) => (
          <TouchableOpacity key={s} style={[styles.chip, setor === s && styles.chipActive]} onPress={() => setSetor(s)}>
            <Text style={setor === s ? styles.chipTextActive : styles.chipText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.description}>
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
      </Text>
      <Text style={styles.contentLabel}>Content</Text>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <FeedbackListItem
            feedback={item}
            index={index}
            onPress={() => navigation.navigate('FeedbackDetalhe', { id: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum feedback encontrado.</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  title: {
    fontSize: 36,
    color: theme.colors.text
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8
  },
  label: {
    color: theme.colors.text,
    fontSize: 12,
    marginBottom: 2
  },
  selectBox: {
    backgroundColor: '#fff',
    borderRadius: 6,
    minWidth: 92,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  selectText: {
    color: theme.colors.text,
    fontSize: 12
  },
  exportButton: {
    backgroundColor: theme.colors.menu,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10
  },
  exportText: {
    color: '#fff',
    fontSize: 10
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10
  },
  chip: {
    borderWidth: 1,
    borderColor: theme.colors.dark,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  chipActive: {
    backgroundColor: theme.colors.dark
  },
  chipText: {
    color: theme.colors.dark,
    fontSize: 10
  },
  chipTextActive: {
    color: '#fff',
    fontSize: 10
  },
  description: {
    marginTop: 34,
    marginHorizontal: 26,
    fontSize: 11,
    color: theme.colors.text
  },
  contentLabel: {
    marginHorizontal: 26,
    color: '#fff',
    fontSize: 11,
    marginBottom: 2
  },
  list: {
    paddingBottom: 40
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    color: theme.colors.muted
  }
});
