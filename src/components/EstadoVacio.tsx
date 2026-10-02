import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores, diseno, espacio, tamanioIcono, tipo } from '../tema/tokens';

interface Props {
  icono: keyof typeof Ionicons.glyphMap;
  titulo: string;
  mensaje: string;
  // Acción sugerida: una pantalla vacía es una invitación a hacer algo
  children?: React.ReactNode;
}

export const EstadoVacio: React.FC<Props> = ({ icono, titulo, mensaje, children }) => (
  <View style={styles.contenedor}>
    <Ionicons name={icono} size={tamanioIcono.xl} color={colores.tintaSecundaria} />
    <Text style={[tipo.subtitulo, styles.centrado]}>{titulo}</Text>
    {/* Seleccionable: en los estados de error el mensaje incluye el dato que falló */}
    <Text selectable style={[tipo.cuerpo, styles.mensaje]}>
      {mensaje}
    </Text>
    {children ? <View style={styles.accion}>{children}</View> : null}
  </View>
);

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    paddingVertical: espacio.xxl,
    paddingHorizontal: espacio.xl,
    gap: espacio.sm,
  },
  centrado: {
    textAlign: 'center',
  },
  mensaje: {
    textAlign: 'center',
    color: colores.tintaSecundaria,
  },
  // Ocupa el ancho en teléfono y queda centrada, sin estirarse, en pantallas anchas
  accion: {
    marginTop: espacio.md,
    width: '100%',
    maxWidth: diseno.anchoLectura,
  },
});
