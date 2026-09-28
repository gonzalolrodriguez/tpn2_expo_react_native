import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useComedor } from '../../context/ComedorContext';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaAtendidos() {
  const { historialAtendidosArray } = useComedor();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>📚 Historial de Pedidos Atendidos</Text>
      <Text style={styles.subtitulo}>
        Los pedidos atendidos se apilan en una <Text style={styles.bold}>Pila</Text>. Se muestran del tope a la base (último atendido primero).
      </Text>

      {historialAtendidosArray.length === 0 ? (
        <View style={styles.vacioCard}>
          <Text style={styles.vacioText}>Aún no se ha atendido ningún pedido.</Text>
        </View>
      ) : (
        historialAtendidosArray.map((pedido, index) => (
          <View key={pedido.numeroTurno} style={styles.cardPedido}>
            <View style={styles.cardHeader}>
              <Text style={styles.turnoText}>Turno #{pedido.numeroTurno}</Text>
              <Text style={styles.posicionText}>
                {index === 0 ? '🔝 TOPE DE LA PILA (Último atendido)' : `Posición en pila: ${index + 1}`}
              </Text>
            </View>

            <Text style={styles.metaText}>Hora del pedido: {pedido.fecha}</Text>
            <Text style={styles.metaText}>Total cobrado: ${pedido.total.toLocaleString('es-AR')}</Text>

            <Text style={styles.itemsLabel}>Platos preparados:</Text>
            {pedido.items.map((item, i) => (
              <Text key={`${item.id}-${i}`} style={styles.itemNombre}>
                • {item.nombre} (${item.precio.toLocaleString('es-AR')})
              </Text>
            ))}

            {pedido.nota ? (
              <Text style={styles.notaText}>Nota: "{pedido.nota}"</Text>
            ) : null}
          </View>
        ))
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
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: '#16a34a',
  },
  vacioCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  vacioText: {
    color: '#64748b',
  },
  cardPedido: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 6,
    marginBottom: 8,
  },
  turnoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  posicionText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  metaText: {
    fontSize: 12,
    color: '#475569',
  },
  itemsLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 8,
    marginBottom: 4,
  },
  itemNombre: {
    fontSize: 13,
    color: '#1e293b',
  },
  notaText: {
    fontSize: 12,
    color: '#b45309',
    fontStyle: 'italic',
    marginTop: 6,
  },
});
