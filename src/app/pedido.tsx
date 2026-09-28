import React from 'react';
import { Redirect } from 'expo-router';

export default function PantallaPedidoRedireccion() {
  // Redirecciona inmediatamente de /pedido a /carrito
  return <Redirect href="/carrito" />;
}
