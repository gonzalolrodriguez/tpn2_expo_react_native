import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link, usePathname, Stack } from 'expo-router';
import { Boton } from '../components/Boton';
import { DondeEstoy } from '../components/DondeEstoy';
import { EstadoVacio } from '../components/EstadoVacio';
import { Pantalla } from '../components/Pantalla';
import { colores, espacio, radio, tipo } from '../tema/tokens';

export default function PantallaNotFound() {
  const pathname = usePathname();

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Error 404' }} />

      <EstadoVacio
        icono="compass-outline"
        titulo="Esta pantalla no existe"
        mensaje="La dirección no corresponde a ninguna pantalla de la app. Revisala o volvé al inicio."
      >
        <View style={styles.accion}>
          {/* La dirección se puede seleccionar para copiarla */}
          <Text selectable style={[tipo.cuerpoFuerte, styles.ruta]}>
            {pathname}
          </Text>

          <Link href="/" asChild>
            <Boton titulo="Ir al inicio" />
          </Link>
        </View>
      </EstadoVacio>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  accion: {
    gap: espacio.lg,
  },
  ruta: {
    textAlign: 'center',
    padding: espacio.md,
    backgroundColor: colores.superficieHundida,
    borderRadius: radio.control,
    borderCurve: 'continuous',
    // El texto recorta su fondo con las esquinas redondeadas
    overflow: 'hidden',
  },
});
