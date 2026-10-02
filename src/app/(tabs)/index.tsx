import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { PLATOS, Plato } from '../../data/platos';
import { Carrusel } from '../../components/Carrusel';
import { useDiseno } from '../../components/Diseno';
import { DondeEstoy } from '../../components/DondeEstoy';
import { FilaEnlace } from '../../components/FilaEnlace';
import { Grupo } from '../../components/Grupo';
import { HeroMarca } from '../../components/HeroMarca';
import { Entrada } from '../../components/Movimiento';
import { Pantalla } from '../../components/Pantalla';
import { TarjetaFoto } from '../../components/TarjetaFoto';
import { useComedor } from '../../context/ComedorContext';
import { diseno, espacio, formatoPrecio, tipo } from '../../tema/tokens';

// Códigos de los platos que se muestran en el inicio: uno fuerte de cada momento del día
const CODIGOS_DESTACADOS = [4, 3, 7, 8];
const DESTACADOS = CODIGOS_DESTACADOS.map((codigo) => PLATOS.find((plato) => plato.id === codigo)).filter(
  (plato): plato is Plato => plato !== undefined,
);
// La portada que lleva al menú usa la foto de las empanadas; si faltara, la del primer plato
const PORTADA_MENU = PLATOS.find((plato) => plato.id === 5) ?? PLATOS[0];

export default function PantallaInicio() {
  const { usuario } = useComedor();
  const { esTablet, esEscritorio } = useDiseno();

  const destacados = DESTACADOS.map((plato) => (
    <Link key={plato.id} href={`/menu/${plato.id}`} asChild>
      <TarjetaFoto
        plato={plato}
        titulo={plato.nombre}
        detalle={formatoPrecio(plato.precio)}
        accessibilityHint="Abre el detalle del plato"
        // En escritorio entran las cuatro a la vez; en pantallas más angostas la fila se desplaza
        contenedor={esEscritorio ? styles.destacadoFlexible : styles.destacadoFijo}
      />
    </Link>
  ));

  return (
    <Pantalla sinHeader cabecera={<HeroMarca titulo="Comedor IPF" bajada="Hola, ¿qué vas a pedir hoy?" />}>
      {/* Las secciones entran escalonadas una sola vez, al abrir la app */}
      <Entrada indice={0} estilo={styles.seccion}>
        <Text style={tipo.titulo} accessibilityRole="header">
          Destacados
        </Text>
        {esEscritorio ? (
          <View style={styles.destacadosFila}>{destacados}</View>
        ) : (
          <Carrusel etiqueta="Platos destacados" separacion="md">
            {destacados}
          </Carrusel>
        )}
      </Entrada>

      <Entrada indice={1} estilo={styles.seccion}>
        <Text style={tipo.titulo} accessibilityRole="header">
          Accesos rápidos
        </Text>

        <View style={esTablet ? styles.accesosFila : styles.accesosColumna}>
          {/* Acceso principal: pedir es la tarea central de la app */}
          <View style={esTablet ? styles.mitad : null}>
            <Link href="/menu" asChild>
              <TarjetaFoto
                plato={PORTADA_MENU}
                titulo="Ver el menú"
                detalle="Desayunos, almuerzos, bebidas y kiosco"
                proporcion={diseno.proporcionPortada}
              />
            </Link>
          </View>

          <View style={esTablet ? styles.mitad : null}>
            <Grupo>
              <Link href="/buscar" asChild>
                <FilaEnlace
                  icono="search-outline"
                  titulo="Buscar platos"
                  descripcion="Por nombre, ingrediente o categoría"
                />
              </Link>

              <Link href="/ayuda" asChild>
                <FilaEnlace icono="help-circle-outline" titulo="Ayuda" descripcion="Pagos, horarios y cancelaciones" />
              </Link>

              {usuario ? (
                <Link href="/cocina" asChild>
                  <FilaEnlace
                    icono="fast-food-outline"
                    titulo="Panel de cocina"
                    descripcion="Atendé los pedidos en cola"
                  />
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
          </View>
        </View>
      </Entrada>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  seccion: {
    gap: espacio.sm,
  },
  destacadosFila: {
    flexDirection: 'row',
    gap: espacio.lg,
  },
  // Objetos planos: <Link asChild> los combina con su propio style
  destacadoFijo: {
    width: diseno.tarjetaDestacada,
  },
  destacadoFlexible: {
    flex: 1,
  },
  accesosColumna: {
    gap: espacio.lg,
  },
  // Desde tablet, la portada del menú y el resto de los accesos van lado a lado
  accesosFila: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: espacio.lg,
  },
  mitad: {
    flex: 1,
  },
});
