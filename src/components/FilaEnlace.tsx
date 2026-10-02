import React from 'react';
import { Text, View, StyleSheet, PressableProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Presionable } from './Presionable';
import { colores, fila, tamanioIcono, tipo } from '../tema/tokens';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  icono: keyof typeof Ionicons.glyphMap;
  titulo: string;
  descripcion?: string;
}

// Fila de navegación para usar dentro de <Grupo>: ícono, título, descripción y chevron.
// Está pensada como hijo de <Link asChild>, que le agrega el destino y el rol de enlace.
// Al tocarla se resalta el fondo: es una fila de ancho completo, no se achica como un botón.
export const FilaEnlace = React.forwardRef<View, Props>(({ icono, titulo, descripcion, ...resto }, ref) => (
  <Presionable ref={ref} respuesta="resaltado" estilo={styles.fila} {...resto}>
    <Ionicons name={icono} size={tamanioIcono.lg} color={colores.marca} />
    <View style={styles.textos}>
      <Text style={tipo.cuerpoFuerte}>{titulo}</Text>
      {descripcion ? <Text style={tipo.nota}>{descripcion}</Text> : null}
    </View>
    <Ionicons name="chevron-forward-outline" size={tamanioIcono.sm} color={colores.tintaSecundaria} />
  </Presionable>
));

FilaEnlace.displayName = 'FilaEnlace';

const styles = StyleSheet.create({
  fila: {
    ...fila,
  },
  textos: {
    flex: 1,
  },
});
