import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Plato } from '../data/platos';
import { useComedor } from '../context/ComedorContext';
import { useConfirmacionBreve, vibrarLeve } from './Movimiento';
import { Presionable } from './Presionable';
import { colores, radio, sombra, tamanioIcono, TOQUE_MINIMO } from '../tema/tokens';

interface Props {
  plato: Plato;
}

// Botón circular que agrega un plato al carrito sin salir de la lista.
// La respuesta es inmediata y doble: el "+" pasa a ser un tilde durante un momento
// y el teléfono da un toque leve. El contador de la pestaña Carrito se actualiza solo.
export const BotonAgregar: React.FC<Props> = ({ plato }) => {
  const { agregarAlCarrito } = useComedor();
  const [agregado, confirmar] = useConfirmacionBreve();

  const alAgregar = () => {
    vibrarLeve();
    agregarAlCarrito(plato);
    confirmar();
  };

  return (
    <Presionable
      accessibilityRole="button"
      accessibilityLabel={`Agregar ${plato.nombre} al carrito`}
      onPress={alAgregar}
      estilo={[styles.boton, agregado && styles.agregado]}
    >
      <Ionicons
        name={agregado ? 'checkmark-outline' : 'add-outline'}
        size={tamanioIcono.lg}
        color={agregado ? colores.marca : colores.sobreMarca}
      />
    </Presionable>
  );
};

const styles = StyleSheet.create({
  boton: {
    width: TOQUE_MINIMO,
    height: TOQUE_MINIMO,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.pildora,
    backgroundColor: colores.marca,
    boxShadow: sombra.tarjeta,
  },
  agregado: {
    backgroundColor: colores.marcaSuave,
  },
});
