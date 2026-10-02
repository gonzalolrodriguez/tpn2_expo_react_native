import React from 'react';
import { Link } from 'expo-router';
import { DondeEstoy } from '../../components/DondeEstoy';
import { FilaEnlace } from '../../components/FilaEnlace';
import { Grupo } from '../../components/Grupo';
import { Pantalla } from '../../components/Pantalla';

const ARTICULOS = [
  {
    ruta: '/ayuda/pagos/efectivo',
    icono: 'cash-outline',
    titulo: 'Pago en efectivo',
    descripcion: 'Cómo pagar tu pedido en la caja',
  },
  {
    ruta: '/ayuda/pagos/tarjeta',
    icono: 'card-outline',
    titulo: 'Pago con tarjeta y Mercado Pago',
    descripcion: 'Tarjetas aceptadas y pago con QR',
  },
  {
    ruta: '/ayuda/horarios',
    icono: 'time-outline',
    titulo: 'Horarios de atención',
    descripcion: 'Cuándo está abierto el comedor',
  },
  {
    ruta: '/ayuda/cancelaciones/politica',
    icono: 'close-circle-outline',
    titulo: 'Cancelación de pedidos',
    descripcion: 'Hasta cuándo podés cancelar',
  },
] as const;

export default function PantallaAyudaIndex() {
  return (
    <Pantalla>
      <Grupo>
        {ARTICULOS.map((art) => (
          <Link key={art.ruta} href={art.ruta} asChild>
            <FilaEnlace icono={art.icono} titulo={art.titulo} descripcion={art.descripcion} />
          </Link>
        ))}
      </Grupo>

      <DondeEstoy />
    </Pantalla>
  );
}
