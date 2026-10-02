import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useComedor } from '../../context/ComedorContext';
import { DondeEstoy } from '../../components/DondeEstoy';

// Pestaña "Cocina": resumen para el personal, visible solo con sesión (Tabs.Protected)
export default function PantallaPersonal() {
  const { usuario, colaPedidosArray, historialAtendidosArray, pedidoFrente, cerrarSesion } = useComedor();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>🍳 Cocina</Text>
      <Text style={styles.subtitulo}>Sesión iniciada como "{usuario}"</Text>

      <View style={styles.fila}>
        <View style={styles.dato}>
          <Text style={styles.datoValor}>{colaPedidosArray.length}</Text>
          <Text style={styles.datoLabel}>En espera</Text>
        </View>
        <View style={styles.dato}>
          <Text style={styles.datoValor}>{historialAtendidosArray.length}</Text>
          <Text style={styles.datoLabel}>Atendidos</Text>
        </View>
      </View>

      <Text style={styles.frente}>
        {pedidoFrente ? `Siguiente en la cola: turno #${pedidoFrente.numeroTurno}` : 'No hay pedidos en la cola.'}
      </Text>

      <Link href="/cocina" asChild>
        <Pressable style={styles.btnPanel}>
          <Text style={styles.btnPanelText}>Abrir panel de cocina</Text>
        </Pressable>
      </Link>

      <Pressable style={styles.btnSalir} onPress={cerrarSesion}>
        <Text style={styles.btnSalirText}>Cerrar sesión</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
    paddingTop: 48,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
    marginBottom: 16,
  },
  fila: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dato: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  datoValor: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  datoLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  frente: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 16,
  },
  btnPanel: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnPanelText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnSalir: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnSalirText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
});
