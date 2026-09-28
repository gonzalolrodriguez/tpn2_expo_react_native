# Comedor IPF 🍽️ - App de Pedidos

Aplicación móvil desarrollada con **React Native**, **Expo Router (SDK 57)** y **TypeScript** para el Comedor del Instituto Politécnico Formosa.

El sistema combina dos estructuras de datos desarrolladas a medida:
* **Cola (FIFO):** Para el procesamiento de los pedidos de comida en la cocina en orden estricto de llegada sin permitir que nadie se cuele.
* **Pila (LIFO):** Para la función de "Deshacer último plato" en el carrito y para el historial de pedidos atendidos en la cocina.

---

## 📁 Árbol de Carpetas (`src/app`) y Navegadores

```text
src/
├── app/
│   ├── _layout.tsx                     -> Stack Raíz (Context, GestureHandlerRootView, Stack.Protected, unstable_settings)
│   ├── (tabs)/
│   │   ├── _layout.tsx                 -> Navegador Tabs (Inicio, Menú, Carrito) con Badge de ítems
│   │   ├── index.tsx                   -> Ruta '/' (Pestaña Inicio: saludo y accesos rápidos)
│   │   ├── menu/
│   │   │   ├── _layout.tsx             -> Stack interno de la pestaña Menú
│   │   │   ├── index.tsx               -> Ruta '/menu' (Lista de platos por categoría)
│   │   │   └── [id].tsx                -> Ruta '/menu/[id]' (Detalle del plato con validación y título dinámico)
│   │   └── carrito/
│   │       ├── _layout.tsx             -> Stack interno de la pestaña Carrito
│   │       ├── index.tsx               -> Ruta '/carrito' (Pila de deshacer, total, nota y confirmación)
│   │       └── nota.tsx                -> Ruta '/carrito/nota' (Hoja inferior formSheet para nota a cocina)
│   ├── categorias/
│   │   └── [categoria].tsx             -> Ruta '/categorias/[categoria]' (Stack raíz: filtro por categoría)
│   ├── buscar.tsx                      -> Ruta '/buscar' (Stack raíz: buscador con query params en URL)
│   ├── confirmar.tsx                   -> Ruta '/confirmar' (Stack raíz: modal de confirmación)
│   ├── turno/
│   │   └── [numero].tsx                -> Ruta '/turno/[numero]' (Stack raíz: ticket de turno y espera estimada)
│   ├── login.tsx                       -> Ruta '/login' (Stack raíz: modal protegido para sin sesión)
│   ├── cocina/
│   │   ├── _layout.tsx                 -> Navegador Drawer (solo con sesión iniciada)
│   │   ├── index.tsx                   -> Ruta '/cocina' (Frente de cola y botón desencolar)
│   │   └── atendidos.tsx               -> Ruta '/cocina/atendidos' (Pila de historial de atendidos)
│   ├── ayuda/
│   │   ├── index.tsx                   -> Ruta '/ayuda' (Índice de ayuda)
│   │   └── [...slug].tsx               -> Ruta '/ayuda/...' (Catch-all para artículos de ayuda)
│   ├── pedido.tsx                      -> Ruta '/pedido' (Redirección <Redirect href="/carrito" />)
│   └── +not-found.tsx                  -> Pantalla 404 para URLs inexistentes
├── components/
│   ├── DondeEstoy.tsx                  -> Inspector de ruta DEBUG (usePathname, useSegments, useLocalSearchParams)
│   └── TarjetaPlato.tsx                -> Componente reutilizable para platos
├── context/
│   └── ComedorContext.tsx              -> Contexto global (sesión, carrito, Pila de deshacer, Cola de pedidos)
├── data/
│   └── platos.ts                       -> 12 platos de ejemplo distribuidos en 4 categorías
└── estructuras/
    ├── Pila.ts                         -> Clase Pila con #items privada, tamanio y aArray()
    └── Cola.ts                         -> Clase Cola con #items e #frente privada (sin shift), tamanio y aArray()
```

### Navegador de cada `_layout`:
1. `src/app/_layout.tsx`: **Stack Raíz**. Controla la navegación global, envuelve la app con el `ComedorProvider` y `GestureHandlerRootView`, y usa `Stack.Protected` para las rutas `/login` (guard: `!conSesion`) y `/cocina` (guard: `conSesion`).
2. `src/app/(tabs)/_layout.tsx`: **Tabs**. Muestra la barra de pestañas inferior para **Inicio**, **Menú** y **Carrito** (con `tabBarBadge`).
3. `src/app/(tabs)/menu/_layout.tsx`: **Stack**. Permite navegar de `/menu` a `/menu/[id]` manteniendo visible la barra de pestañas.
4. `src/app/(tabs)/carrito/_layout.tsx`: **Stack**. Permite desplegar la hoja inferior `/carrito/nota` con `presentation: "formSheet"` y `sheetAllowedDetents: [0.5, 0.9]`.
5. `src/app/cocina/_layout.tsx`: **Drawer**. Menú lateral desplegable para alternar entre "Pedidos Activos" (`/cocina`) e "Historial Atendidos" (`/cocina/atendidos`).

---

## 🔄 Justificación de `replace` vs `push` en el flujo de confirmación

En la pantalla `/confirmar`, al presionar el botón "Confirmar Pedido", se utiliza `router.replace('/turno/' + numeroTurno)` en lugar de `router.push()`.

**Justificación:**  
Si usáramos `router.push()`, la pantalla de confirmación `/confirmar` se mantendría guardada en la pila del Stack por debajo de la pantalla de turno. Si el usuario presionara el botón de volver "atrás" desde la pantalla de su ticket de turno, reingresaría a la pantalla de confirmación y podría enviar accidentalmente el mismo pedido por segunda vez (duplicando el pedido y colando un segundo turno innecesario).  

Al utilizar **`router.replace()`**, destruimos la pantalla de confirmación de la pila de navegación y la reemplazamos directamente por el ticket de turno `/turno/[numero]`. De esta forma, el usuario no puede regresar a la confirmación y su experiencia de navegación es limpia y segura.

---

## 🔗 Deep Links de Prueba

El esquema personalizado está configurado en `app.json` como `"scheme": "comedoripf"`.

### Ejemplos de Deep Links para probar:
* **Ver un plato en particular:**
  * En App instalada / build propia: `comedoripf://menu/1`
  * En Expo Go (desarrollo): `exp://192.168.1.20:8081/--/menu/1`
* **Filtrar por categoría:**
  * `comedoripf://categorias/almuerzo`
* **Buscador directo:**
  * `comedoripf://buscar?q=chipa&categoria=desayuno`

Gracias a `unstable_settings = { anchor: '(tabs)' }` en el layout raíz, abrir un deep link directo a `/menu/1` o `/categorias/bebidas` montará la estructura de pestañas `(tabs)` de fondo, permitiendo que el usuario conserve la navegación por pestañas abajo.

---

## 🚀 Instrucciones para Iniciar la Aplicación

1. Instalar dependencias con Expo:
   ```bash
   npx expo install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npx expo start
   ```
3. Para probar en la web:
   ```bash
   npx expo start --web
   ```
