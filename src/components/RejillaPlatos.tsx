import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Plato } from '../data/platos';
import { useDiseno } from './Diseno';
import { Entrada } from './Movimiento';
import { TarjetaPlato } from './TarjetaPlato';
import { espacio } from '../tema/tokens';

interface Props {
  platos: Plato[];
  // Posición de la primera tarjeta en la entrada escalonada, para continuar la de una rejilla anterior
  indiceInicial?: number;
  mostrarBotonAgregar?: boolean;
}

// Rejilla adaptable de tarjetas de plato: 1 columna en teléfono, 2 en tablet y 3 en escritorio.
// Las celdas miden un porcentaje del ancho, así que no hace falta medir el contenedor.
export const RejillaPlatos: React.FC<Props> = ({ platos, indiceInicial = 0, mostrarBotonAgregar = true }) => {
  const { columnas } = useDiseno();

  // La entrada escalonada es solo para el montaje de la pantalla. Las tarjetas que aparecen después
  // (al escribir en el buscador o cambiar un filtro) se muestran de inmediato.
  const montada = useRef(false);
  useEffect(() => {
    montada.current = true;
  }, []);

  return (
    <View style={styles.rejilla}>
      {platos.map((plato, indice) => (
        <Entrada
          key={plato.id}
          indice={indiceInicial + indice}
          animar={!montada.current}
          estilo={[styles.celda, { width: `${100 / columnas}%` }]}
        >
          <TarjetaPlato plato={plato} mostrarBotonAgregar={mostrarBotonAgregar} />
        </Entrada>
      ))}
    </View>
  );
};

// Separación entre tarjetas: cada celda aporta la mitad y la rejilla compensa el borde exterior
const MEDIA_SEPARACION = espacio.lg / 2;

const styles = StyleSheet.create({
  rejilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -MEDIA_SEPARACION,
  },
  celda: {
    padding: MEDIA_SEPARACION,
  },
});
