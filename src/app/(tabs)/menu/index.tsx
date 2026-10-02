import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { PLATOS } from '../../../data/platos';
import { Chip } from '../../../components/Chip';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { Grupo } from '../../../components/Grupo';
import { Pantalla } from '../../../components/Pantalla';
import { TarjetaPlato } from '../../../components/TarjetaPlato';
import { espacio, tipo } from '../../../tema/tokens';

const CATEGORIAS = [
  { id: 'desayuno', nombre: 'Desayunos' },
  { id: 'almuerzo', nombre: 'Almuerzos' },
  { id: 'bebidas', nombre: 'Bebidas' },
  { id: 'kiosco', nombre: 'Kiosco' },
] as const;

export default function PantallaMenu() {
  return (
    <Pantalla>
      {/* Accesos a cada categoría. La fila se extiende hasta los bordes de la pantalla al desplazar. */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityLabel="Categorías del menú"
        style={styles.categorias}
        contentContainerStyle={styles.categoriasContenido}
      >
        {CATEGORIAS.map((cat) => (
          <Link key={cat.id} href={`/categorias/${cat.id}`} asChild>
            <Chip titulo={cat.nombre} />
          </Link>
        ))}
      </ScrollView>

      {CATEGORIAS.map((cat) => {
        const platosCat = PLATOS.filter((p) => p.categoria === cat.id);
        return (
          <View key={cat.id} style={styles.seccion}>
            <Text style={tipo.titulo} accessibilityRole="header">
              {cat.nombre}
            </Text>
            <Grupo>
              {platosCat.map((plato) => (
                <TarjetaPlato key={plato.id} plato={plato} />
              ))}
            </Grupo>
          </View>
        );
      })}

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
  seccion: {
    // Más aire arriba del título que debajo: el título pertenece a su lista
    marginTop: espacio.sm,
    gap: espacio.sm,
  },
});
