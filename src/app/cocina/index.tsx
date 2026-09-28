import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useComedor } from '../../context/ComedorContext';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaCocina() {
  const { colaPedidosArray, atenderSiguiente } = useComedor();

  const pedidoFrente = colaPedidosArray.length > 0 ? colaPedidosArray[0] : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerInfo}>
        <Text style={styles.titulo}>🍳 Panel de Cocina</Text>
        <Text style={styles.subtitulo}>
          Pedidos en cola en espera: <Text style={styles.badgeCount}>{colaPedidosArray.length}</Text>
        </Text>
      </View>

      {!pedidoFrente ? (
        <View style={styles.vacioCard}>
          <Text style={styles.vacioIcono}>✨</Text>
          <Text style={styles.vacioTexto}>¡No hay pedidos pendientes en la cola!</Text>
          <Text style={styles.vacioSub}>Los nuevos pedidos confirmados por los alumnos aparecerán aquí automáticamente.</Text>
        </View>
      ) : (
        <View style={styles.cardFrente}>
          <View style={styles.cardFrenteHeader}>
            <Text style={styles.frenteTag}>SIGUIENTE EN ATENDER (FRENTE DE COLA)</Text>
            <Text style={styles.frenteTurno}>Turno #{pedidoFrente.numeroTurno}</Text>
            <Text style={styles.frenteHora}>Hora: {pedidoFrente.fecha}</Text>
          </View>

          <Text style={styles.secLabel}>Platos a preparar:</Text>
          {pedidoFrente.items.map((item, i) => (
            <View key={`${item.id}-${i}`} style={styles.itemRow}>
              <Text style={styles.itemCant}>1x</Text>
              <Text style={styles.itemNombre}>{item.nombre}</Text>
            </View>
          ))}

          {pedidoFrente.nota ? (
            <View style={styles.notaBox}>
              <Text style={styles.notaLabel}>⚠️ NOTA ESPECIAL DEL ALUMNO:</Text>
              <Text style={styles.notaTexto}>"{pedidoFrente.nota}"</Text>
            </View>
          ) : null}

          <Pressable style={styles.btnAtender} onPress={atenderSiguiente}>
            <Text style={styles.btnAtenderText}>✅ Atender Siguiente (Desencolar)</Text>
          </Pressable>
        </View>
      )}

      {colaPedidosArray.length > 1 && (
        <View style={styles.proximosBox}>
          <Text style={styles.proximosTitulo}>Próximos turnos en cola:</Text>
          {colaPedidosArray.slice(1).map((ped, idx) => (
            <Text key={ped.numeroTurno} style={styles.proximoItem}>
              {idx + 1}. Turno #{ped.numeroTurno} ({ped.items.length} ítems) - {ped.fecha}
            </Text>
          ))}
        </View>
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
  headerInfo: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitulo: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
  },
  badgeCount: {
    fontWeight: 'bold',
    color: '#16a34a',
  },
  vacioCard: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  vacioIcono: {
    fontSize: 40,
    marginBottom: 10,
  },
  vacioTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  vacioSub: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  cardFrente: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    borderWidth: 2,
    borderColor: '#16a34a',
    marginBottom: 20,
    elevation: 3,
  },
  cardFrenteHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 12,
    marginBottom: 12,
  },
  frenteTag: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#16a34a',
    letterSpacing: 1,
  },
  frenteTurno: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  frenteHora: {
    fontSize: 12,
    color: '#64748b',
  },
  secLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemCant: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    marginRight: 8,
  },
  itemNombre: {
    fontSize: 15,
    color: '#1e293b',
  },
  notaBox: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 12,
  },
  notaLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#b45309',
  },
  notaTexto: {
    fontSize: 13,
    color: '#78350f',
    marginTop: 2,
    fontStyle: 'italic',
  },
  btnAtender: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  btnAtenderText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  proximosBox: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 20,
  },
  proximosTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 6,
  },
  proximoItem: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
});
