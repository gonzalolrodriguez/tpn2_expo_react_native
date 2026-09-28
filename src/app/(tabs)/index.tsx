import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DondeEstoy } from '../../components/DondeEstoy';
import { useComedor } from '../../context/ComedorContext';

export default function PantallaInicio() {
  const { usuario } = useComedor();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.saludo}>¡Hola! Bienvenid@ a</Text>
        <Text style={styles.titulo}>Comedor IPF 🍽️</Text>
        <Text style={styles.subtitulo}>¿Qué vas a pedir hoy?</Text>
      </View>

      <Text style={styles.seccionTitulo}>Acceso Rápido</Text>

      <View style={styles.grid}>
        <Link href="/menu" style={[styles.card, { backgroundColor: '#dbeafe' }]}>
          <Ionicons name="restaurant" size={32} color="#2563eb" />
          <Text style={styles.cardTitulo}>Ver Menú</Text>
          <Text style={styles.cardDesc}>Explora todos nuestros platos por categoría</Text>
        </Link>

        <Link href="/buscar" style={[styles.card, { backgroundColor: '#fef3c7' }]}>
          <Ionicons name="search" size={32} color="#d97706" />
          <Text style={styles.cardTitulo}>Buscar Platos</Text>
          <Text style={styles.cardDesc}>Filtra por nombre o por tu categoría favorita</Text>
        </Link>

        <Link href="/ayuda" style={[styles.card, { backgroundColor: '#e0e7ff' }]}>
          <Ionicons name="help-circle" size={32} color="#4f46e5" />
          <Text style={styles.cardTitulo}>Centro de Ayuda</Text>
          <Text style={styles.cardDesc}>Preguntas frecuentes y formas de pago</Text>
        </Link>

        {usuario ? (
          <Link href="/cocina" style={[styles.card, { backgroundColor: '#dcfce7' }]}>
            <Ionicons name="fast-food" size={32} color="#16a34a" />
            <Text style={styles.cardTitulo}>Panel de Cocina</Text>
            <Text style={styles.cardDesc}>Sesión iniciada. Gestionar pedidos en cola</Text>
          </Link>
        ) : (
          <Link href="/login" style={[styles.card, { backgroundColor: '#fee2e2' }]}>
            <Ionicons name="lock-closed" size={32} color="#dc2626" />
            <Text style={styles.cardTitulo}>Acceso Cocina</Text>
            <Text style={styles.cardDesc}>Ingreso exclusivo para personal del comedor</Text>
          </Link>
        )}
      </View>

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
    paddingTop: 40,
  },
  header: {
    marginBottom: 24,
    backgroundColor: '#2563eb',
    padding: 20,
    borderRadius: 16,
  },
  saludo: {
    fontSize: 14,
    color: '#93c5fd',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#bfdbfe',
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  grid: {
    gap: 12,
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 14,
    justifyContent: 'center',
  },
  cardTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 8,
  },
  cardDesc: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
});
