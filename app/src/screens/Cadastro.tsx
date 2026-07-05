import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../components/BackButton';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { globalStyles, theme } from '../styles/theme';

export function Cadastro() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCadastro() {
    try {
      if (!name.trim() || !email.trim() || !senha.trim()) {
        Alert.alert('Calma aí', 'Preencha nome, e-mail e senha.');
        return;
      }

      setLoading(true);
      await signUp(name.trim(), email.trim(), senha.trim());
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível criar cadastro.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[globalStyles.screen, styles.container]}>
      <BackButton />

      <View style={styles.logoArea}>
        <Logo small />
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.label}>Nome :</Text>
          <TextInput value={name} onChangeText={setName} style={[globalStyles.input, styles.input]} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[globalStyles.input, styles.input]}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput value={senha} onChangeText={setSenha} secureTextEntry style={[globalStyles.input, styles.input]} />
        </View>

        <TouchableOpacity style={[styles.button, globalStyles.shadow]} onPress={handleCadastro} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22
  },
  logoArea: {
    position: 'absolute',
    right: 24,
    top: 24
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    gap: 26
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18
  },
  label: {
    width: 54,
    fontSize: 11,
    color: theme.colors.text
  },
  input: {
    width: 160
  },
  button: {
    backgroundColor: theme.colors.dark,
    paddingVertical: 8,
    width: 96,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 11
  }
});
