import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { PLATOS } from '../../../data/platos';
import { TarjetaPlato } from '../../../components/TarjetaPlato';
import { DondeEstoy } from '../../../components/DondeEstoy';

const CATEGORIAS = [
  { id: 'desayuno', nombre: 'Desayunos ☕' },
  { id: 'almuerzo', nombre: 'Almuerzos 🍲' },
  { id: 'bebidas', nombre: 'Bebidas 🥤' },
  { id: 'kiosco', nombre: 'Kiosco 🍫' },
];

export default function PantallaMenu() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitulo}>Categorías rápidas:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {CATEGORIAS.map((cat) => (
          <Link key={cat.id} href={`/categorias/${cat.id}`} style={styles.chipCat}>
            <Text style={styles.chipText}>{cat.nombre}</Text>
          </Link>
        ))}
      </ScrollView>

      {CATEGORIAS.map((cat) => {
        const platosCat = PLATOS.filter((p) => p.categoria === cat.id);
        return (
          <View key={cat.id} style={styles.seccion}>
            <View style={styles.seccionHeader}>
              <Text style={styles.tituloSeccion}>{cat.nombre}</Text>
              <Link href={`/categorias/${cat.id}`}>
                <Text style={styles.verMas}>Ver todo →</Text>
              </Link>
            </View>
            {platosCat.map((plato) => (
              <TarjetaPlato key={plato.id} plato={plato} />
            ))}
          </View>
        );
      })}

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
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '600',
  },
  catScroll: {
    marginBottom: 16,
  },
  chipCat: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  seccion: {
    marginBottom: 20,
  },
  seccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  verMas: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: 'bold',
  },
});
