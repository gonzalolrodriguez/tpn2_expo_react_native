import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { useComedor } from '../../context/ComedorContext';
import { Boton } from '../../components/Boton';
import { DondeEstoy } from '../../components/DondeEstoy';
import { EstadoVacio } from '../../components/EstadoVacio';
import { FilaDato } from '../../components/FilaDato';
import { Grupo } from '../../components/Grupo';
import { DESAPARECER, Entrada, REACOMODAR, vibrarExito } from '../../components/Movimiento';
import { NotaCocina } from '../../components/NotaCocina';
import { Pantalla } from '../../components/Pantalla';
import { espacio, tipo } from '../../tema/tokens';

const cantidadDeItems = (cantidad: number) => (cantidad === 1 ? '1 ítem' : `${cantidad} ítems`);

export default function PantallaCocina() {
  const { colaPedidosArray, pedidoFrente, atenderSiguiente } = useComedor();

  const enEspera = colaPedidosArray.length;

  const alAtender = () => {
    // Aviso de éxito junto con el cambio visible: entra el pedido que sigue en la cola
    vibrarExito();
    atenderSiguiente();
  };

  return (
    <Pantalla>
      {!pedidoFrente ? (
        <EstadoVacio
          icono="checkmark-done-outline"
          titulo="No hay pedidos en espera"
          mensaje="Cuando un alumno confirme un pedido, va a aparecer acá."
        >
          <Link href="/cocina/atendidos" asChild>
            <Boton variante="secundario" titulo="Ver pedidos atendidos" />
          </Link>
        </EstadoVacio>
      ) : (
        // La key es el turno: al atender, el pedido que pasa al frente entra con su propia animación
        <Entrada key={pedidoFrente.numeroTurno} estilo={styles.frente}>
          {/* Frente de la cola: el pedido que se atiende ahora */}
          <View>
            <Text selectable style={tipo.titulo} accessibilityRole="header">
              Turno #{pedidoFrente.numeroTurno}
            </Text>
            <Text style={tipo.nota}>
              Siguiente en atender, pedido a las {pedidoFrente.fecha}.{' '}
              {enEspera === 1 ? 'Es el único en espera.' : `Hay ${enEspera} pedidos en espera.`}
            </Text>
          </View>

          <Grupo>
            {pedidoFrente.items.map((item, i) => (
              <FilaDato key={`${item.id}-${i}`} miniatura={item} titulo={item.nombre} />
            ))}
          </Grupo>

          {pedidoFrente.nota ? <NotaCocina titulo="Nota del alumno" nota={pedidoFrente.nota} /> : null}

          <Boton icono="checkmark-outline" titulo="Atender siguiente" onPress={alAtender} />
        </Entrada>
      )}

      {colaPedidosArray.length > 1 ? (
        <Animated.View layout={REACOMODAR} style={styles.proximos}>
          <Text style={tipo.subtitulo} accessibilityRole="header">
            Próximos turnos
          </Text>
          <Grupo>
            {/* El turno que pasa al frente se desvanece de esta lista y los demás suben */}
            {colaPedidosArray.slice(1).map((ped) => (
              <Animated.View key={ped.numeroTurno} exiting={DESAPARECER} layout={REACOMODAR}>
                <FilaDato
                  titulo={`Turno #${ped.numeroTurno}`}
                  detalle={cantidadDeItems(ped.items.length)}
                  valor={ped.fecha}
                />
              </Animated.View>
            ))}
          </Grupo>
        </Animated.View>
      ) : null}

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  frente: {
    gap: espacio.md,
  },
  proximos: {
    // Más aire arriba del título que debajo: el título pertenece a su lista
    marginTop: espacio.sm,
    gap: espacio.sm,
  },
});
