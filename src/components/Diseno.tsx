import { useWindowDimensions } from 'react-native';
import { diseno, espacio } from '../tema/tokens';

// Medidas del diseño adaptable, calculadas a partir del ancho de la ventana.
// Se recalculan solas al girar el teléfono o al cambiar el tamaño de la ventana en la web.
export function useDiseno() {
  const { width: ancho } = useWindowDimensions();

  const esTablet = ancho >= diseno.tablet;
  const esEscritorio = ancho >= diseno.escritorio;

  return {
    ancho,
    esTablet,
    esEscritorio,
    // Columnas de la rejilla de platos: 1 en teléfono, 2 en tablet, 3 en escritorio
    columnas: esEscritorio ? 3 : esTablet ? 2 : 1,
    // Relleno horizontal de la pantalla: crece cuando hay lugar
    relleno: esTablet ? espacio.xl : espacio.lg,
  };
}
