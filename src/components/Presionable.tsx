import React from 'react';
import { Pressable, PressableProps, View, ViewStyle, StyleProp, StyleSheet } from 'react-native';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  children: React.ReactNode;
  // Aspecto de la superficie (fondo, borde, relleno)
  estilo?: StyleProp<ViewStyle>;
  // Ubicación dentro del layout padre (flex, márgenes). Debe ser un objeto plano.
  contenedor?: ViewStyle;
}

// Superficie táctil con respuesta inmediata: reacciona al apoyar el dedo, no al soltarlo.
// El aspecto vive en un View interno para que funcione dentro de <Link asChild>,
// que no admite arreglos ni funciones en el style de su hijo.
export const Presionable = React.forwardRef<View, Props>(
  ({ children, estilo, contenedor, disabled, ...resto }, ref) => {
    // <Link asChild> siempre le pasa un style a su hijo (aunque sea undefined):
    // se combina con el contenedor para que no lo pise.
    const { style: estiloEnlace, ...props } = resto as typeof resto & { style?: ViewStyle };

    return (
      <Pressable ref={ref} disabled={disabled} {...props} style={{ ...contenedor, ...estiloEnlace }}>
        {({ pressed }) => (
          <View style={[estilo, pressed && styles.presionado, disabled && styles.deshabilitado]}>{children}</View>
        )}
      </Pressable>
    );
  },
);

Presionable.displayName = 'Presionable';

const styles = StyleSheet.create({
  presionado: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
  deshabilitado: {
    opacity: 0.4,
  },
});
