import React, { createContext, useContext, useState, useRef } from 'react';
import { Plato } from '../data/platos';
import { Pila } from '../estructuras/Pila';
import { Cola } from '../estructuras/Cola';

export interface Pedido {
  numeroTurno: number;
  items: Plato[];
  total: number;
  nota?: string;
  fecha: string;
}

interface ComedorContextType {
  // Sesión
  usuario: string | null;
  iniciarSesion: (user: string, pass: string) => boolean;
  cerrarSesion: () => void;

  // Carrito y Pila de Deshacer
  carrito: Plato[];
  notaCarrito: string;
  setNotaCarrito: (nota: string) => void;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  pilaDeshacerTamanio: number;
  limpiarCarrito: () => void;
  totalCarrito: number;

  // Cola de Pedidos e Historial de Atendidos
  colaPedidosArray: Pedido[];
  historialAtendidosArray: Pedido[];
  confirmarPedido: () => Pedido | null;
  atenderSiguiente: () => Pedido | undefined;
  siguienteTurno: number;
  obtenerPosicionEnCola: (numeroTurno: number) => number;
}

const ComedorContext = createContext<ComedorContextType | undefined>(undefined);

export const ComedorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State de sesión
  const [usuario, setUsuario] = useState<string | null>(null);

  // Carrito y Nota
  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [notaCarrito, setNotaCarrito] = useState<string>('');

  // Pila y Cola usando refs para mantener la instancia de la clase de estructura
  const pilaDeshacerRef = useRef(new Pila<Plato>());
  const colaPedidosRef = useRef(new Cola<Pedido>());
  const historialAtendidosRef = useRef(new Pila<Pedido>());

  const [pilaDeshacerTamanio, setPilaDeshacerTamanio] = useState<number>(0);
  const [colaPedidosArray, setColaPedidosArray] = useState<Pedido[]>([]);
  const [historialAtendidosArray, setHistorialAtendidosArray] = useState<Pedido[]>([]);

  const numeroTurnoCounter = useRef<number>(1);

  // Autenticación
  const iniciarSesion = (user: string, pass: string): boolean => {
    if (user.trim().toLowerCase() === 'cocina' && pass === '1234') {
      setUsuario('cocina');
      return true;
    }
    return false;
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  // Carrito con Pila de deshacer
  const agregarAlCarrito = (plato: Plato) => {
    setCarrito((prev) => [...prev, plato]);
    pilaDeshacerRef.current.push(plato);
    setPilaDeshacerTamanio(pilaDeshacerRef.current.tamanio);
  };

  const deshacerUltimo = () => {
    const ultimoPlato = pilaDeshacerRef.current.pop();
    setPilaDeshacerTamanio(pilaDeshacerRef.current.tamanio);
    if (!ultimoPlato) return;

    setCarrito((prev) => {
      const idx = prev.findLastIndex((p) => p.id === ultimoPlato.id);
      if (idx !== -1) {
        const nuevo = [...prev];
        nuevo.splice(idx, 1);
        return nuevo;
      }
      return prev;
    });
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    setNotaCarrito('');
    pilaDeshacerRef.current.limpiar();
    setPilaDeshacerTamanio(0);
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio, 0);

  // Confirmación de Pedido y Cola
  const confirmarPedido = (): Pedido | null => {
    if (carrito.length === 0) return null;

    const nuevoPedido: Pedido = {
      numeroTurno: numeroTurnoCounter.current++,
      items: [...carrito],
      total: totalCarrito,
      nota: notaCarrito,
      fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    colaPedidosRef.current.encolar(nuevoPedido);
    setColaPedidosArray(colaPedidosRef.current.aArray());

    // Limpiamos carrito tras confirmar
    limpiarCarrito();

    return nuevoPedido;
  };

  // Atender siguiente pedido en cocina
  const atenderSiguiente = (): Pedido | undefined => {
    const pedidoAtendido = colaPedidosRef.current.desencolar();
    setColaPedidosArray(colaPedidosRef.current.aArray());

    if (pedidoAtendido) {
      historialAtendidosRef.current.push(pedidoAtendido);
      // aArray() devuelve de base a tope; invertimos para que el último atendido aparezca primero
      setHistorialAtendidosArray(historialAtendidosRef.current.aArray().slice().reverse());
    }

    return pedidoAtendido;
  };

  const obtenerPosicionEnCola = (numeroTurno: number): number => {
    const arr = colaPedidosRef.current.aArray();
    const index = arr.findIndex((p) => p.numeroTurno === numeroTurno);
    return index !== -1 ? index : 0;
  };

  return (
    <ComedorContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        carrito,
        notaCarrito,
        setNotaCarrito,
        agregarAlCarrito,
        deshacerUltimo,
        pilaDeshacerTamanio,
        limpiarCarrito,
        totalCarrito,
        colaPedidosArray,
        historialAtendidosArray,
        confirmarPedido,
        atenderSiguiente,
        siguienteTurno: numeroTurnoCounter.current,
        obtenerPosicionEnCola,
      }}
    >
      {children}
    </ComedorContext.Provider>
  );
};

export const useComedor = () => {
  const context = useContext(ComedorContext);
  if (!context) {
    throw new Error('useComedor debe usarse dentro de un ComedorProvider');
  }
  return context;
};
