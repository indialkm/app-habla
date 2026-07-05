import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/Header';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { cadastrarFeedback } from '../services/feedbackService';
import { FeedbackTipo, Setor, SetorFiltro } from '../types/Feedback';
import { globalStyles, theme } from '../styles/theme';

const setores: SetorFiltro[] = ['RH', 'FISCAL', 'TI', 'JURIDICO', 'TODOS'];
const notas = ['😡', '😢', '😯', '😐', '🙂', '😌', '😍'];
const tipos: FeedbackTipo[] = ['reclamacao', 'elogio', 'sugestao'];

export function FazerFeedback({ navigation }: any) {
  const { user } = useAuth();
  const [setor, setSetor] = useState<SetorFiltro>('RH');
  const [mensagem, setMensagem] = useState('');
  const [anonimo, setAnonimo] = useState(false);
  const [nota, setNota] = useState(0);
  const [tipo, setTipo] = useState<FeedbackTipo>('elogio');
  const [loading, setLoading] = useState(false);

  async function enviar() {
    try {
      if (!user) {
        Alert.alert('Erro', 'Faça login novamente.');
        return;
      }

      if (setor === 'TODOS') {
        Alert.alert('Calma aí', 'Escolha um setor específico para enviar o feedback.');
        return;
      }

      if (!mensagem.trim()) {
        Alert.alert('Calma aí', 'Escreve uma mensagem primeiro.');
        return;
      }

      if (!nota) {
        Alert.alert('Calma aí', 'Escolha uma nota com os emojis.');
        return;
      }

      setLoading(true);

      await cadastrarFeedback({
        usuarioId: user.id,
        setor: setor as Setor,
        mensagem: mensagem.trim(),
        anonimo,
        nota,
        tipo
      });

      Alert.alert('Sucesso', 'Feedback enviado!');
      setMensagem('');
      setAnonimo(false);
      setNota(0);
      setTipo('elogio');
      setSetor('RH');
      navigation.navigate('MeusFeedbacks');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível enviar o feedback.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={globalStyles.screen}>
      <Header onMenu={() => navigation.openDrawer()} />

      <View style={styles.setorRow}>
        <Text style={styles.bold}>Setor</Text>
        <View style={styles.setorBox}>
          {setores.map((s) => (
            <TouchableOpacity key={s} onPress={() => setSetor(s)}>
              <Text style={[styles.setor, setor === s && styles.activeSetor]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Feedback</Text>

        <Text style={styles.label}>Anônimo</Text>
        <View style={styles.switchRow}>
          <Switch value={anonimo} onValueChange={setAnonimo} />
          <Text style={styles.switchText}>{anonimo ? 'Ligado' : 'Desligado'}</Text>
        </View>

        <Text style={styles.label}>Qual o seu nível de satisfação com o setor?</Text>
        <View style={styles.emojiRow}>
          {notas.map((emoji, index) => (
            <TouchableOpacity key={emoji} onPress={() => setNota(index + 1)}>
              <Text style={[styles.emoji, nota === index + 1 && styles.selectedEmoji]}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Nos deixe saber suas ideias</Text>
        <TextInput
          value={mensagem}
          onChangeText={setMensagem}
          multiline
          placeholder="Digite seu feedback..."
          placeholderTextColor="#777"
          style={styles.textarea}
        />
      </View>

      <View style={styles.tipoRow}>
        {tipos.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setTipo(item)}
            style={[styles.chip, tipo === item && styles.chipActive]}
          >
            <Text style={tipo === item ? styles.chipTextActive : styles.chipText}>
              {item === 'reclamacao' ? 'Reclamação' : item === 'elogio' ? 'Elogio' : 'Sugestão'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.send} onPress={enviar} disabled={loading}>
        <Text style={styles.sendText}>{loading ? 'Enviando...' : 'Enviar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    right: 24,
    top: 22
  },
  setorRow: {
    flexDirection: 'row',
    marginLeft: 4,
    marginTop: 12,
    alignItems: 'flex-start',
    gap: 8
  },
  bold: {
    fontWeight: '800',
    marginTop: 8,
    color: theme.colors.text
  },
  setorBox: {
    backgroundColor: theme.colors.grayBox,
    width: 155,
    padding: 6
  },
  setor: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 11,
    marginVertical: 3
  },
  activeSetor: {
    color: theme.colors.dark
  },
  card: {
    backgroundColor: theme.colors.dark,
    marginTop: 8,
    borderRadius: 34,
    padding: 28
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 14
  },
  label: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 8
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  switchText: {
    color: '#fff',
    fontSize: 10
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginVertical: 10
  },
  emoji: {
    fontSize: 18
  },
  selectedEmoji: {
    transform: [{ scale: 1.3 }]
  },
  textarea: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    minHeight: 96,
    padding: 12,
    marginTop: 8,
    textAlignVertical: 'top'
  },
  tipoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  chip: {
    borderWidth: 1,
    borderColor: theme.colors.dark,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3
  },
  chipActive: {
    backgroundColor: theme.colors.dark
  },
  chipText: {
    color: theme.colors.dark
  },
  chipTextActive: {
    color: '#fff'
  },
  send: {
    alignSelf: 'center',
    backgroundColor: theme.colors.dark,
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 18
  },
  sendText: {
    color: '#fff'
  }
});
