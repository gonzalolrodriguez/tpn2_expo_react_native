import React from 'react';
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { colores, espacio, superficie } from '../tema/tokens';

interface Props {
  children: React.ReactNode;
  estilo?: StyleProp<ViewStyle>;
}

// Lista agrupada: una sola superficie con sus filas separadas por líneas finas.
// Reemplaza al patrón de "una tarjeta con sombra por cada elemento".
export const Grupo: React.FC<Props> = ({ children, estilo }) => {
  const filas = React.Children.toArray(children);

  return (
    <View style={[styles.grupo, estilo]}>
      {filas.map((hijo, indice) => (
        <React.Fragment key={indice}>
          {indice > 0 ? <View style={styles.separador} /> : null}
          {hijo}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grupo: {
    ...superficie,
    overflow: 'hidden',
  },
  separador: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colores.separador,
    marginLeft: espacio.lg,
  },
});
