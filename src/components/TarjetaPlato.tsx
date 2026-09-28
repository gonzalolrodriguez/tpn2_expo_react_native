import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Plato } from '../data/platos';
import { useComedor } from '../context/ComedorContext';

interface Props {
  plato: Plato;
  mostrarBotonAgregar?: boolean;
}

export const TarjetaPlato: React.FC<Props> = ({ plato, mostrarBotonAgregar = true }) => {
  const { agregarAlCarrito } = useComedor();

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nombre}>{plato.nombre}</Text>
        <Text style={styles.descripcion} numberOfLines={2}>
          {plato.descripcion}
        </Text>
        <Text style={styles.precio}>${plato.precio.toLocaleString('es-AR')}</Text>
      </View>
      <View style={styles.acciones}>
        <Link href={`/menu/${plato.id}`} style={styles.btnDetalle}>
          <Text style={styles.btnTextSecundario}>Ver Detalle</Text>
        </Link>
        {mostrarBotonAgregar && (
          <Pressable style={styles.btnAgregar} onPress={() => agregarAlCarrito(plato)}>
            <Text style={styles.btnText}>+ Agregar</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  info: {
    marginBottom: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  descripcion: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 6,
  },
  acciones: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  btnDetalle: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
  },
  btnAgregar: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#2563eb',
  },
  btnTextSecundario: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  btnText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
