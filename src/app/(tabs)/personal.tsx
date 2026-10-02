import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useComedor } from '../../context/ComedorContext';
import { Boton } from '../../components/Boton';
import { DondeEstoy } from '../../components/DondeEstoy';
import { FilaDato } from '../../components/FilaDato';
import { Grupo } from '../../components/Grupo';
import { Pantalla } from '../../components/Pantalla';
import { colores, espacio, tipo } from '../../tema/tokens';

// Pestaña "Cocina": resumen para el personal, visible solo con sesión (Tabs.Protected)
export default function PantallaPersonal() {
  const { usuario, colaPedidosArray, historialAtendidosArray, pedidoFrente, cerrarSesion } = useComedor();

  return (
    <Pantalla sinHeader>
      <View style={styles.encabezado}>
        <Text style={tipo.tituloGrande} accessibilityRole="header">
          Cocina
        </Text>
        <Text style={[tipo.cuerpo, styles.sesion]}>Sesión iniciada como {usuario}</Text>
      </View>

      <Grupo>
        <FilaDato titulo="Pedidos en espera" valor={String(colaPedidosArray.length)} />
        <FilaDato titulo="Pedidos atendidos" valor={String(historialAtendidosArray.length)} />
        <FilaDato
          titulo="Siguiente en la cola"
          valor={pedidoFrente ? `Turno #${pedidoFrente.numeroTurno}` : 'Ninguno'}
        />
      </Grupo>

      <View style={styles.acciones}>
        <Link href="/cocina" asChild>
          <Boton titulo="Abrir panel de cocina" />
        </Link>

        <Boton variante="texto" icono="log-out-outline" titulo="Cerrar sesión" onPress={cerrarSesion} />
      </View>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    gap: espacio.xs,
  },
  sesion: {
    color: colores.tintaSecundaria,
  },
  acciones: {
    gap: espacio.sm,
  },
});
