import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fila, tipo } from '../tema/tokens';

interface Props {
  titulo: string;
  // Segunda línea opcional, debajo del título
  detalle?: string;
  // Dato alineado a la derecha: precio, cantidad, hora
  valor?: string;
  // Para la fila de total: el título pasa a peso fuerte
  fuerte?: boolean;
}

// Fila de solo lectura para usar dentro de <Grupo>: una etiqueta y su dato.
// El dato usa cifras tabulares para que precios y contadores queden alineados.
export const FilaDato: React.FC<Props> = ({ titulo, detalle, valor, fuerte = false }) => (
  <View style={styles.fila}>
    <View style={styles.textos}>
      <Text style={fuerte ? tipo.cuerpoFuerte : tipo.cuerpo}>{titulo}</Text>
      {detalle ? <Text style={tipo.nota}>{detalle}</Text> : null}
    </View>
    {valor ? <Text style={tipo.precio}>{valor}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  fila: {
    ...fila,
  },
  textos: {
    flex: 1,
  },
});
