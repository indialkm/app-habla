import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { theme } from '../styles/theme';
import { useAuth } from '../context/AuthContext';

export function SideMenu(props: DrawerContentComponentProps) {
  const { signOut, isAdmin } = useAuth();

  const go = (screen: string) => props.navigation.navigate(screen as never);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => go('MeusFeedbacks')} style={styles.item}>
        <Text style={styles.itemText}>Home</Text>
        <View style={styles.underline} />
      </TouchableOpacity>

      {isAdmin && (
        <TouchableOpacity onPress={() => go('Dashboard')} style={styles.item}>
          <Text style={styles.itemText}>Dashboard Feedbacks</Text>
          <View style={styles.underline} />
        </TouchableOpacity>

      )}

      {isAdmin && (
        <TouchableOpacity onPress={() => go('Relatorio')} style={styles.item}>
          <Text style={styles.itemText}>Ver feedbacks geral</Text>
          <View style={styles.underline} />
        </TouchableOpacity>

      )}

      <TouchableOpacity onPress={() => go('FazerFeedback')} style={styles.item}>
        <Text style={styles.itemText}>Fazer um Feedback</Text>
        <View style={styles.underline} />
      </TouchableOpacity>

  
      <TouchableOpacity onPress={signOut} style={[styles.item, styles.logout]}>
        <Text style={styles.itemText}>Sair</Text>
        <View style={styles.underline} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.menu,
    paddingTop: 160,
    paddingHorizontal: 28
  },
  item: {
    marginBottom: 28
  },
  itemText: {
    color: '#fff',
    fontSize: 19
  },
  underline: {
    marginTop: 6,
    width: 80,
    height: 8,
    backgroundColor: '#efefef'
  },
  logout: {
    marginTop: 'auto',
    marginBottom: 44
  }
});
