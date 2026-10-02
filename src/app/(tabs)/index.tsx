import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DondeEstoy } from '../../components/DondeEstoy';
import { FilaEnlace } from '../../components/FilaEnlace';
import { Grupo } from '../../components/Grupo';
import { Pantalla } from '../../components/Pantalla';
import { Presionable } from '../../components/Presionable';
import { useComedor } from '../../context/ComedorContext';
import { colores, espacio, radio, sombra, tamanioIcono, tipo } from '../../tema/tokens';

export default function PantallaInicio() {
  const { usuario } = useComedor();

  return (
    <Pantalla sinHeader>
      <View style={styles.encabezado}>
        <Text style={tipo.tituloGrande} accessibilityRole="header">
          Comedor IPF
        </Text>
        <Text style={[tipo.cuerpo, styles.saludo]}>Hola, ¿qué vas a pedir hoy?</Text>
      </View>

      {/* Acceso principal: pedir es la tarea central de la app */}
      <Link href="/menu" asChild>
        <Presionable estilo={styles.accesoMenu}>
          <Ionicons name="restaurant-outline" size={tamanioIcono.lg} color={colores.sobreMarca} />
          <View style={styles.accesoTextos}>
            <Text style={[tipo.subtitulo, styles.sobreMarca]}>Ver el menú</Text>
            <Text style={[tipo.nota, styles.sobreMarca]}>Desayunos, almuerzos, bebidas y kiosco</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={tamanioIcono.sm} color={colores.sobreMarca} />
        </Presionable>
      </Link>

      <Grupo>
        <Link href="/buscar" asChild>
          <FilaEnlace icono="search-outline" titulo="Buscar platos" descripcion="Por nombre, ingrediente o categoría" />
        </Link>

        <Link href="/ayuda" asChild>
          <FilaEnlace icono="help-circle-outline" titulo="Ayuda" descripcion="Pagos, horarios y cancelaciones" />
        </Link>

        {usuario ? (
          <Link href="/cocina" asChild>
            <FilaEnlace icono="fast-food-outline" titulo="Panel de cocina" descripcion="Atendé los pedidos en cola" />
          </Link>
        ) : (
          <Link href="/login" asChild>
            <FilaEnlace
              icono="lock-closed-outline"
              titulo="Acceso de cocina"
              descripcion="Solo para el personal del comedor"
            />
          </Link>
        )}
      </Grupo>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    gap: espacio.xs,
  },
  saludo: {
    color: colores.tintaSecundaria,
  },
  accesoMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.md,
    paddingHorizontal: espacio.lg,
    paddingVertical: espacio.xl,
    backgroundColor: colores.marca,
    borderRadius: radio.tarjeta,
    borderCurve: 'continuous',
    boxShadow: sombra.tarjeta,
  },
  accesoTextos: {
    flex: 1,
  },
  sobreMarca: {
    color: colores.sobreMarca,
  },
});
