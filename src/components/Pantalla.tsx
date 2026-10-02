import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colores, contenidoPantalla, espacio } from '../tema/tokens';

interface Props {
  children: React.ReactNode;
  // Pestañas sin header (Inicio, Cocina): el contenido arranca debajo de la barra de estado
  sinHeader?: boolean;
}

// Raíz desplazable de todas las pantallas: mismo fondo, mismo relleno y mismo ritmo vertical.
// El relleno y el gap van en contentContainerStyle para que el contenido no se recorte al desplazar.
export const Pantalla: React.FC<Props> = ({ children, sinHeader = false }) => {
  const margenes = useSafeAreaInsets();

  // En iOS el ajuste automático ya suma el margen inferior; en Android y web lo sumamos a mano
  // porque el contenido se dibuja de borde a borde.
  const rellenoInferior = espacio.lg + (Platform.OS === 'ios' ? 0 : margenes.bottom);

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={[
        styles.contenido,
        { paddingBottom: rellenoInferior },
        sinHeader && { paddingTop: margenes.top + espacio.lg },
      ]}
      // Sin header el margen superior se aplica a mano (arriba), así que se desactiva el ajuste
      // automático para no sumarlo dos veces en iOS.
      contentInsetAdjustmentBehavior={sinHeader ? 'never' : 'automatic'}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    ...contenidoPantalla,
  },
});
