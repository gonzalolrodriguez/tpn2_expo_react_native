import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { PLATOS, Plato } from '../../../data/platos';
import { useComedor } from '../../../context/ComedorContext';
import { Boton } from '../../../components/Boton';
import { useDiseno } from '../../../components/Diseno';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { EstadoVacio } from '../../../components/EstadoVacio';
import { ImagenPlato } from '../../../components/ImagenPlato';
import { useConfirmacionBreve, vibrarLeve } from '../../../components/Movimiento';
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
  const { esTablet } = useDiseno();
  const [agregado, confirmar] = useConfirmacionBreve();

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

  const alAgregar = () => {
    // Un toque leve junto con el cambio visible: el tilde del botón y el contador de abajo
    vibrarLeve();
    agregarAlCarrito(plato);
    confirmar();
  };

  const informacion = (
    <View style={styles.informacion}>
      {/* El header corta los nombres largos, por eso el nombre completo se repite acá */}
      <View style={styles.encabezado}>
        <Text style={tipo.nota}>{NOMBRE_CATEGORIA[plato.categoria]}</Text>
        <Text style={esTablet ? tipo.tituloGrande : tipo.titulo} accessibilityRole="header">
          {plato.nombre}
        </Text>
        <Text style={[tipo.cuerpo, styles.descripcion]}>{plato.descripcion}</Text>
      </View>

      <Text selectable style={[tipo.titulo, styles.precio]} accessibilityLabel={`Precio: ${formatoPrecio(plato.precio)}`}>
        {formatoPrecio(plato.precio)}
      </Text>

      <View style={styles.accion}>
        <Boton
          icono={agregado ? 'checkmark-outline' : 'cart-outline'}
          titulo="Agregar al carrito"
          onPress={alAgregar}
        />
        {enCarrito > 0 ? (
          <Text style={[tipo.nota, styles.confirmacion]} accessibilityLiveRegion="polite">
            {enCarrito === 1 ? 'Ya tenés 1 en el carrito.' : `Ya tenés ${enCarrito} en el carrito.`}
          </Text>
        ) : null}
      </View>
    </View>
  );

  // Desde tablet: la foto, redondeada, al lado de la información
  if (esTablet) {
    return (
      <Pantalla>
        {/* Actualiza dinámicamente el título del header */}
        <Stack.Screen options={{ title: plato.nombre }} />

        <View style={styles.ladoALado}>
          <View style={styles.mitad}>
            <ImagenPlato plato={plato} redondeada />
          </View>
          <View style={styles.mitad}>{informacion}</View>
        </View>

        <DondeEstoy />
      </Pantalla>
    );
  }

  // En teléfono: la foto de borde a borde arriba y la información debajo
  return (
    <Pantalla cabecera={<ImagenPlato plato={plato} />}>
      {/* Actualiza dinámicamente el título del header */}
      <Stack.Screen options={{ title: plato.nombre }} />

      {informacion}

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  ladoALado: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: espacio.xl,
  },
  mitad: {
    flex: 1,
  },
  informacion: {
    gap: espacio.lg,
  },
  encabezado: {
    gap: espacio.sm,
  },
  descripcion: {
    color: colores.tintaSecundaria,
  },
  precio: {
    fontVariant: ['tabular-nums'],
  },
  accion: {
    gap: espacio.sm,
  },
  confirmacion: {
    textAlign: 'center',
  },
});
