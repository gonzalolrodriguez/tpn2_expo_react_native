import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  cubicBezier,
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  LinearTransition,
  ReduceMotion,
  useReducedMotion,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { movimiento } from '../tema/tokens';

// Movimiento y respuesta háptica de la app. Todo sale de los tokens de `movimiento`,
// corre con Reanimated (nunca con el Animated de React Native) y solo anima transform y opacity.

const [sx1, sy1, sx2, sy2] = movimiento.curvaSalida;
const [mx1, my1, mx2, my2] = movimiento.curvaMovimiento;

// Curva de salida fuerte: para withTiming y para los constructores de entrada/salida
export const CURVA_SALIDA = Easing.bezier(sx1, sy1, sx2, sy2);
// La misma curva para las transiciones CSS de Reanimated, que no aceptan el string 'cubic-bezier(...)'
export const CURVA_SALIDA_CSS = cubicBezier(sx1, sy1, sx2, sy2);
// Curva para lo que se reacomoda dentro de la pantalla
const CURVA_MOVIMIENTO = Easing.bezier(mx1, my1, mx2, my2);

// Los constructores se crean una sola vez, fuera de los componentes.
// Aparecer y desaparecer solo cambian la opacidad: por eso siguen activos con "reducir movimiento".
export const APARECER = FadeIn.duration(movimiento.estado).easing(CURVA_SALIDA).reduceMotion(ReduceMotion.Never);
export const DESAPARECER = FadeOut.duration(movimiento.salida).easing(CURVA_SALIDA).reduceMotion(ReduceMotion.Never);
// Reacomodar mueve elementos de lugar: con "reducir movimiento" el sistema lo saltea
export const REACOMODAR = LinearTransition.duration(movimiento.estado)
  .easing(CURVA_MOVIMIENTO)
  .reduceMotion(ReduceMotion.System);

interface PropsEntrada {
  children: React.ReactNode;
  // Posición dentro de una entrada escalonada: cada elemento espera un escalón más que el anterior
  indice?: number;
  // false para los elementos que aparecen después del montaje de la pantalla (no se animan)
  animar?: boolean;
  // Llega con resorte en lugar de curva: para lo que aparece como respuesta a un toque
  conResorte?: boolean;
  // Se desvanece al desmontarse
  conSalida?: boolean;
  estilo?: StyleProp<ViewStyle>;
}

// Entrada de contenido: aparece y sube unos píxeles. Con "reducir movimiento" solo aparece.
export const Entrada: React.FC<PropsEntrada> = ({
  children,
  indice = 0,
  animar = true,
  conResorte = false,
  conSalida = false,
  estilo,
}) => {
  const reducido = useReducedMotion();

  const entrada = useMemo(() => {
    const retraso = Math.min(indice, movimiento.escalonesMaximos) * movimiento.escalon;

    // Sin traslación ni rebote: queda el cambio de opacidad, que explica que algo apareció
    if (reducido) {
      return FadeIn.duration(movimiento.entrada).delay(retraso).reduceMotion(ReduceMotion.Never);
    }

    // Se usa el recorrido propio de FadeInDown. Cambiarlo con withInitialValues deja el elemento
    // con position: absolute en la web cuando termina la animación (Reanimated 4.5) y rompe el layout.
    return conResorte
      ? FadeInDown.springify(movimiento.resorte.duration).dampingRatio(movimiento.resorte.dampingRatio).delay(retraso)
      : FadeInDown.duration(movimiento.entrada).easing(CURVA_SALIDA).delay(retraso);
  }, [indice, reducido, conResorte]);

  return (
    <Animated.View entering={animar ? entrada : undefined} exiting={conSalida ? DESAPARECER : undefined} style={estilo}>
      {children}
    </Animated.View>
  );
};

// Confirmación visual breve después de una acción (el tilde del botón de agregar).
// Devuelve si está activa y la función que la dispara.
export function useConfirmacionBreve(): [boolean, () => void] {
  const [activa, setActiva] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    },
    [],
  );

  const confirmar = useCallback(() => {
    if (temporizador.current) clearTimeout(temporizador.current);
    setActiva(true);
    temporizador.current = setTimeout(() => setActiva(false), movimiento.confirmacion);
  }, []);

  return [activa, confirmar];
}

// Respuesta háptica. Una sola por acción del usuario y siempre acompañada de un cambio visible:
// muchos teléfonos la tienen apagada. En la web no existe.

// Algo encajó: agregar al carrito, deshacer
export function vibrarLeve() {
  if (process.env.EXPO_OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
  }
}

// La operación salió bien: pedido en la cola, pedido atendido
export function vibrarExito() {
  if (process.env.EXPO_OS !== 'web') {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
  }
}
