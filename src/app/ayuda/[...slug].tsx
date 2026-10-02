import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Boton } from '../../components/Boton';
import { DondeEstoy } from '../../components/DondeEstoy';
import { FilaDato } from '../../components/FilaDato';
import { Grupo } from '../../components/Grupo';
import { Pantalla } from '../../components/Pantalla';
import { colores, tipo } from '../../tema/tokens';

export default function PantallaAyudaCatchAll() {
  const { slug } = useLocalSearchParams<{ slug?: string[] }>();
  const segmentos = Array.isArray(slug) ? slug : slug ? [slug] : [];
  const pathCompleto = segmentos.join('/');

  return (
    <Pantalla variante="lectura">
      <Stack.Screen options={{ title: `Ayuda: ${slug?.[slug.length - 1] || 'Artículo'}` }} />

      <Text selectable style={tipo.titulo} accessibilityRole="header">
        /ayuda/{pathCompleto}
      </Text>

      <Text style={[tipo.cuerpo, styles.texto]}>
        Esta pantalla usa una ruta catch-all, el archivo [...slug].tsx. Captura subrutas de cualquier profundidad,
        como /ayuda/pagos/efectivo o /ayuda/horarios, y recibe cada tramo por separado.
      </Text>

      {segmentos.length > 0 ? (
        <Grupo>
          {segmentos.map((segmento, i) => (
            <FilaDato key={`${segmento}-${i}`} titulo={`Tramo ${i + 1}`} valor={segmento} />
          ))}
        </Grupo>
      ) : null}

      <Boton variante="secundario" titulo="Volver a ayuda" onPress={() => router.back()} />

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  texto: {
    color: colores.tintaSecundaria,
  },
});
