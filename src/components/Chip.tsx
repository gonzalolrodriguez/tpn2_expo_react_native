import React from 'react';
import { Text, View, StyleSheet, PressableProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Presionable } from './Presionable';
import { colores, espacio, radio, tamanioIcono, tipo, TOQUE_MINIMO } from '../tema/tokens';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  titulo: string;
  // Solo para chips de filtro. Si no se pasa, el chip es un acceso directo (por ejemplo, hijo de <Link asChild>).
  seleccionado?: boolean;
}

// Chip de categoría. El estado seleccionado se marca con color y con un tilde,
// para que no dependa solo del color.
export const Chip = React.forwardRef<View, Props>(({ titulo, seleccionado, ...resto }, ref) => {
  const esFiltro = seleccionado !== undefined;

  return (
    <Presionable
      ref={ref}
      accessibilityRole={esFiltro ? 'button' : undefined}
      accessibilityState={esFiltro ? { selected: seleccionado } : undefined}
      estilo={[styles.chip, seleccionado && styles.chipSeleccionado]}
      {...resto}
    >
      {seleccionado ? (
        <Ionicons name="checkmark-outline" size={tamanioIcono.sm} color={colores.sobreMarca} />
      ) : null}
      <Text style={[tipo.cuerpoFuerte, seleccionado ? styles.textoSeleccionado : styles.texto]}>{titulo}</Text>
    </Presionable>
  );
});

Chip.displayName = 'Chip';

const styles = StyleSheet.create({
  chip: {
    minHeight: TOQUE_MINIMO,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.xs,
    paddingHorizontal: espacio.lg,
    borderRadius: radio.pildora,
    backgroundColor: colores.marcaSuave,
  },
  chipSeleccionado: {
    backgroundColor: colores.marca,
  },
  texto: {
    color: colores.marca,
  },
  textoSeleccionado: {
    color: colores.sobreMarca,
  },
});
