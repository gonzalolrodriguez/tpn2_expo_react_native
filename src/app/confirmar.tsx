import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useComedor } from '../context/ComedorContext';
import { DondeEstoy } from '../components/DondeEstoy';

export default function PantallaConfirmar() {
  const { carrito, totalCarrito, notaCarrito, confirmarPedido } = useComedor();

  const handleConfirmar = () => {
    const pedidoCreado = confirmarPedido();
    if (pedidoCreado) {
      // Importante: Usamos router.replace para que al presionar atrás no vuelva a la pantalla de confirmación
      router.replace(`/turno/${pedidoCreado.numeroTurno}`);
    }
  };

  if (carrito.length === 0) {
    return (
      <View style={styles.vacioContainer}>
        <Text style={styles.vacioText}>No hay productos en el carrito para confirmar.</Text>
        <Pressable style={styles.btnVolver} onPress={() => router.back()}>
          <Text style={styles.btnVolverText}>Volver al carrito</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>📋 Resumen del Pedido</Text>

      <View style={styles.cardResumen}>
        <Text style={styles.secTitulo}>Productos seleccionados:</Text>
        {carrito.map((item, i) => (
          <View key={`${item.id}-${i}`} style={styles.row}>
            <Text style={styles.itemNombre}>{item.nombre}</Text>
            <Text style={styles.itemPrecio}>${item.precio.toLocaleString('es-AR')}</Text>
          </View>
        ))}

        {notaCarrito ? (
          <View style={styles.notaBox}>
            <Text style={styles.notaLabel}>Aclaración para cocina:</Text>
            <Text style={styles.notaValue}>"{notaCarrito}"</Text>
          </View>
        ) : null}

        <View style={styles.divider} />

        <View style={styles.rowTotal}>
          <Text style={styles.totalLabel}>TOTAL A PAGAR:</Text>
          <Text style={styles.totalValor}>${totalCarrito.toLocaleString('es-AR')}</Text>
        </View>
      </View>

      <Text style={styles.aviso}>
        Al hacer clic en "Confirmar", tu pedido ingresará en la **Cola de la Cocina** y se te asignará un número de turno correlativo.
      </Text>

      <Pressable style={styles.btnConfirmar} onPress={handleConfirmar}>
        <Text style={styles.btnConfirmarText}>🚀 Enviar a Cocina y Generar Turno</Text>
      </Pressable>

      <Pressable style={styles.btnCancelar} onPress={() => router.back()}>
        <Text style={styles.btnCancelarText}>Cancelar</Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
  },
  vacioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  vacioText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  btnVolver: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnVolverText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  cardResumen: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  secTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemNombre: {
    fontSize: 14,
    color: '#1e293b',
  },
  itemPrecio: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
  },
  notaBox: {
    backgroundColor: '#fffbeb',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  notaLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#b45309',
  },
  notaValue: {
    fontSize: 12,
    color: '#78350f',
  },
  divider: {
    height: 1,
    backgroundColor: '#cbd5e1',
    marginVertical: 12,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  totalValor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  aviso: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 18,
  },
  btnConfirmar: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnConfirmarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnCancelar: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnCancelarText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
});
