import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, usePathname, Stack } from 'expo-router';
import { DondeEstoy } from '../components/DondeEstoy';

export default function PantallaNotFound() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Error 404' }} />

      <Text style={styles.icono}>🔍 404</Text>
      <Text style={styles.titulo}>Pantalla no encontrada</Text>
      <Text style={styles.subtitulo}>
        La ruta ingresada <Text style={styles.path}>"{pathname}"</Text> no existe en esta aplicación.
      </Text>

      <Link href="/" style={styles.btnInicio}>
        <Text style={styles.btnText}>🏠 Ir al Inicio</Text>
      </Link>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  icono: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  path: {
    fontWeight: 'bold',
    color: '#dc2626',
  },
  btnInicio: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
