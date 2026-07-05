import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Logo } from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { globalStyles, theme } from '../styles/theme';

export function Login({ navigation }: any) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      if (!email.trim() || !senha.trim()) {
        Alert.alert('Calma aí', 'Preencha e-mail e senha.');
        return;
      }

      setLoading(true);
      await signIn(email.trim(), senha.trim());
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível fazer login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[globalStyles.screen, styles.container]}>
      <View style={styles.logoArea}>
        <Logo small />
      </View>

      <View style={styles.form}>
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
          <TextInput
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            style={[globalStyles.input, styles.input]}
          />
        </View>

        <TouchableOpacity style={[styles.button, globalStyles.shadow]} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link}>Criar cadastro</Text>
        </TouchableOpacity>

        <View style={styles.hintBox}>
          <Text style={styles.hint}>Admin: carlinha@habla.com / 123</Text>
          <Text style={styles.hint}>User: user@habla.com / 123</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22
  },
  logoArea: {
    alignItems: 'flex-end',
    marginTop: 4
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
    gap: 20
  },
  label: {
    width: 52,
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
  },
  link: {
    textAlign: 'center',
    color: theme.colors.dark,
    textDecorationLine: 'underline'
  },
  hintBox: {
    alignItems: 'center',
    gap: 4
  },
  hint: {
    fontSize: 10,
    color: theme.colors.muted
  }
});
