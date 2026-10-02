import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useComedor } from '../../context/ComedorContext';
import { Boton } from '../../components/Boton';
import { DondeEstoy } from '../../components/DondeEstoy';
import { EstadoVacio } from '../../components/EstadoVacio';
import { FilaDato } from '../../components/FilaDato';
import { Grupo } from '../../components/Grupo';
import { Pantalla } from '../../components/Pantalla';
import { colores, espacio, tipo } from '../../tema/tokens';

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
      <Pantalla>
        <EstadoVacio
          icono="alert-circle-outline"
          titulo="No encontramos ese turno"
          mensaje={`No hay ningún pedido con el turno "${numero}". Revisá el número o hacé un pedido nuevo.`}
        >
          <Boton variante="secundario" titulo="Volver al inicio" onPress={() => router.replace('/')} />
        </EstadoVacio>
        <DondeEstoy />
      </Pantalla>
    );
  }

  const tiempoEstimadoMinutos = posicionAdelante * 3;

  if (atendido) {
    return (
      <Pantalla>
        <View style={styles.turno}>
          {/* El número de turno es el único momento fuerte de la app */}
          <Text selectable style={tipo.numero} accessibilityLabel={`Turno ${numTurno}`}>
            #{numTurno}
          </Text>
          <Text style={[tipo.subtitulo, styles.centrado]}>Tu pedido está listo</Text>
          <Text style={[tipo.cuerpo, styles.estado]}>La cocina ya lo atendió. Pasá a retirarlo.</Text>
        </View>

        <Boton variante="secundario" titulo="Volver al inicio" onPress={() => router.replace('/')} />

        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <View style={styles.turno}>
        {/* El número de turno es el único momento fuerte de la app */}
        <Text selectable style={tipo.numero} accessibilityLabel={`Turno ${numTurno}`}>
          #{numTurno}
        </Text>
        <Text style={[tipo.subtitulo, styles.centrado]}>
          {posicionAdelante === 0 ? 'Sos el próximo' : 'Tu pedido está en la cola'}
        </Text>
        <Text style={[tipo.cuerpo, styles.estado]}>
          La cocina atiende los pedidos por orden de llegada. Te avisamos acá cuando esté listo.
        </Text>
      </View>

      <Grupo>
        <FilaDato titulo="Pedidos adelante tuyo" valor={String(posicionAdelante)} />
        <FilaDato
          titulo="Espera estimada"
          detalle="Unos 3 minutos por pedido"
          valor={`${tiempoEstimadoMinutos} min`}
        />
        <FilaDato titulo="Pedidos en la cola" valor={String(colaPedidosArray.length)} />
      </Grupo>

      <Boton variante="secundario" titulo="Volver al inicio" onPress={() => router.replace('/')} />

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  turno: {
    alignItems: 'center',
    gap: espacio.xs,
    paddingVertical: espacio.xl,
  },
  centrado: {
    textAlign: 'center',
  },
  estado: {
    textAlign: 'center',
    color: colores.tintaSecundaria,
  },
});
