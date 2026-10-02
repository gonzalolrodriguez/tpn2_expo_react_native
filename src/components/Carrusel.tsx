import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDiseno } from './Diseno';
import { espacio } from '../tema/tokens';

interface Props {
  children: React.ReactNode;
  // Qué contiene la fila, para los lectores de pantalla
  etiqueta: string;
  separacion?: keyof typeof espacio;
}

// Fila que se desplaza en horizontal: chips de categorías, fotos destacadas.
// Se extiende hasta los bordes de la pantalla para que el contenido no se corte antes del borde.
export const Carrusel: React.FC<Props> = ({ children, etiqueta, separacion = 'sm' }) => {
  const { relleno } = useDiseno();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      accessibilityLabel={etiqueta}
      // Compensa el relleno de la pantalla, que cambia con el ancho de la ventana
      style={[styles.carrusel, { marginHorizontal: -relleno }]}
      contentContainerStyle={[styles.contenido, { gap: espacio[separacion], paddingHorizontal: relleno }]}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carrusel: {
    flexGrow: 0,
  },
  contenido: {
    // Lugar para que la sombra de las tarjetas no se recorte
    paddingVertical: espacio.xs,
  },
});
