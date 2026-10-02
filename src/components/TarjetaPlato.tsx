import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Animated, { useReducedMotion } from 'react-native-reanimated';
import { Plato } from '../data/platos';
import { BotonAgregar } from './BotonAgregar';
import { ImagenPlato } from './ImagenPlato';
import { estiloPresion, Presionable } from './Presionable';
import { espacio, formatoPrecio, superficie, tipo, TOQUE_MINIMO } from '../tema/tokens';

interface Props {
  plato: Plato;
  mostrarBotonAgregar?: boolean;
}

// Tarjeta de plato: la foto arriba y debajo el nombre, la descripción y el precio.
// Tocar la tarjeta abre el detalle (con <Link>); el botón circular agrega el plato al carrito
// sin salir de la lista. Son dos controles separados: el botón no está dentro del enlace.
export const TarjetaPlato: React.FC<Props> = ({ plato, mostrarBotonAgregar = true }) => {
  // La respuesta al toque la dibuja la tarjeta entera, para que el botón de agregar
  // se hunda junto con ella en lugar de quedar flotando.
  const [presionada, setPresionada] = useState(false);
  const reducido = useReducedMotion();

  return (
    <Animated.View style={[styles.tarjeta, estiloPresion(presionada, reducido)]}>
      <Link href={`/menu/${plato.id}`} asChild>
        <Presionable
          respuesta="ninguna"
          contenedor={styles.enlace}
          estilo={styles.contenido}
          accessibilityHint="Abre el detalle del plato"
          onPressIn={() => setPresionada(true)}
          onPressOut={() => setPresionada(false)}
        >
          <ImagenPlato plato={plato} />
          <View style={styles.textos}>
            <Text style={tipo.subtitulo} numberOfLines={2}>
              {plato.nombre}
            </Text>
            <Text style={tipo.nota} numberOfLines={2}>
              {plato.descripcion}
            </Text>
            {/* El pie queda pegado abajo aunque la tarjeta vecina sea más alta */}
            <View style={[styles.pie, mostrarBotonAgregar && styles.pieConBoton]}>
              <Text style={tipo.precio}>{formatoPrecio(plato.precio)}</Text>
            </View>
          </View>
        </Presionable>
      </Link>

      {mostrarBotonAgregar ? (
        <View style={styles.agregar}>
          <BotonAgregar plato={plato} />
        </View>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    ...superficie,
    // Recorta la foto con las esquinas de la tarjeta
    overflow: 'hidden',
    flexGrow: 1,
  },
  // Objeto plano: <Link asChild> lo combina con su propio style
  enlace: {
    flexGrow: 1,
  },
  contenido: {
    flexGrow: 1,
  },
  textos: {
    flexGrow: 1,
    gap: espacio.xs,
    padding: espacio.lg,
  },
  pie: {
    minHeight: TOQUE_MINIMO,
    justifyContent: 'center',
    marginTop: 'auto',
  },
  // Deja libre el lugar del botón de agregar
  pieConBoton: {
    paddingRight: TOQUE_MINIMO + espacio.sm,
  },
  agregar: {
    position: 'absolute',
    right: espacio.lg,
    bottom: espacio.lg,
  },
});
