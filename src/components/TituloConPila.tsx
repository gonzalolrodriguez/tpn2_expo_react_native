import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ColorValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { colores, espacio, radio, tamanioIcono, tipo } from '../tema/tokens';

interface Props {
  children: string;
  // Lo envía el header (es el color de los controles). El título usa la tinta del sistema de diseño.
  tintColor?: ColorValue;
}

// Título de header que agrega cuántas pantallas tiene apiladas el Stack
export const TituloConPila: React.FC<Props> = ({ children }) => {
  const navigation = useNavigation();
  const [enPila, setEnPila] = useState(() => navigation.getState()?.routes.length ?? 1);

  useEffect(() => {
    const actualizar = () => setEnPila(navigation.getState()?.routes.length ?? 1);
    actualizar();
    // El evento "state" avisa cada vez que se apila o se desapila una pantalla
    return navigation.addListener('state', actualizar);
  }, [navigation]);

  return (
    <View style={styles.contenedor}>
      <Text style={[tipo.subtitulo, styles.titulo]} numberOfLines={1}>
        {children}
      </Text>
      <View
        style={styles.pila}
        accessible
        accessibilityLabel={enPila === 1 ? '1 pantalla en la pila' : `${enPila} pantallas en la pila`}
      >
        <Ionicons name="layers-outline" size={tamanioIcono.sm} color={colores.tintaSecundaria} />
        <Text style={[tipo.nota, styles.cantidad]}>{enPila}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.sm,
  },
  titulo: {
    flexShrink: 1,
  },
  pila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.xs,
    paddingHorizontal: espacio.sm,
    paddingVertical: espacio.xs,
    borderRadius: radio.pildora,
    backgroundColor: colores.superficieHundida,
  },
  cantidad: {
    fontVariant: ['tabular-nums'],
  },
});
