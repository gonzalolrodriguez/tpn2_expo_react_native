import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores, espacio, radio, tamanioIcono, tipo } from '../tema/tokens';

interface Props {
  nota: string;
  titulo?: string;
}

// Aclaración del alumno para la cocina. El ámbar se reserva para esto en toda la app.
export const NotaCocina: React.FC<Props> = ({ nota, titulo = 'Nota para la cocina' }) => (
  <View style={styles.nota}>
    <Ionicons name="chatbox-ellipses-outline" size={tamanioIcono.md} color={colores.aviso} />
    <View style={styles.textos}>
      <Text style={[tipo.cuerpoFuerte, styles.titulo]}>{titulo}</Text>
      <Text selectable style={tipo.cuerpo}>
        {nota}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  nota: {
    flexDirection: 'row',
    gap: espacio.md,
    padding: espacio.lg,
    backgroundColor: colores.avisoSuave,
    borderRadius: radio.tarjeta,
    borderCurve: 'continuous',
  },
  textos: {
    flex: 1,
  },
  titulo: {
    color: colores.aviso,
  },
});
