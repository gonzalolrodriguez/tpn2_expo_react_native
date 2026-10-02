import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useComedor } from '../context/ComedorContext';
import { Boton } from '../components/Boton';
import { DondeEstoy } from '../components/DondeEstoy';
import { EstadoVacio } from '../components/EstadoVacio';
import { FilaDato } from '../components/FilaDato';
import { Grupo } from '../components/Grupo';
import { NotaCocina } from '../components/NotaCocina';
import { Pantalla } from '../components/Pantalla';
import { espacio, formatoPrecio, tipo } from '../tema/tokens';

export default function PantallaConfirmar() {
  const { carrito, totalCarrito, notaCarrito, confirmarPedido } = useComedor();

  const handleConfirmar = () => {
    const pedidoCreado = confirmarPedido();
    if (pedidoCreado) {
      // Importante: Usamos router.replace para que al presionar atrás no vuelva a la pantalla de confirmación
      router.replace(`/turno/${pedidoCreado.numeroTurno}`);
    }
  };

  if (carrito.length === 0) {
    return (
      <Pantalla variante="lectura">
        <EstadoVacio
          icono="cart-outline"
          titulo="No hay nada para confirmar"
          mensaje="Tu carrito está vacío. Agregá al menos un plato antes de confirmar el pedido."
        >
          <Boton variante="secundario" titulo="Volver al carrito" onPress={() => router.back()} />
        </EstadoVacio>
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla variante="lectura">
      <Grupo>
        {carrito.map((item, i) => (
          <FilaDato key={`${item.id}-${i}`} miniatura={item} titulo={item.nombre} valor={formatoPrecio(item.precio)} />
        ))}
        <FilaDato fuerte titulo="Total a pagar" valor={formatoPrecio(totalCarrito)} />
      </Grupo>

      {notaCarrito ? <NotaCocina nota={notaCarrito} /> : null}

      <Text style={tipo.nota}>
        Al confirmar, tu pedido entra en la cola de la cocina y te asignamos un número de turno.
      </Text>

      <View style={styles.acciones}>
        <Boton titulo="Enviar a la cocina" onPress={handleConfirmar} />
        <Boton variante="texto" titulo="Cancelar" onPress={() => router.back()} />
      </View>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  acciones: {
    gap: espacio.sm,
  },
});
