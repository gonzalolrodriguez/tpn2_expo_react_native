import React from 'react';
import { Text, View, ViewStyle, StyleSheet, PressableProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plato } from '../data/platos';
import { ImagenPlato } from './ImagenPlato';
import { Presionable } from './Presionable';
import { colores, diseno, espacio, radio, sombra, tipo } from '../tema/tokens';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  // Plato del que sale la foto
  plato: Plato;
  titulo: string;
  detalle?: string;
  // Proporción ancho/alto de la tarjeta. Por defecto, la de las fotos.
  proporcion?: number;
  // Ubicación dentro del layout padre. Debe ser un objeto plano.
  contenedor?: ViewStyle;
}

// Tarjeta donde manda la foto: ocupa toda la superficie y el texto va encima, sobre un velo oscuro.
// Está pensada como hijo de <Link asChild>, que le agrega el destino y el rol de enlace.
export const TarjetaFoto = React.forwardRef<View, Props>(
  ({ plato, titulo, detalle, proporcion = diseno.proporcionFoto, contenedor, ...resto }, ref) => (
    <Presionable ref={ref} contenedor={contenedor} estilo={styles.tarjeta} {...resto}>
      {/* Decorativa: el texto de la tarjeta ya dice qué es */}
      <ImagenPlato plato={plato} decorativa estilo={{ aspectRatio: proporcion }} />
      {/* Único uso de degradado sobre contenido: garantiza el contraste del texto sobre cualquier foto */}
      <LinearGradient colors={[colores.veloInicio, colores.veloFin]} style={styles.velo} />
      <View style={styles.textos}>
        <Text style={[tipo.subtitulo, styles.titulo]} numberOfLines={2}>
          {titulo}
        </Text>
        {detalle ? (
          <Text style={[tipo.nota, styles.detalle]} numberOfLines={2}>
            {detalle}
          </Text>
        ) : null}
      </View>
    </Presionable>
  ),
);

TarjetaFoto.displayName = 'TarjetaFoto';

const styles = StyleSheet.create({
  tarjeta: {
    borderRadius: radio.tarjeta,
    borderCurve: 'continuous',
    overflow: 'hidden',
    backgroundColor: colores.superficieHundida,
    boxShadow: sombra.tarjeta,
  },
  velo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: diseno.altoVelo,
  },
  textos: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: espacio.lg,
  },
  titulo: {
    color: colores.sobreMarca,
  },
  detalle: {
    color: colores.crema,
  },
});
