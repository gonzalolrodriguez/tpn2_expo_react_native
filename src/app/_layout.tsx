import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ComedorProvider, useComedor } from '../context/ComedorContext';
import { TituloConPila } from '../components/TituloConPila';
import { opcionesHeader } from '../tema/tokens';

export const unstable_settings = {
  anchor: '(tabs)',
};

function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <Stack
      screenOptions={{
        ...opcionesHeader,
        // Desafío opcional: el título muestra cuántas pantallas hay en la pila
        headerTitle: (props) => <TituloConPila {...props} />,
      }}
    >
      {/* Pestañas principales */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Rutas dinámicas en el Stack raíz */}
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar platos' }} />

      {/* Flujo de pedido */}
      <Stack.Screen name="confirmar" options={{ presentation: 'modal', title: 'Confirmar pedido' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />

      {/* Ayuda y Redirección */}
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Artículo de ayuda' }} />
      <Stack.Screen name="pedido" options={{ title: 'Abriendo el carrito' }} />

      {/* Rutas protegidas: cuando el guard es false la pantalla no existe y sale del historial */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Iniciar sesión' }} />
      </Stack.Protected>

      {/* Pantalla 404 */}
      <Stack.Screen name="+not-found" options={{ title: 'Pantalla no encontrada' }} />
    </Stack>
  );
}

export default function LayoutPrincipal() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ComedorProvider>
        <NavegacionRaiz />
      </ComedorProvider>
    </GestureHandlerRootView>
  );
}
