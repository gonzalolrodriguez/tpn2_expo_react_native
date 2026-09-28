import React from 'react';
import { Stack } from 'expo-router';

export default function LayoutMenuStack() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#2563eb' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="index" options={{ title: 'Menú de Platos' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalle del Plato' }} />
    </Stack>
  );
}
