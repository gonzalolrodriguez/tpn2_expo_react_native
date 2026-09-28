import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useComedor } from '../../../context/ComedorContext';
import { DondeEstoy } from '../../../components/DondeEstoy';

export default function PantallaNotaCarrito() {
  const { notaCarrito, setNotaCarrito } = useComedor();
  const [texto, setTexto] = useState(notaCarrito);

  const guardar = () => {
    setNotaCarrito(texto);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📝 Nota o aclaración para la cocina</Text>
      <Text style={styles.subtitulo}>
        Indicá detalles como "sin sal", "mayonesa aparte", "bien cocido", etc.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí tu aclaración aquí..."
        value={texto}
        onChangeText={setTexto}
        multiline
        numberOfLines={3}
      />

      <View style={styles.acciones}>
        <Pressable style={styles.btnGuardar} onPress={guardar}>
          <Text style={styles.btnText}>Guardar Nota</Text>
        </Pressable>
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1e293b',
    textAlignVertical: 'top',
    height: 100,
    marginBottom: 20,
  },
  acciones: {
    alignItems: 'flex-end',
  },
  btnGuardar: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
