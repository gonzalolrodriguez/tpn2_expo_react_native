import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Escudo } from './Marca';
import { CURVA_SALIDA, vibrarExito } from './Movimiento';
import { colores, espacio, movimiento, radio, sombra, tamanioIcono, tipo } from '../tema/tokens';

interface Props {
  numero: number;
  titulo: string;
  mensaje: string;
  // El pedido acaba de entrar en la cola: da el aviso háptico de éxito al montarse
  celebrar?: boolean;
}

// Ticket con el número de turno: el único momento de celebración de la app.
// La tarjeta y el número llegan con un resorte con rebote leve. Con "reducir movimiento"
// no hay escala ni traslación: solo aparece.
export const TicketTurno: React.FC<Props> = ({ numero, titulo, mensaje, celebrar = false }) => {
  const reducido = useReducedMotion();

  const opacidad = useSharedValue(0);
  const subida = useSharedValue(reducido ? 0 : movimiento.desplazamiento);
  const escalaTicket = useSharedValue(reducido ? 1 : movimiento.escalaEntrada);
  const escalaNumero = useSharedValue(reducido ? 1 : movimiento.escalaEntrada);

  // Corre una sola vez, al montarse la pantalla
  useEffect(() => {
    const resorte = { ...movimiento.resorteVivo, reduceMotion: ReduceMotion.System };

    // La opacidad se mantiene siempre: explica que el ticket apareció
    opacidad.set(withTiming(1, { duration: movimiento.estado, easing: CURVA_SALIDA, reduceMotion: ReduceMotion.Never }));
    subida.set(withSpring(0, resorte));
    escalaTicket.set(withSpring(1, resorte));
    // El número llega un instante después que la tarjeta
    escalaNumero.set(withDelay(movimiento.escalon * 2, withSpring(1, resorte)));

    // El aviso háptico va junto con la llegada del ticket, no cuando termina la animación
    if (celebrar) vibrarExito();
    // Sin dependencias a propósito: si el estado del turno cambia después, no se repite
  }, []);

  const estiloTicket = useAnimatedStyle(() => ({
    opacity: opacidad.get(),
    transform: [{ translateY: subida.get() }, { scale: escalaTicket.get() }],
  }));

  const estiloNumero = useAnimatedStyle(() => ({
    transform: [{ scale: escalaNumero.get() }],
  }));

  return (
    <Animated.View style={[styles.ticket, estiloTicket]}>
      <View style={styles.marca}>
        {/* Decorativo: el nombre está escrito al lado */}
        <Escudo alto={tamanioIcono.xl} decorativo />
        <Text style={[tipo.cuerpoFuerte, styles.sobreMarca]}>Comedor IPF</Text>
      </View>

      <Animated.View style={estiloNumero}>
        <Text selectable style={[tipo.numero, styles.sobreMarca]} accessibilityLabel={`Turno ${numero}`}>
          #{numero}
        </Text>
      </Animated.View>

      <Text style={[tipo.subtitulo, styles.sobreMarca, styles.centrado]}>{titulo}</Text>
      <Text style={[tipo.cuerpo, styles.sobreMarca, styles.centrado]}>{mensaje}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ticket: {
    alignItems: 'center',
    gap: espacio.sm,
    paddingVertical: espacio.xxl,
    paddingHorizontal: espacio.xl,
    backgroundColor: colores.marcaProfunda,
    borderRadius: radio.destacado,
    borderCurve: 'continuous',
    boxShadow: sombra.elevada,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.sm,
  },
  sobreMarca: {
    color: colores.crema,
  },
  centrado: {
    textAlign: 'center',
  },
});
