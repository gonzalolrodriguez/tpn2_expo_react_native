import React from 'react';
import { Pressable, PressableProps, View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import Animated, { CSSStyle, useReducedMotion } from 'react-native-reanimated';
import { CURVA_SALIDA_CSS } from './Movimiento';
import { colores, movimiento, opacidad, TOQUE_MINIMO } from '../tema/tokens';

// Cómo responde la superficie al toque:
// - escala: se hunde un 3 %. Para todo lo que se comporta como un botón (botones, chips, tarjetas).
// - resaltado: cambia el fondo. Para filas de ancho completo: una fila que se achica se lee
//   como si se encogiera toda la pantalla.
// - ninguna: la respuesta la dibuja el componente que la usa (ver TarjetaPlato).
type Respuesta = 'escala' | 'resaltado' | 'ninguna';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  children: React.ReactNode;
  // Aspecto de la superficie (fondo, borde, relleno)
  estilo?: StyleProp<ViewStyle>;
  // Ubicación dentro del layout padre (flex, márgenes). Debe ser un objeto plano.
  contenedor?: ViewStyle;
  respuesta?: Respuesta;
}

// Transición CSS de Reanimated: alcanza para un cambio de dos estados, sin valores compartidos.
// Va fuera de StyleSheet.create porque las propiedades de transición no son estilos de React Native.
const transicion: CSSStyle<ViewStyle> = {
  transform: [{ scale: 1 }],
  transitionProperty: ['transform', 'opacity'],
  transitionDuration: movimiento.presion,
  transitionTimingFunction: CURVA_SALIDA_CSS,
};

// Estilos de la respuesta por escala, para aplicar sobre un Animated.View.
// Con "reducir movimiento" la escala se reemplaza por un cambio de opacidad.
export function estiloPresion(presionado: boolean, reducido: boolean) {
  return [transicion, presionado ? (reducido ? styles.atenuado : styles.hundido) : null];
}

// Superficie táctil con respuesta inmediata: reacciona al apoyar el dedo, no al soltarlo.
// El aspecto vive en un View interno para que funcione dentro de <Link asChild>,
// que no admite arreglos ni funciones en el style de su hijo.
export const Presionable = React.forwardRef<View, Props>(
  ({ children, estilo, contenedor, disabled, respuesta = 'escala', ...resto }, ref) => {
    const reducido = useReducedMotion();

    // <Link asChild> siempre le pasa un style a su hijo (aunque sea undefined):
    // se combina con el contenedor para que no lo pise.
    const { style: estiloEnlace, ...props } = resto as typeof resto & { style?: ViewStyle };

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        // Un dedo que se corre unos píxeles no cancela el toque
        pressRetentionOffset={TOQUE_MINIMO / 2}
        {...props}
        style={{ ...contenedor, ...estiloEnlace }}
      >
        {({ pressed }) => (
          <Animated.View
            style={[
              estilo,
              respuesta === 'escala' ? estiloPresion(pressed, reducido) : null,
              respuesta === 'resaltado' && pressed ? styles.resaltado : null,
              disabled ? styles.deshabilitado : null,
            ]}
          >
            {children}
          </Animated.View>
        )}
      </Pressable>
    );
  },
);

Presionable.displayName = 'Presionable';

const styles = StyleSheet.create({
  hundido: {
    transform: [{ scale: movimiento.escalaPresion }],
  },
  atenuado: {
    opacity: opacidad.presionado,
  },
  resaltado: {
    backgroundColor: colores.superficieHundida,
  },
  deshabilitado: {
    opacity: opacidad.deshabilitado,
  },
});
