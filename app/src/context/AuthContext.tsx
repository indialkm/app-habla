import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { loginUsuario, cadastrarUsuario } from '../services/authService';
import { User } from '../types/User';

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (name: string, email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const USER_KEY = '@habla:user';
const TOKEN_KEY = '@habla:token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem(USER_KEY),
          AsyncStorage.getItem(TOKEN_KEY)
        ]);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } finally {
        setLoading(false);
      }
    }

    carregarSessao();
  }, []);

  async function salvarSessao(usuario: User, novoToken: string) {
    setUser(usuario);
    setToken(novoToken);

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(usuario));
    await AsyncStorage.setItem(TOKEN_KEY, novoToken);
  }

  async function signIn(email: string, senha: string) {
    const response = await loginUsuario(email, senha);
    await salvarSessao(response.usuario, response.token);
  }

  async function signUp(name: string, email: string, senha: string) {
    await cadastrarUsuario({ name, email, senha });
    await signIn(email, senha);
  }

  async function signOut() {
  setUser(null);
  setToken(null);

  await Promise.all([
    AsyncStorage.removeItem(USER_KEY),
    AsyncStorage.removeItem(TOKEN_KEY),
  ]);
}

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
