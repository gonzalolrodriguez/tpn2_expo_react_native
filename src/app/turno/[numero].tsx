import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useComedor } from '../../context/ComedorContext';
import { DondeEstoy } from '../../components/DondeEstoy';

export default function PantallaTurno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { obtenerPosicionEnCola, colaPedidosArray, historialAtendidosArray } = useComedor();

  const numTurno = Number(numero);
  const posicionAdelante = obtenerPosicionEnCola(numTurno);
  const enCola = posicionAdelante !== -1;
  const atendido = historialAtendidosArray.some((p) => p.numeroTurno === numTurno);

  // El parámetro llega de la URL: puede no ser un número o no corresponder a ningún pedido
  if (!Number.isInteger(numTurno) || numTurno < 1 || (!enCola && !atendido)) {
    return (
      <View style={[styles.container, styles.content]}>
        <View style={styles.cardTurno}>
          <Text style={styles.labelTurno}>TURNO NO ENCONTRADO</Text>
          <Text style={styles.estadoError}>No existe ningún pedido con el turno "{numero}".</Text>
        </View>
        <Pressable style={styles.btnVolver} onPress={() => router.replace('/')}>
          <Text style={styles.btnText}>🏠 Volver al Inicio</Text>
        </Pressable>
        <DondeEstoy />
      </View>
    );
  }

  const tiempoEstimadoMinutos = posicionAdelante * 3;

  if (atendido) {
    return (
      <View style={[styles.container, styles.content]}>
        <View style={styles.cardTurno}>
          <Text style={styles.labelTurno}>TURNO</Text>
          <Text style={styles.numeroTurno}>#{numTurno}</Text>
          <Text style={styles.estado}>🍽️ Tu pedido ya fue atendido. ¡Pasá a retirarlo!</Text>
        </View>
        <Pressable style={styles.btnVolver} onPress={() => router.replace('/')}>
          <Text style={styles.btnText}>🏠 Volver al Inicio</Text>
        </Pressable>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.cardTurno}>
        <Text style={styles.labelTurno}>SU NÚMERO DE TURNO ES</Text>
        <Text style={styles.numeroTurno}>#{numTurno}</Text>
        <Text style={styles.estado}>✅ Pedido ingresado en la cola de la cocina</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitulo}>📊 Estado en tiempo real:</Text>
        <Text style={styles.infoTexto}>
          • Pedidos adelante tuyo en la cola: <Text style={styles.bold}>{posicionAdelante}</Text>
        </Text>
        <Text style={styles.infoTexto}>
          • Tiempo estimado de espera: <Text style={styles.bold}>{tiempoEstimadoMinutos} minutos</Text> (aprox. 3 min por pedido)
        </Text>
        <Text style={styles.infoTexto}>
          • Total de pedidos en preparación: <Text style={styles.bold}>{colaPedidosArray.length}</Text>
        </Text>
      </View>

      <Pressable style={styles.btnVolver} onPress={() => router.replace('/')}>
        <Text style={styles.btnText}>🏠 Volver al Inicio</Text>
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
    padding: 20,
    alignItems: 'center',
  },
  cardTurno: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#2563eb',
    marginBottom: 20,
    elevation: 3,
  },
  labelTurno: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
  },
  numeroTurno: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#2563eb',
    marginVertical: 10,
  },
  estado: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  estadoError: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  infoBox: {
    backgroundColor: '#e0f2fe',
    borderColor: '#bae6fd',
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  infoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0369a1',
    marginBottom: 8,
  },
  infoTexto: {
    fontSize: 14,
    color: '#0c4a6e',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  btnVolver: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
