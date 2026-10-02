import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { BottomTabBarHeightContext } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useComedor } from '../context/ComedorContext';
import { useDiseno } from './Diseno';
import { Entrada } from './Movimiento';
import { Presionable } from './Presionable';
import { colores, diseno, espacio, formatoPrecio, radio, sombra, tamanioIcono, tipo, TOQUE_MINIMO } from '../tema/tokens';

// Alto de la barra y separación con el borde inferior. <Pantalla> los usa para reservar
// el lugar al final del contenido, así la barra no tapa la última fila de tarjetas.
export const ALTO_BARRA_CARRITO = TOQUE_MINIMO + espacio.lg;
export const MARGEN_BARRA_CARRITO = espacio.md;

// Barra flotante del carrito: aparece cuando hay al menos un plato y lleva al carrito con <Link>.
// Muestra la cantidad y el total, así se puede seguir eligiendo sin cambiar de pestaña.
export const BarraCarrito: React.FC = () => {
  const { carrito, totalCarrito } = useComedor();
  const margenes = useSafeAreaInsets();
  const { relleno } = useDiseno();

  // Dentro de las pestañas, la barra de pestañas ya ocupa el margen inferior seguro.
  // En las pantallas del Stack raíz (categoría, buscar) hay que sumarlo.
  const dentroDePestanias = React.use(BottomTabBarHeightContext) !== undefined;
  const inferior = MARGEN_BARRA_CARRITO + (dentroDePestanias ? 0 : margenes.bottom);

  const cantidad = carrito.length;
  const platos = cantidad === 1 ? '1 plato' : `${cantidad} platos`;

  return (
    // La zona no recibe toques: solo la barra. El resto de la pantalla sigue respondiendo.
    <View style={[styles.zona, { bottom: inferior, paddingHorizontal: relleno }]}>
      {cantidad > 0 ? (
        // Llega con resorte porque es la respuesta a un toque (agregar un plato)
        <Entrada conResorte conSalida estilo={styles.barra}>
          <Link href="/carrito" asChild>
            <Presionable
              estilo={styles.superficie}
              accessibilityLabel={`Ver el carrito: ${platos}, total ${formatoPrecio(totalCarrito)}`}
            >
              <View style={styles.cantidad}>
                <Text style={[tipo.cuerpoFuerte, styles.numero]}>{cantidad}</Text>
              </View>
              <Text style={[tipo.cuerpoFuerte, styles.titulo]} numberOfLines={1}>
                Ver el carrito
              </Text>
              <Text style={[tipo.precio, styles.sobreMarca]}>{formatoPrecio(totalCarrito)}</Text>
              <Ionicons name="chevron-forward-outline" size={tamanioIcono.sm} color={colores.sobreMarca} />
            </Presionable>
          </Link>
        </Entrada>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  zona: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  // En escritorio la barra no cruza toda la página
  barra: {
    width: '100%',
    maxWidth: diseno.anchoLectura,
  },
  superficie: {
    minHeight: ALTO_BARRA_CARRITO,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.md,
    paddingHorizontal: espacio.lg,
    backgroundColor: colores.marca,
    borderRadius: radio.pildora,
    boxShadow: sombra.elevada,
  },
  cantidad: {
    minWidth: espacio.xxl,
    height: espacio.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: espacio.sm,
    borderRadius: radio.pildora,
    backgroundColor: colores.sobreMarca,
  },
  numero: {
    color: colores.marca,
    fontVariant: ['tabular-nums'],
  },
  titulo: {
    flex: 1,
    color: colores.sobreMarca,
  },
  sobreMarca: {
    color: colores.sobreMarca,
  },
});
