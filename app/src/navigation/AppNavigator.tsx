import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SideMenu } from '../components/SideMenu';
import { useAuth } from '../context/AuthContext';
import { Login } from '../screens/Login';
import { Cadastro } from '../screens/Cadastro';
import { MeusFeedbacks } from '../screens/MeusFeedbacks';
import { FazerFeedback } from '../screens/FazerFeedback';
import { FeedbackDetalhe } from '../screens/FeedbackDetalhe';
import { Dashboard } from '../screens/Dashboard';
import { Relatorio } from '../screens/Relatorio';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}

function DrawerRoutes() {
  const { isAdmin } = useAuth();

  return (
    <Drawer.Navigator
      initialRouteName="MeusFeedbacks"
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 255 }
      }}
    >
      <Drawer.Screen name="MeusFeedbacks" component={MeusFeedbacks} />
      <Drawer.Screen name="FazerFeedback" component={FazerFeedback} />
      {isAdmin && <Drawer.Screen name="Relatorio" component={Relatorio} />}
      {isAdmin && <Drawer.Screen name="Dashboard" component={Dashboard} />}
    </Drawer.Navigator>
  );
}

function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={DrawerRoutes} />
      <Stack.Screen name="FeedbackDetalhe" component={FeedbackDetalhe} />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  const { user, loading } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
