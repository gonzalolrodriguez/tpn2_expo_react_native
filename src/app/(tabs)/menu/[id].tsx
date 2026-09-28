import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { PLATOS } from '../../../data/platos';
import { useComedor } from '../../../context/ComedorContext';
import { DondeEstoy } from '../../../components/DondeEstoy';

export default function PantallaDetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useComedor();

  const idNumerico = Number(id);
  const plato = PLATOS.find((p) => p.id === idNumerico);

  if (!id || isNaN(idNumerico) || !plato) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ title: 'Plato no encontrado' }} />
        <Text style={styles.errorText}>⚠️ El plato solicitado no existe o el ID es inválido ({id}).</Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Actualiza dinámicamente el título del header */}
      <Stack.Screen options={{ title: plato.nombre }} />

      <View style={styles.badgeCategoria}>
        <Text style={styles.textCategoria}>{plato.categoria.toUpperCase()}</Text>
      </View>

      <Text style={styles.nombre}>{plato.nombre}</Text>
      <Text style={styles.precio}>${plato.precio.toLocaleString('es-AR')}</Text>

      <View style={styles.divider} />

      <Text style={styles.label}>Descripción del plato:</Text>
      <Text style={styles.descripcion}>{plato.descripcion}</Text>

      <Pressable style={styles.btnAgregar} onPress={() => agregarAlCarrito(plato)}>
        <Text style={styles.btnText}>🛒 Agregar al carrito</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  badgeCategoria: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  textCategoria: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  precio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
    marginBottom: 24,
  },
  btnAgregar: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
