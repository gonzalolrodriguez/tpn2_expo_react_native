import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { PLATOS } from '../data/platos';
import { Boton } from '../components/Boton';
import { Campo } from '../components/Campo';
import { Chip } from '../components/Chip';
import { DondeEstoy } from '../components/DondeEstoy';
import { EstadoVacio } from '../components/EstadoVacio';
import { Grupo } from '../components/Grupo';
import { Pantalla } from '../components/Pantalla';
import { TarjetaPlato } from '../components/TarjetaPlato';
import { espacio, tipo } from '../tema/tokens';

const CATEGORIAS = [
  { id: 'todas', nombre: 'Todas' },
  { id: 'desayuno', nombre: 'Desayuno' },
  { id: 'almuerzo', nombre: 'Almuerzo' },
  { id: 'bebidas', nombre: 'Bebidas' },
  { id: 'kiosco', nombre: 'Kiosco' },
];

// Pasa a minúsculas y quita los signos diacríticos (á → a) para comparar textos
const normalizar = (texto: string) =>
  texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export default function PantallaBuscar() {
  const params = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const queryText = params.q || '';
  const categoriaSeleccionada = params.categoria || 'todas';

  const handleSearchTextChange = (text: string) => {
    // Actualiza los parámetros en la URL sin apilar pantallas
    router.setParams({ q: text });
  };

  const handleCategoriaChange = (cat: string) => {
    // undefined quita el parámetro de la URL en lugar de dejar "categoria=" vacío
    router.setParams({ categoria: cat === 'todas' ? undefined : cat });
  };

  const borrarBusqueda = () => {
    router.setParams({ q: undefined, categoria: undefined });
  };

  // Filtrado dinámico: sin distinguir mayúsculas ni tildes ("chipa" encuentra "Chipá")
  const buscado = normalizar(queryText);
  const resultados = PLATOS.filter((plato) => {
    const coincideTexto =
      normalizar(plato.nombre).includes(buscado) || normalizar(plato.descripcion).includes(buscado);

    const coincideCat =
      categoriaSeleccionada === 'todas' || !categoriaSeleccionada || plato.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCat;
  });

  return (
    <Pantalla>
      {/* Input de búsqueda */}
      <Campo
        etiqueta="Nombre o ingrediente"
        placeholder="Milanesa, café, alfajor"
        value={queryText}
        onChangeText={handleSearchTextChange}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />

      {/* Filtro por categorías. La fila se extiende hasta los bordes de la pantalla al desplazar. */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        accessibilityLabel="Filtrar por categoría"
        style={styles.categorias}
        contentContainerStyle={styles.categoriasContenido}
      >
        {CATEGORIAS.map((cat) => (
          <Chip
            key={cat.id}
            titulo={cat.nombre}
            seleccionado={categoriaSeleccionada === cat.id}
            onPress={() => handleCategoriaChange(cat.id)}
          />
        ))}
      </ScrollView>

      {/* Resultados */}
      {resultados.length === 0 ? (
        <EstadoVacio
          icono="search-outline"
          titulo="No encontramos platos"
          mensaje="Ningún plato coincide con la búsqueda. Probá con otra palabra o quitá el filtro de categoría."
        >
          <Boton variante="secundario" titulo="Borrar búsqueda" onPress={borrarBusqueda} />
        </EstadoVacio>
      ) : (
        <>
          <Text style={[tipo.nota, styles.cantidad]} accessibilityLiveRegion="polite">
            {resultados.length === 1 ? '1 resultado' : `${resultados.length} resultados`}
          </Text>
          <Grupo>
            {resultados.map((plato) => (
              <TarjetaPlato key={plato.id} plato={plato} />
            ))}
          </Grupo>
        </>
      )}

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  categorias: {
    // Compensa el relleno de la pantalla para que los chips no se corten antes del borde
    marginHorizontal: -espacio.lg,
    flexGrow: 0,
  },
  categoriasContenido: {
    gap: espacio.sm,
    paddingHorizontal: espacio.lg,
  },
  cantidad: {
    fontVariant: ['tabular-nums'],
    // El contador pertenece a la lista: se acerca a ella y se aleja de los filtros
    marginBottom: -espacio.sm,
  },
});
