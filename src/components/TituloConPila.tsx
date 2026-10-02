import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ColorValue } from 'react-native';
import { useNavigation } from 'expo-router';

interface Props {
  children: string;
  tintColor?: ColorValue;
}

// Título de header que agrega cuántas pantallas tiene apiladas el Stack
export const TituloConPila: React.FC<Props> = ({ children, tintColor }) => {
  const navigation = useNavigation();
  const [enPila, setEnPila] = useState(() => navigation.getState()?.routes.length ?? 1);

  useEffect(() => {
    const actualizar = () => setEnPila(navigation.getState()?.routes.length ?? 1);
    actualizar();
    // El evento "state" avisa cada vez que se apila o se desapila una pantalla
    return navigation.addListener('state', actualizar);
  }, [navigation]);

  return (
    <Text style={[styles.titulo, { color: tintColor }]} numberOfLines={1}>
      {children} · pila: {enPila}
    </Text>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 17,
    fontWeight: '600',
  },
});
