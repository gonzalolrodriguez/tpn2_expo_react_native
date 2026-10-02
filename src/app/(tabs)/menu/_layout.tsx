import React from 'react';
import { Stack } from 'expo-router';
import { opcionesHeader } from '../../../tema/tokens';

export default function LayoutMenuStack() {
  return (
    <Stack screenOptions={opcionesHeader}>
      <Stack.Screen name="index" options={{ title: 'Menú' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalle del plato' }} />
    </Stack>
  );
}
