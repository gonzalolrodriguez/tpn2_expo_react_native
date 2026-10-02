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
import { colores, espacio, formatoPrecio, tipo } from '../../tema/tokens';

export default function PantallaAtendidos() {
  const { historialAtendidosArray } = useComedor();

  return (
    <Pantalla>
      {historialAtendidosArray.length === 0 ? (
        <EstadoVacio
          icono="file-tray-outline"
          titulo="Todavía no atendiste pedidos"
          mensaje="Cada pedido que atiendas se apila acá, con el último arriba."
        >
          <Link href="/cocina" asChild>
            <Boton variante="secundario" titulo="Ver pedidos en cola" />
          </Link>
        </EstadoVacio>
      ) : (
        <>
          <Text style={[tipo.cuerpo, styles.intro]}>
            Los pedidos atendidos se guardan en una pila: el último que atendiste aparece primero.
          </Text>

          {historialAtendidosArray.map((pedido, index) => (
            <View key={pedido.numeroTurno} style={styles.pedido}>
              <View>
                <Text selectable style={tipo.subtitulo} accessibilityRole="header">
                  Turno #{pedido.numeroTurno}
                </Text>
                <Text style={tipo.nota}>
                  {index === 0 ? 'Tope de la pila, último atendido.' : `Posición ${index + 1} en la pila.`} Pedido a
                  las {pedido.fecha}.
                </Text>
              </View>

              <Grupo>
                {pedido.items.map((item, i) => (
                  <FilaDato key={`${item.id}-${i}`} titulo={item.nombre} valor={formatoPrecio(item.precio)} />
                ))}
                <FilaDato fuerte titulo="Total cobrado" valor={formatoPrecio(pedido.total)} />
              </Grupo>

              {pedido.nota ? <NotaCocina titulo="Nota del alumno" nota={pedido.nota} /> : null}
            </View>
          ))}
        </>
      )}

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  intro: {
    color: colores.tintaSecundaria,
  },
  pedido: {
    gap: espacio.sm,
  },
});
