import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useComedor } from '../../context/ComedorContext';
import { Boton } from '../../components/Boton';
import { DondeEstoy } from '../../components/DondeEstoy';
import { EstadoVacio } from '../../components/EstadoVacio';
import { FilaDato } from '../../components/FilaDato';
import { Grupo } from '../../components/Grupo';
import { NotaCocina } from '../../components/NotaCocina';
import { Pantalla } from '../../components/Pantalla';
import { espacio, tipo } from '../../tema/tokens';

const cantidadDeItems = (cantidad: number) => (cantidad === 1 ? '1 ítem' : `${cantidad} ítems`);

export default function PantallaCocina() {
  const { colaPedidosArray, pedidoFrente, atenderSiguiente } = useComedor();

  const enEspera = colaPedidosArray.length;

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
        <View style={styles.frente}>
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
              <FilaDato key={`${item.id}-${i}`} titulo={item.nombre} />
            ))}
          </Grupo>

          {pedidoFrente.nota ? <NotaCocina titulo="Nota del alumno" nota={pedidoFrente.nota} /> : null}

          <Boton icono="checkmark-outline" titulo="Atender siguiente" onPress={atenderSiguiente} />
        </View>
      )}

      {colaPedidosArray.length > 1 ? (
        <View style={styles.proximos}>
          <Text style={tipo.subtitulo} accessibilityRole="header">
            Próximos turnos
          </Text>
          <Grupo>
            {colaPedidosArray.slice(1).map((ped) => (
              <FilaDato
                key={ped.numeroTurno}
                titulo={`Turno #${ped.numeroTurno}`}
                detalle={cantidadDeItems(ped.items.length)}
                valor={ped.fecha}
              />
            ))}
          </Grupo>
        </View>
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
