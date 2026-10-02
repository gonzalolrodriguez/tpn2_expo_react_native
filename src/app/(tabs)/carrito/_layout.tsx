import React from 'react';
import { Stack } from 'expo-router';
import { opcionesHeader } from '../../../tema/tokens';

export default function LayoutCarritoStack() {
  return (
    <Stack screenOptions={opcionesHeader}>
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
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
