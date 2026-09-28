import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { PLATOS } from '../data/platos';
import { TarjetaPlato } from '../components/TarjetaPlato';
import { DondeEstoy } from '../components/DondeEstoy';

const CATEGORIAS = ['todas', 'desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export default function PantallaBuscar() {
  const params = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const queryText = params.q || '';
  const categoriaSeleccionada = params.categoria || 'todas';

  const handleSearchTextChange = (text: string) => {
    // Actualiza los parámetros en la URL sin apilar pantallas
    router.setParams({ q: text });
  };

  const handleCategoriaChange = (cat: string) => {
    router.setParams({ categoria: cat === 'todas' ? '' : cat });
  };

  // Filtrado dinámico
  const resultados = PLATOS.filter((plato) => {
    const coincideTexto =
      plato.nombre.toLowerCase().includes(queryText.toLowerCase()) ||
      plato.descripcion.toLowerCase().includes(queryText.toLowerCase());

    const coincideCat =
      categoriaSeleccionada === 'todas' || !categoriaSeleccionada || plato.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCat;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>🔍 Buscador de Platos</Text>

      {/* Input de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o ingrediente..."
        value={queryText}
        onChangeText={handleSearchTextChange}
      />

      {/* Filtro por Categorías */}
      <Text style={styles.subtitulo}>Filtrar por categoría:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {CATEGORIAS.map((cat) => {
          const activa = (categoriaSeleccionada || 'todas') === cat;
          return (
            <Pressable
              key={cat}
              style={[styles.chipCat, activa && styles.chipCatActiva]}
              onPress={() => handleCategoriaChange(cat)}
            >
              <Text style={[styles.chipText, activa && styles.chipTextActivo]}>
                {cat.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Resultados */}
      <Text style={styles.resultadosTitulo}>
        Resultados ({resultados.length}):
      </Text>

      {resultados.length === 0 ? (
        <View style={styles.noResultados}>
          <Text style={styles.noResultadosText}>
            No se encontraron platos que coincidan con la búsqueda.
          </Text>
        </View>
      ) : (
        resultados.map((plato) => <TarjetaPlato key={plato.id} plato={plato} />)
      )}

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
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1e293b',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 8,
  },
  catScroll: {
    marginBottom: 16,
  },
  chipCat: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 6,
  },
  chipCatActiva: {
    backgroundColor: '#2563eb',
  },
  chipText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: 'bold',
  },
  chipTextActivo: {
    color: '#ffffff',
  },
  resultadosTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  noResultados: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  noResultadosText: {
    color: '#64748b',
    fontSize: 14,
  },
});
