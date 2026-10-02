import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { DondeEstoy } from '../../components/DondeEstoy';

const ARTICULOS = [
  { ruta: '/ayuda/pagos/efectivo', titulo: 'Formas de Pago en Efectivo' },
  { ruta: '/ayuda/pagos/tarjeta', titulo: 'Pagos con Tarjeta y Mercado Pago' },
  { ruta: '/ayuda/horarios', titulo: 'Horarios de Atención del Comedor' },
  { ruta: '/ayuda/cancelaciones/politica', titulo: 'Política de Cancelación de Pedidos' },
] as const;

export default function PantallaAyudaIndex() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>ℹ️ Centro de Ayuda e Información</Text>
      <Text style={styles.subtitulo}>Selecciona un tema para consultar los detalles:</Text>

      {ARTICULOS.map((art) => (
        <Link key={art.ruta} href={art.ruta} style={styles.cardArticulo}>
          <Text style={styles.artTitulo}>{art.titulo}</Text>
          <Text style={styles.artRuta}>{art.ruta}</Text>
        </Link>
      ))}

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
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 16,
  },
  cardArticulo: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10,
  },
  artTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  artRuta: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
  },
});
