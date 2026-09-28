import React from 'react';
import { Stack } from 'expo-router';

export default function LayoutCarritoStack() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#2563eb' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="index" options={{ title: 'Mi Carrito de Compras' }} />
      <Stack.Screen
        name="nota"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.9],
          title: 'Nota para la cocina',
        }}
      />
    </Stack>
  );
}
