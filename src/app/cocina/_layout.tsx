import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useComedor } from '../../context/ComedorContext';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function LayoutCocinaDrawer() {
  const { cerrarSesion } = useComedor();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: '#16a34a' },
        headerTintColor: '#ffffff',
        drawerActiveTintColor: '#16a34a',
        headerRight: () => (
          <Pressable style={styles.btnLogout} onPress={cerrarSesion}>
            <Text style={styles.btnLogoutText}>Cerrar Sesión 🚪</Text>
          </Pressable>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Pedidos en Cola',
          drawerLabel: 'Pedidos Activos',
          drawerIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="atendidos"
        options={{
          title: 'Historial de Atendidos',
          drawerLabel: 'Pedidos Atendidos (Pila)',
          drawerIcon: ({ color, size }) => <Ionicons name="checkmark-done" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  btnLogout: {
    marginRight: 12,
    backgroundColor: '#15803d',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  btnLogoutText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
