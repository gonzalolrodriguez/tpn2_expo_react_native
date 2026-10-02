import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { PLATOS } from '../../../data/platos';
import { Carrusel } from '../../../components/Carrusel';
import { Chip } from '../../../components/Chip';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { Pantalla } from '../../../components/Pantalla';
import { RejillaPlatos } from '../../../components/RejillaPlatos';
import { espacio, tipo } from '../../../tema/tokens';

const CATEGORIAS = [
  { id: 'desayuno', nombre: 'Desayunos' },
  { id: 'almuerzo', nombre: 'Almuerzos' },
  { id: 'bebidas', nombre: 'Bebidas' },
  { id: 'kiosco', nombre: 'Kiosco' },
] as const;

// Cada sección sabe cuántas tarjetas tiene antes, para que la entrada escalonada
// recorra el menú de arriba hacia abajo en lugar de reiniciarse en cada categoría.
const SECCIONES = CATEGORIAS.map((cat) => ({
  ...cat,
  platos: PLATOS.filter((plato) => plato.categoria === cat.id),
})).map((seccion, indice, todas) => ({
  ...seccion,
  indiceInicial: todas.slice(0, indice).reduce((acumulado, anterior) => acumulado + anterior.platos.length, 0),
}));

export default function PantallaMenu() {
  return (
    <Pantalla conBarraCarrito>
      {/* Accesos a cada categoría. La fila se extiende hasta los bordes de la pantalla al desplazar. */}
      <Carrusel etiqueta="Categorías del menú">
        {CATEGORIAS.map((cat) => (
          <Link key={cat.id} href={`/categorias/${cat.id}`} asChild>
            <Chip titulo={cat.nombre} />
          </Link>
        ))}
      </Carrusel>

      {SECCIONES.map((seccion) => (
        <View key={seccion.id} style={styles.seccion}>
          <Text style={tipo.titulo} accessibilityRole="header">
            {seccion.nombre}
          </Text>
          <RejillaPlatos platos={seccion.platos} indiceInicial={seccion.indiceInicial} />
        </View>
      ))}

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  seccion: {
    // Más aire arriba del título que debajo: el título pertenece a su rejilla
    marginTop: espacio.sm,
    gap: espacio.md,
  },
});
