import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { PLATOS, Plato } from '../../../data/platos';
import { useComedor } from '../../../context/ComedorContext';
import { Boton } from '../../../components/Boton';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { EstadoVacio } from '../../../components/EstadoVacio';
import { FilaDato } from '../../../components/FilaDato';
import { Grupo } from '../../../components/Grupo';
import { Pantalla } from '../../../components/Pantalla';
import { colores, espacio, formatoPrecio, tipo } from '../../../tema/tokens';

const NOMBRE_CATEGORIA: Record<Plato['categoria'], string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  bebidas: 'Bebidas',
  kiosco: 'Kiosco',
};

export default function PantallaDetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito, carrito } = useComedor();

  const idNumerico = Number(id);
  const plato = PLATOS.find((p) => p.id === idNumerico);

  if (!id || isNaN(idNumerico) || !plato) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Plato no encontrado' }} />
        <EstadoVacio
          icono="alert-circle-outline"
          titulo="Ese plato no existe"
          mensaje={`No hay ningún plato con el código "${id}". Buscalo en el menú.`}
        >
          <Link href="/menu" asChild>
            <Boton titulo="Ver el menú" />
          </Link>
        </EstadoVacio>
        <DondeEstoy />
      </Pantalla>
    );
  }

  const enCarrito = carrito.filter((item) => item.id === plato.id).length;

  return (
    <Pantalla>
      {/* Actualiza dinámicamente el título del header */}
      <Stack.Screen options={{ title: plato.nombre }} />

      {/* El header corta los nombres largos, por eso el nombre completo se repite acá */}
      <View style={styles.encabezado}>
        <Text style={tipo.titulo} accessibilityRole="header">
          {plato.nombre}
        </Text>
        <Text style={[tipo.cuerpo, styles.descripcion]}>{plato.descripcion}</Text>
      </View>

      <Grupo>
        <FilaDato titulo="Categoría" valor={NOMBRE_CATEGORIA[plato.categoria]} />
        <FilaDato titulo="Precio" valor={formatoPrecio(plato.precio)} />
      </Grupo>

      <View style={styles.accion}>
        <Boton icono="cart-outline" titulo="Agregar al carrito" onPress={() => agregarAlCarrito(plato)} />
        {enCarrito > 0 ? (
          <Text style={[tipo.nota, styles.confirmacion]} accessibilityLiveRegion="polite">
            {enCarrito === 1 ? 'Ya tenés 1 en el carrito.' : `Ya tenés ${enCarrito} en el carrito.`}
          </Text>
        ) : null}
      </View>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    gap: espacio.sm,
  },
  descripcion: {
    color: colores.tintaSecundaria,
  },
  accion: {
    gap: espacio.sm,
  },
  confirmacion: {
    textAlign: 'center',
  },
});
