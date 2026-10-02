import React from 'react';
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Plato } from '../data/platos';
import { colores, diseno, movimiento, radio } from '../tema/tokens';

interface Props {
  plato: Plato;
  // foto: ocupa el ancho disponible en 4:3. miniatura: cuadrado chico para las filas.
  variante?: 'foto' | 'miniatura';
  // Esquinas redondeadas propias (cuando la foto no está recortada por una tarjeta)
  redondeada?: boolean;
  // La foto acompaña a un texto que ya dice el nombre del plato: los lectores de pantalla la saltean
  decorativa?: boolean;
  estilo?: StyleProp<ViewStyle>;
}

// Foto de un plato. La proporción es fija para que el contenido no salte cuando la imagen carga;
// mientras tanto se ve el fondo hundido del sistema de diseño.
export const ImagenPlato: React.FC<Props> = ({
  plato,
  variante = 'foto',
  redondeada = false,
  decorativa = false,
  estilo,
}) => (
  <View
    style={[styles.marco, variante === 'miniatura' ? styles.miniatura : styles.foto, redondeada && styles.redondeada, estilo]}
    accessibilityElementsHidden={decorativa}
    importantForAccessibility={decorativa ? 'no-hide-descendants' : 'auto'}
    aria-hidden={decorativa}
  >
    <Image
      source={plato.imagen}
      contentFit="cover"
      transition={movimiento.imagen}
      style={styles.imagen}
      accessible={!decorativa}
      accessibilityLabel={decorativa ? undefined : plato.nombre}
      // En la web la etiqueta sale del texto alternativo; vacío para las decorativas
      alt={decorativa ? '' : plato.nombre}
    />
  </View>
);

const styles = StyleSheet.create({
  marco: {
    backgroundColor: colores.superficieHundida,
    overflow: 'hidden',
  },
  foto: {
    width: '100%',
    aspectRatio: diseno.proporcionFoto,
  },
  miniatura: {
    width: diseno.miniatura,
    height: diseno.miniatura,
    borderRadius: radio.control,
    borderCurve: 'continuous',
  },
  redondeada: {
    borderRadius: radio.destacado,
    borderCurve: 'continuous',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
});
