import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useComedor } from '../context/ComedorContext';
import { ALTO_BARRA_CARRITO, BarraCarrito, MARGEN_BARRA_CARRITO } from './BarraCarrito';
import { useDiseno } from './Diseno';
import { colores, contenidoPantalla, diseno } from '../tema/tokens';

interface Props {
  children: React.ReactNode;
  // Pestañas sin header (Inicio, Cocina): el contenido arranca debajo de la barra de estado
  sinHeader?: boolean;
  // ancha: listas y rejillas, hasta el ancho máximo. lectura: formularios y pantallas de texto,
  // con una columna angosta para que las líneas no queden larguísimas en escritorio.
  variante?: 'ancha' | 'lectura';
  // Bloque de borde a borde arriba del contenido (el bloque de marca, la foto del plato).
  // Con sinHeader, la cabecera se ocupa del margen superior seguro.
  cabecera?: React.ReactNode;
  // Muestra la barra flotante del carrito cuando hay platos cargados
  conBarraCarrito?: boolean;
}

// Raíz desplazable de todas las pantallas: mismo fondo, mismo relleno y mismo ritmo vertical.
// En pantallas anchas el contenido queda centrado y con un ancho máximo.
export const Pantalla: React.FC<Props> = ({
  children,
  sinHeader = false,
  variante = 'ancha',
  cabecera,
  conBarraCarrito = false,
}) => {
  const margenes = useSafeAreaInsets();
  const { relleno } = useDiseno();
  const { carrito } = useComedor();

  const anchoMaximo = variante === 'lectura' ? diseno.anchoLectura : diseno.anchoMaximo;

  // En iOS el ajuste automático ya suma el margen inferior; en Android y web lo sumamos a mano
  // porque el contenido se dibuja de borde a borde.
  const margenInferior = process.env.EXPO_OS === 'ios' ? 0 : margenes.bottom;
  // Lugar para la barra del carrito, así no tapa la última fila
  const lugarBarra = conBarraCarrito && carrito.length > 0 ? ALTO_BARRA_CARRITO + MARGEN_BARRA_CARRITO : 0;

  return (
    <View style={styles.pantalla}>
      <ScrollView
        style={styles.pantalla}
        // El relleno va en el contenido para que no se recorte al desplazar
        contentContainerStyle={{
          paddingTop: sinHeader && !cabecera ? margenes.top : 0,
          paddingBottom: margenInferior + lugarBarra,
        }}
        // Sin header el margen superior se aplica a mano (arriba), así que se desactiva el ajuste
        // automático para no sumarlo dos veces en iOS.
        contentInsetAdjustmentBehavior={sinHeader ? 'never' : 'automatic'}
        keyboardShouldPersistTaps="handled"
      >
        {cabecera}
        {/* El ancho máximo suma el relleno para que el contenido útil mida exactamente el límite */}
        <View style={[styles.columna, { maxWidth: anchoMaximo + relleno * 2, padding: relleno }]}>{children}</View>
      </ScrollView>

      {conBarraCarrito ? <BarraCarrito /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  columna: {
    width: '100%',
    alignSelf: 'center',
    gap: contenidoPantalla.gap,
  },
});
