import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Plato } from '../data/platos';
import { useComedor } from '../context/ComedorContext';
import { Presionable } from './Presionable';
import { colores, espacio, fila, formatoPrecio, radio, tamanioIcono, tipo, TOQUE_MINIMO } from '../tema/tokens';

interface Props {
  plato: Plato;
  mostrarBotonAgregar?: boolean;
}

// Fila de plato para usar dentro de <Grupo>. Tocar el texto abre el detalle;
// el botón de la derecha agrega el plato al carrito sin salir de la lista.
export const TarjetaPlato: React.FC<Props> = ({ plato, mostrarBotonAgregar = true }) => {
  const { agregarAlCarrito } = useComedor();

  return (
    <View style={styles.fila}>
      {/* El flex va en este View: <Link asChild> pisa el style del hijo */}
      <View style={styles.info}>
        <Link href={`/menu/${plato.id}`} asChild>
          <Presionable estilo={styles.textos} accessibilityHint="Abre el detalle del plato">
            <Text style={tipo.cuerpoFuerte}>{plato.nombre}</Text>
            <Text style={tipo.nota} numberOfLines={2}>
              {plato.descripcion}
            </Text>
            <Text style={tipo.precio}>{formatoPrecio(plato.precio)}</Text>
          </Presionable>
        </Link>
      </View>

      {mostrarBotonAgregar ? (
        <Presionable
          accessibilityRole="button"
          accessibilityLabel={`Agregar ${plato.nombre} al carrito`}
          onPress={() => agregarAlCarrito(plato)}
          estilo={styles.agregar}
        >
          <Ionicons name="add-outline" size={tamanioIcono.lg} color={colores.marca} />
        </Presionable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fila: {
    ...fila,
  },
  info: {
    flex: 1,
  },
  textos: {
    gap: espacio.xs,
  },
  agregar: {
    width: TOQUE_MINIMO,
    height: TOQUE_MINIMO,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.pildora,
    backgroundColor: colores.marcaSuave,
  },
});
