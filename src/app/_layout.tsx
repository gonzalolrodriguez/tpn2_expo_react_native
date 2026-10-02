import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ComedorProvider, useComedor } from '../context/ComedorContext';
import { TituloConPila } from '../components/TituloConPila';

export const unstable_settings = {
  anchor: '(tabs)',
};

function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2563eb' },
        headerTintColor: '#fff',
        // Desafío opcional: el título muestra cuántas pantallas hay en la pila
        headerTitle: (props) => <TituloConPila {...props} />,
      }}
    >
      {/* Pestañas principales */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Rutas dinámicas en el Stack raíz */}
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscador de Platos' }} />

      {/* Flujo de pedido */}
      <Stack.Screen name="confirmar" options={{ presentation: 'modal', title: 'Confirmar Pedido' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Su Turno' }} />

      {/* Ayuda y Redirección */}
      <Stack.Screen name="ayuda/index" options={{ title: 'Centro de Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Artículo de Ayuda' }} />
      <Stack.Screen name="pedido" options={{ title: 'Redireccionando...' }} />

      {/* Rutas protegidas: cuando el guard es false la pantalla no existe y sale del historial */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Iniciar Sesión - Cocina' }} />
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
