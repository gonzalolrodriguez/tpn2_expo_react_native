import React from 'react';
import { Text, View, ViewStyle, StyleSheet, PressableProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Presionable } from './Presionable';
import { colores, espacio, radio, tipo, TOQUE_MINIMO } from '../tema/tokens';

type Variante = 'primario' | 'secundario' | 'peligro' | 'texto';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  titulo: string;
  icono?: keyof typeof Ionicons.glyphMap;
  variante?: Variante;
  contenedor?: ViewStyle;
}

const COLOR_TEXTO: Record<Variante, string> = {
  primario: colores.sobreMarca,
  secundario: colores.marca,
  peligro: colores.peligro,
  texto: colores.marca,
};

// Botón de la app. Una sola acción primaria por pantalla; el resto usa las otras variantes.
export const Boton = React.forwardRef<View, Props>(
  ({ titulo, icono, variante = 'primario', contenedor, ...resto }, ref) => (
    <Presionable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: !!resto.disabled }}
      contenedor={contenedor}
      estilo={[styles.base, styles[variante]]}
      {...resto}
    >
      {icono ? <Ionicons name={icono} size={20} color={COLOR_TEXTO[variante]} /> : null}
      <Text style={[tipo.cuerpoFuerte, { color: COLOR_TEXTO[variante] }]}>{titulo}</Text>
    </Presionable>
  ),
);

Boton.displayName = 'Boton';

const styles = StyleSheet.create({
  base: {
    minHeight: TOQUE_MINIMO,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espacio.sm,
    paddingHorizontal: espacio.lg,
    borderRadius: radio.control,
    borderCurve: 'continuous',
  },
  primario: {
    backgroundColor: colores.marca,
  },
  secundario: {
    backgroundColor: colores.marcaSuave,
  },
  peligro: {
    backgroundColor: colores.peligroSuave,
  },
  texto: {
    backgroundColor: 'transparent',
  },
});
