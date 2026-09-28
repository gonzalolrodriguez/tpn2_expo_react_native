import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { useComedor } from '../../../context/ComedorContext';
import { DondeEstoy } from '../../../components/DondeEstoy';

export default function PantallaCarrito() {
  const {
    carrito,
    totalCarrito,
    deshacerUltimo,
    pilaDeshacerTamanio,
    notaCarrito,
    limpiarCarrito,
  } = useComedor();

  const esPilaVacia = pilaDeshacerTamanio === 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {carrito.length === 0 ? (
        <View style={styles.vacioContainer}>
          <Text style={styles.vacioIcono}>🛒</Text>
          <Text style={styles.vacioTitulo}>El carrito está vacío</Text>
          <Text style={styles.vacioSub}>Agregá algunos platos deliciosos desde el menú.</Text>
          <Link href="/menu" style={styles.btnIrMenu}>
            <Text style={styles.btnText}>Ver Menú</Text>
          </Link>
        </View>
      ) : (
        <>
          <View style={styles.headerControl}>
            <Text style={styles.tituloSec}>Ítems agregados ({carrito.length}):</Text>

            {/* Botón Deshacer Último usando la Pila */}
            <Pressable
              style={[styles.btnDeshacer, esPilaVacia && styles.btnDeshacerDeshabilitado]}
              onPress={deshacerUltimo}
              disabled={esPilaVacia}
            >
              <Text style={styles.btnDeshacerText}>
                ↩️ Deshacer último ({pilaDeshacerTamanio})
              </Text>
            </Pressable>
          </View>

          {carrito.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemCategoria}>{item.categoria.toUpperCase()}</Text>
              </View>
              <Text style={styles.itemPrecio}>${item.precio.toLocaleString('es-AR')}</Text>
            </View>
          ))}

          {notaCarrito !== '' && (
            <View style={styles.notaCard}>
              <Text style={styles.notaTitulo}>📝 Nota para cocina:</Text>
              <Text style={styles.notaTexto}>"{notaCarrito}"</Text>
            </View>
          )}

          <Link href="/carrito/nota" style={styles.btnNota}>
            <Text style={styles.btnNotaText}>
              {notaCarrito ? '✏️ Modificar nota para cocina' : '+ Agregar nota / aclaración'}
            </Text>
          </Link>

          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total a Pagar:</Text>
            <Text style={styles.totalValor}>${totalCarrito.toLocaleString('es-AR')}</Text>
          </View>

          <View style={styles.acciones}>
            <Pressable style={styles.btnLimpiar} onPress={limpiarCarrito}>
              <Text style={styles.btnLimpiarText}>Vaciar</Text>
            </Pressable>

            <Pressable style={styles.btnConfirmar} onPress={() => router.push('/confirmar')}>
              <Text style={styles.btnConfirmarText}>Confirmar Pedido ➔</Text>
            </Pressable>
          </View>
        </>
      )}

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
  vacioContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  vacioIcono: {
    fontSize: 50,
    marginBottom: 12,
  },
  vacioTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
  },
  vacioSub: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  btnIrMenu: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tituloSec: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  btnDeshacer: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  btnDeshacerDeshabilitado: {
    backgroundColor: '#cbd5e1',
  },
  btnDeshacerText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemRow: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemNombre: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  itemCategoria: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: 'bold',
  },
  itemPrecio: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  notaCard: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  notaTitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#b45309',
  },
  notaTexto: {
    fontSize: 14,
    color: '#78350f',
    marginTop: 2,
    fontStyle: 'italic',
  },
  btnNota: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  btnNotaText: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: 'bold',
  },
  totalCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  totalValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  acciones: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  btnLimpiar: {
    backgroundColor: '#94a3b8',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnLimpiarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnConfirmar: {
    flex: 1,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnConfirmarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
