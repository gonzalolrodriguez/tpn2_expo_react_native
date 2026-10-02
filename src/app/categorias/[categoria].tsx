import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { PLATOS } from '../../data/platos';
import { Boton } from '../../components/Boton';
import { DondeEstoy } from '../../components/DondeEstoy';
import { EstadoVacio } from '../../components/EstadoVacio';
import { Grupo } from '../../components/Grupo';
import { Pantalla } from '../../components/Pantalla';
import { TarjetaPlato } from '../../components/TarjetaPlato';
import { espacio, tipo } from '../../tema/tokens';

const CATEGORIAS_VALIDAS = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export default function PantallaCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  const catNormalizada = (categoria || '').toLowerCase();
  const esValida = CATEGORIAS_VALIDAS.includes(catNormalizada);

  if (!esValida) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Categoría no encontrada' }} />
        <EstadoVacio
          icono="alert-circle-outline"
          titulo="Esa categoría no existe"
          mensaje={`"${categoria}" no está en el menú. Las categorías son desayuno, almuerzo, bebidas y kiosco.`}
        >
          <Link href="/menu" asChild>
            <Boton titulo="Ver el menú" />
          </Link>
        </EstadoVacio>
        <DondeEstoy />
      </Pantalla>
    );
  }

  const platosFiltrados = PLATOS.filter((p) => p.categoria === catNormalizada);
  const tituloFormatted = catNormalizada.charAt(0).toUpperCase() + catNormalizada.slice(1);

  return (
    <Pantalla>
      {/* El nombre de la categoría ya está en el header: no se repite en la página */}
      <Stack.Screen options={{ title: tituloFormatted }} />

      <Text style={[tipo.nota, styles.cantidad]}>
        {platosFiltrados.length === 1 ? '1 opción disponible' : `${platosFiltrados.length} opciones disponibles`}
      </Text>

      <Grupo>
        {platosFiltrados.map((plato) => (
          <TarjetaPlato key={plato.id} plato={plato} />
        ))}
      </Grupo>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  cantidad: {
    fontVariant: ['tabular-nums'],
    // El contador pertenece a la lista: se acerca a ella
    marginBottom: -espacio.sm,
  },
});
