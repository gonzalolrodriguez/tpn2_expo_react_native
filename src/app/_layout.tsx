import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ComedorProvider, useComedor } from '../context/ComedorContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Componente helper para soportar la sintaxis Stack.Protected utilizada en la teoría del TP
const StackProtected: React.FC<{ guard: boolean; children: React.ReactNode }> = ({ guard, children }) => {
  return guard ? <>{children}</> : null;
};

const ProtectedStack = Object.assign(Stack, {
  Protected: StackProtected,
}) as typeof Stack & {
  Protected: React.FC<{ guard: boolean; children: React.ReactNode }>;
};

function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <ProtectedStack screenOptions={{ headerStyle: { backgroundColor: '#2563eb' }, headerTintColor: '#fff' }}>
      {/* Pestañas principales */}
      <ProtectedStack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Rutas dinámicas en el Stack raíz */}
      <ProtectedStack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <ProtectedStack.Screen name="buscar" options={{ title: 'Buscador de Platos' }} />

      {/* Flujo de pedido */}
      <ProtectedStack.Screen name="confirmar" options={{ presentation: 'modal', title: 'Confirmar Pedido' }} />
      <ProtectedStack.Screen name="turno/[numero]" options={{ title: 'Su Turno' }} />

      {/* Ayuda y Redirección */}
      <ProtectedStack.Screen name="ayuda/index" options={{ title: 'Centro de Ayuda' }} />
      <ProtectedStack.Screen name="ayuda/[...slug]" options={{ title: 'Artículo de Ayuda' }} />
      <ProtectedStack.Screen name="pedido" options={{ title: 'Redireccionando...' }} />

      {/* Rutas protegidas con Stack.Protected */}
      <ProtectedStack.Protected guard={conSesion}>
        <ProtectedStack.Screen name="cocina" options={{ headerShown: false }} />
      </ProtectedStack.Protected>

      <ProtectedStack.Protected guard={!conSesion}>
        <ProtectedStack.Screen name="login" options={{ presentation: 'modal', title: 'Iniciar Sesión - Cocina' }} />
      </ProtectedStack.Protected>

      {/* Pantalla 404 */}
      <ProtectedStack.Screen name="+not-found" options={{ title: 'Pantalla no encontrada' }} />
    </ProtectedStack>
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
