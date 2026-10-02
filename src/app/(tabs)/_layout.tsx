import React from 'react';
import { Tabs } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useComedor } from '../../context/ComedorContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colores, espacio } from '../../tema/tokens';

// Alto de la barra de pestañas sin contar el margen inferior seguro
const ALTO_BARRA = 60;

export default function LayoutTabs() {
  const { carrito, usuario, colaPedidosArray } = useComedor();
  const conSesion = usuario !== null;
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colores.marca,
        tabBarInactiveTintColor: colores.tintaSecundaria,
        // Alto suficiente para ícono + etiqueta, más el margen inferior seguro del dispositivo
        tabBarStyle: { height: ALTO_BARRA + insets.bottom, paddingTop: espacio.xs },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          tabBarBadge: carrito.length > 0 ? carrito.length : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
        }}
      />

      {/* Desafío opcional: la pestaña Cocina solo existe con sesión iniciada */}
      <Tabs.Protected guard={conSesion}>
        <Tabs.Screen
          name="personal"
          options={{
            title: 'Cocina',
            tabBarBadge: colaPedidosArray.length > 0 ? colaPedidosArray.length : undefined,
            tabBarIcon: ({ color, size }) => <Ionicons name="fast-food-outline" size={size} color={color} />,
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
