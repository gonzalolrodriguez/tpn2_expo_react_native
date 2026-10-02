import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';
import { colores, espacio, radio, tamanioIcono, tipo } from '../tema/tokens';

const DEBUG = true; // Se puede cambiar a false para ocultar

export const DondeEstoy: React.FC = () => {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  // Los hooks se llaman siempre; recién después se decide si se muestra
  if (!DEBUG) return null;

  return (
    <View style={styles.panel}>
      <View style={styles.encabezado}>
        <Ionicons name="navigate-outline" size={tamanioIcono.sm} color={colores.tintaSecundaria} />
        <Text style={[tipo.nota, styles.fuerte]}>Inspector de ruta (debug)</Text>
      </View>
      <Text selectable style={[tipo.nota, styles.codigo]}>
        <Text style={styles.fuerte}>Pathname: </Text>
        {pathname}
      </Text>
      <Text selectable style={[tipo.nota, styles.codigo]}>
        <Text style={styles.fuerte}>Segments: </Text>
        {JSON.stringify(segments)}
      </Text>
      <Text selectable style={[tipo.nota, styles.codigo]}>
        <Text style={styles.fuerte}>Params: </Text>
        {JSON.stringify(params)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Panel secundario: superficie hundida y sin sombra, para que no compita con el contenido
  panel: {
    gap: espacio.xs,
    padding: espacio.md,
    backgroundColor: colores.superficieHundida,
    borderRadius: radio.control,
    borderCurve: 'continuous',
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.xs,
  },
  codigo: {
    // Monoespaciada a propósito: lo que se muestra son rutas y JSON
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }),
  },
  fuerte: {
    fontWeight: tipo.cuerpoFuerte.fontWeight,
  },
});
