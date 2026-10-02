import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useComedor } from '../../../context/ComedorContext';
import { Boton } from '../../../components/Boton';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { EstadoVacio } from '../../../components/EstadoVacio';
import { FilaDato } from '../../../components/FilaDato';
import { Grupo } from '../../../components/Grupo';
import { NotaCocina } from '../../../components/NotaCocina';
import { Pantalla } from '../../../components/Pantalla';
import { espacio, formatoPrecio } from '../../../tema/tokens';

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
          {carrito.map((item, index) => (
            <FilaDato key={`${item.id}-${index}`} titulo={item.nombre} valor={formatoPrecio(item.precio)} />
          ))}
          <FilaDato fuerte titulo="Total" valor={formatoPrecio(totalCarrito)} />
        </Grupo>
      )}

      {/* Deshacer usa la Pila: siempre visible, deshabilitado cuando la pila está vacía */}
      <View style={styles.edicion}>
        <Boton
          variante="secundario"
          icono="arrow-undo-outline"
          titulo={`Deshacer último (${pilaDeshacerTamanio})`}
          onPress={deshacerUltimo}
          disabled={esPilaVacia}
          contenedor={styles.deshacer}
        />
        {carritoVacio ? null : <Boton variante="peligro" titulo="Vaciar" onPress={limpiarCarrito} />}
      </View>

      {carritoVacio ? null : (
        <>
          {notaCarrito !== '' ? <NotaCocina nota={notaCarrito} /> : null}

          <View style={styles.cierre}>
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
          </View>
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
