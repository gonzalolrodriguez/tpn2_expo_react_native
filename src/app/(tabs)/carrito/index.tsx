import React from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { useComedor } from '../../../context/ComedorContext';
import { Boton } from '../../../components/Boton';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { EstadoVacio } from '../../../components/EstadoVacio';
import { FilaDato } from '../../../components/FilaDato';
import { Grupo } from '../../../components/Grupo';
import { APARECER, DESAPARECER, REACOMODAR, vibrarLeve } from '../../../components/Movimiento';
import { NotaCocina } from '../../../components/NotaCocina';
import { Pantalla } from '../../../components/Pantalla';
import { Plato } from '../../../data/platos';
import { espacio, formatoPrecio } from '../../../tema/tokens';

// Le da a cada ítem una clave estable: el código del plato más cuántas veces apareció antes.
// "Deshacer último" quita la última aparición de un plato, así que la clave que desaparece
// es justo la de la fila que se va, y es esa la que se anima al salir.
function conClaves(carrito: Plato[]) {
  const vistos = new Map<number, number>();

  return carrito.map((item) => {
    const repeticion = vistos.get(item.id) ?? 0;
    vistos.set(item.id, repeticion + 1);
    return { item, clave: `${item.id}-${repeticion}` };
  });
}

export default function PantallaCarrito() {
  const {
    carrito,
    totalCarrito,
    deshacerUltimo,
    pilaDeshacerTamanio,
    notaCarrito,
    limpiarCarrito,
  } = useComedor();

  const esPilaVacia = pilaDeshacerTamanio === 0;
  const carritoVacio = carrito.length === 0;

  const alDeshacer = () => {
    // Un toque leve junto con la fila que se va de la lista
    vibrarLeve();
    deshacerUltimo();
  };

  return (
    <Pantalla>
      {carritoVacio ? (
        <EstadoVacio
          icono="cart-outline"
          titulo="Tu carrito está vacío"
          mensaje="Agregá platos desde el menú para armar tu pedido."
        >
          <Link href="/menu" asChild>
            <Boton titulo="Ver el menú" />
          </Link>
        </EstadoVacio>
      ) : (
        <Grupo>
          {/* Cada fila aparece y se va con un fundido; las que quedan se reacomodan */}
          {conClaves(carrito).map(({ item, clave }) => (
            <Animated.View key={clave} entering={APARECER} exiting={DESAPARECER} layout={REACOMODAR}>
              <FilaDato miniatura={item} titulo={item.nombre} valor={formatoPrecio(item.precio)} />
            </Animated.View>
          ))}
          <Animated.View key="total" layout={REACOMODAR}>
            <FilaDato fuerte titulo="Total" valor={formatoPrecio(totalCarrito)} />
          </Animated.View>
        </Grupo>
      )}

      {/* Deshacer usa la Pila: siempre visible, deshabilitado cuando la pila está vacía */}
      <Animated.View layout={REACOMODAR} style={styles.edicion}>
        <Boton
          variante="secundario"
          icono="arrow-undo-outline"
          titulo={`Deshacer último (${pilaDeshacerTamanio})`}
          onPress={alDeshacer}
          disabled={esPilaVacia}
          contenedor={styles.deshacer}
        />
        {carritoVacio ? null : <Boton variante="peligro" titulo="Vaciar" onPress={limpiarCarrito} />}
      </Animated.View>

      {carritoVacio ? null : (
        <>
          {notaCarrito !== '' ? (
            <Animated.View layout={REACOMODAR}>
              <NotaCocina nota={notaCarrito} />
            </Animated.View>
          ) : null}

          <Animated.View layout={REACOMODAR} style={styles.cierre}>
            <Link href="/carrito/nota" asChild>
              <Boton
                variante="texto"
                icono="create-outline"
                titulo={notaCarrito ? 'Cambiar la nota para la cocina' : 'Agregar una nota para la cocina'}
              />
            </Link>

            {/* El usuario toca un botón: se navega con <Link>, no con router */}
            <Link href="/confirmar" asChild>
              <Boton titulo="Confirmar pedido" />
            </Link>
          </Animated.View>
        </>
      )}

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  edicion: {
    flexDirection: 'row',
    gap: espacio.sm,
  },
  // Deshacer ocupa el ancho libre; Vaciar queda del ancho de su texto
  deshacer: {
    flex: 1,
  },
  cierre: {
    gap: espacio.sm,
  },
});
