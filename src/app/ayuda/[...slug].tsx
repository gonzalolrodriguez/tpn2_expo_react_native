import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaAyudaCatchAll() {
  const { slug } = useLocalSearchParams<{ slug?: string[] }>();
  const pathCompleto = Array.isArray(slug) ? slug.join(' / ') : slug;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: `Ayuda: ${slug?.[slug.length - 1] || 'Artículo'}` }} />

      <Text style={styles.badge}>Ruta Catch-All ([...slug])</Text>
      <Text style={styles.titulo}>Sección de Ayuda</Text>
      <Text style={styles.subtitulo}>Ruta navegada: /ayuda/{pathCompleto}</Text>

      <View style={styles.cardContenido}>
        <Text style={styles.secTitulo}>Información sobre "{pathCompleto}":</Text>
        <Text style={styles.texto}>
          Esta pantalla demuestra el uso de rutas catch-all (`[...slug].tsx`) en Expo Router. Permite capturar subrutas de profundidad variable como `/ayuda/pagos/efectivo` o `/ayuda/horarios`.
        </Text>
      </View>

      <Pressable style={styles.btnVolver} onPress={() => router.back()}>
        <Text style={styles.btnText}>← Volver a Ayuda</Text>
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
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    fontWeight: 'bold',
    fontSize: 11,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
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
  cardContenido: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  secTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  texto: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  btnVolver: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
