import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { PLATOS } from '../../data/platos';
import { TarjetaPlato } from '../../components/TarjetaPlato';
import { DondeEstoy } from '../../components/DondeEstoy';

const CATEGORIAS_VALIDAS = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export default function PantallaCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  const catNormalizada = (categoria || '').toLowerCase();
  const esValida = CATEGORIAS_VALIDAS.includes(catNormalizada);

  if (!esValida) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ title: 'Categoría no encontrada' }} />
        <Text style={styles.errorText}>
          ⚠️ La categoría "{categoria}" no existe. Las categorías disponibles son: desayuno, almuerzo, bebidas, kiosco.
        </Text>
        <DondeEstoy />
      </View>
    );
  }

  const platosFiltrados = PLATOS.filter((p) => p.categoria === catNormalizada);
  const tituloFormatted = catNormalizada.charAt(0).toUpperCase() + catNormalizada.slice(1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: `Categoría: ${tituloFormatted}` }} />

      <Text style={styles.titulo}>Platos de {tituloFormatted}</Text>
      <Text style={styles.subtitulo}>Total de opciones disponibles: {platosFiltrados.length}</Text>

      {platosFiltrados.map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
  },
});
