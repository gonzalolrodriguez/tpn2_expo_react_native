import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useComedor } from '../../context/ComedorContext';
import { Boton } from '../../components/Boton';
import { colores, opcionesHeader } from '../../tema/tokens';

export default function LayoutCocinaDrawer() {
  const { cerrarSesion } = useComedor();

  return (
    <Drawer
      screenOptions={{
        ...opcionesHeader,
        drawerActiveTintColor: colores.marca,
        drawerInactiveTintColor: colores.tintaSecundaria,
        // Botón de texto con ícono: conserva el área táctil mínima de 48 px
        headerRight: () => (
          <Boton variante="texto" icono="log-out-outline" titulo="Cerrar sesión" onPress={cerrarSesion} />
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Pedidos en cola',
          drawerLabel: 'Pedidos en cola',
          drawerIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="atendidos"
        options={{
          title: 'Pedidos atendidos',
          drawerLabel: 'Pedidos atendidos',
          drawerIcon: ({ color, size }) => <Ionicons name="checkmark-done-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}
