import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDiseno } from './Diseno';
import { Escudo } from './Marca';
import { colores, diseno, espacio, radio, tipo } from '../tema/tokens';

interface Props {
  titulo: string;
  bajada: string;
}

// Bloque de marca del inicio: el escudo del instituto sobre su verde profundo.
// El fondo va de borde a borde (también debajo de la barra de estado); el contenido queda
// centrado dentro del ancho máximo, igual que el resto de la pantalla.
export const HeroMarca: React.FC<Props> = ({ titulo, bajada }) => {
  const margenes = useSafeAreaInsets();
  const { relleno } = useDiseno();

  return (
    <LinearGradient
      // Del verde del escudo al verde mar del sitio del instituto: el único degradado de marca
      colors={[colores.marcaProfunda, colores.marcaMar]}
      style={[styles.hero, { paddingTop: margenes.top + espacio.xl }]}
    >
      <View style={[styles.contenido, { maxWidth: diseno.anchoMaximo + relleno * 2, paddingHorizontal: relleno }]}>
        {/* Decorativo: el nombre del instituto está escrito al lado */}
        <Escudo decorativo />
        <View style={styles.textos}>
          <Text style={[tipo.nota, styles.sobreMarca]}>Instituto Politécnico Formosa</Text>
          <Text style={[tipo.tituloGrande, styles.sobreMarca]} accessibilityRole="header">
            {titulo}
          </Text>
          <Text style={[tipo.cuerpo, styles.sobreMarca]}>{bajada}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  hero: {
    paddingBottom: espacio.xxl,
    borderBottomLeftRadius: radio.destacado,
    borderBottomRightRadius: radio.destacado,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  contenido: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.lg,
  },
  textos: {
    flex: 1,
  },
  sobreMarca: {
    color: colores.crema,
  },
});
