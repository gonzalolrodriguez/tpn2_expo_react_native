# Trabajo Práctico N° 2

## Expo Router: rutas, navegación, pilas y colas

---

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

**a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?**

- **LIFO (Last In, First Out):** Significa "el último en entrar es el primero en salir". Corresponde a la **Pila** (Stack).
- **FIFO (First In, First Out):** Significa "el primero en entrar es el primero en salir". Corresponde a la **Cola** (Queue).

**b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?**

- **Pila:** Los elementos entran (`push`) y salen (`pop`) siempre por el mismo extremo, llamado el **tope** o cima.
- **Cola:** Los elementos entran (`encolar`) por un extremo llamado el **final** o atrás, y salen (`desencolar`) por el extremo opuesto, llamado el **frente** o adelante.

**c) Dá un ejemplo de la vida real y otro de una aplicación móvil para cada una.**

- **Pila:**
  - Una pila de platos limpios para lavar o guardar. Ponés uno arriba del otro y cuando vas a usar uno, sacás el que está arriba de todo.
  - _App:_ El historial de pantallas al navegar en una app (Stack). Cuando entrás a "Inicio" -> "Productos" -> "Detalle", al tocar el botón "atrás" volvés a la pantalla anterior sacando la última vista del tope.
- **Cola:**
  - La fila para pagar en un supermercado o caja de banco. El primero que llega a la fila es el primero en ser atendido y salir.
  - _App:_ Una lista de reproducción de canciones en Spotify o una cola de subida de fotos/mensajes en segundo plano.

---

### A2. Seguimiento de una pila

Analizando la secuencia del archivo `seguimiento-pila.js`:

```javascript
const p = new Pila();
p.push("Inicio"); // Estado pila: ['Inicio']
p.push("Productos"); // Estado pila: ['Inicio', 'Productos']
p.push("Detalle 3"); // Estado pila: ['Inicio', 'Productos', 'Detalle 3']
p.pop(); // Elimina 'Detalle 3'. Estado: ['Inicio', 'Productos']
p.push("Perfil"); // Estado pila: ['Inicio', 'Productos', 'Perfil']
```

**Respuestas a los `console.log`:**

1. `console.log(p.tope());` -> Imprime: `'Perfil'` (es el elemento que está arriba de todo).
2. `console.log(p.pop());` -> Imprime: `'Perfil'` (desapila y devuelve el elemento del tope).
3. `console.log(p.tope());` -> Imprime: `'Productos'` (ahora el nuevo tope es 'Productos').
4. `console.log(p.vacia);` -> Imprime: `false` (la pila todavía contiene elementos).

**Estado final de la pila (de base a tope):**
`['Inicio', 'Productos']`

---

### A3. Seguimiento de una cola

Analizando la secuencia del archivo `seguimiento-cola.js`:

```javascript
const c = new Cola();
c.encolar("Ana"); // Estado cola: ['Ana']
c.encolar("Beto"); // Estado cola: ['Ana', 'Beto']
c.desencolar(); // Sale 'Ana'. Estado: ['Beto']
c.encolar("Caro"); // Estado cola: ['Beto', 'Caro']
c.encolar("Dani"); // Estado cola: ['Beto', 'Caro', 'Dani']
```

**Respuestas a los `console.log`:**

1. `console.log(c.frente());` -> Imprime: `'Beto'` (es el que está adelante de todo).
2. `console.log(c.desencolar());` -> Imprime: `'Beto'` (desencola y devuelve a Beto).
3. `console.log(c.vacia);` -> Imprime: `false` (quedan elementos en la cola).

**Estado final de la cola (de frente a final):**
`['Caro', 'Dani']`

---

### A4. Análisis de la implementación

**a) En las clases de clase, el array se declara como `#items`. ¿Qué significa el `#` y qué problema evita?**
El símbolo `#` indica que la propiedad es **privada** dentro de la clase en JavaScript. Esto evita que desde afuera del código se modifique directamente el arreglo (por ejemplo hacer `pila.items = []` o `pila.items.pop()`), obligando a interactuar únicamente a través de los métodos definidos (`push`, `pop`, `encolar`, `desencolar`) y protegiendo el encapsulamiento.

**b) La cola usa `array.shift()` para desencolar. ¿Qué problema de rendimiento tiene con colas muy grandes? ¿Cómo lo resuelven las colas "serias"?**
El método `shift()` saca el primer elemento del arreglo pero obliga a mover todos los demás elementos un lugar hacia la izquierda para reacomodar los índices. Con arreglos de miles o millones de elementos, esto tiene un costo de tiempo $O(N)$, lo que vuelve la operación muy lenta. Las colas eficientes lo resuelven guardando un índice o puntero que indica dónde está el frente (`#inicio` o `#frente`), evitando desplazar elementos en memoria y logrando un tiempo constante $O(1)$.

**c) ¿Qué método de array usa la pila para sacar y cuál usa la cola? ¿Por qué no pueden usar el mismo?**
La pila usa `array.pop()` para sacar del final y la cola usa `array.shift()` para sacar del principio. No pueden usar el mismo método porque la pila requiere comportamiento LIFO (saca el último ingresado) mientras que la cola requiere comportamiento FIFO (saca el primer ingresado).

---

### A5. Programación: una cola eficiente

```javascript
class ColaEficiente {
  #items = [];
  #frente = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#frente];
    this.#frente++;
    return elemento;
  }

  frente() {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  get vacia() {
    return this.#frente >= this.#items.length;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}
```

---

### A6. Pila y cola dentro de Expo Router

**a) ¿Qué estructura describe el historial de pantallas de un Stack? ¿Qué pantalla es la visible y qué operación hace "atrás"?**
El historial de un Stack lo describe una **Pila** (Stack). La pantalla visible para el usuario es la que se encuentra en el **tope** de la pila. La operación "atrás" realiza un **`pop()`**, sacando la pantalla actual del tope para mostrar la que estaba inmediatamente abajo.

**b) ¿Qué estructura usa Expo Router para las acciones de navegación? ¿Qué pasa si el usuario toca dos links muy rápido?**
Usa una **Cola** (Queue) de eventos/acciones de navegación. Si el usuario presiona dos enlaces rápidamente, las acciones se encolan en el orden que ocurrieron y se ejecutan secuencialmente una tras otra, evitando conflictos de transiciones simultáneas.

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo                              | URL que genera / función                                                                                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/(tabs)/index.tsx`           | `/` (Pantalla principal dentro de las pestañas. El paréntesis `(tabs)` es un grupo de rutas y no agrega nada a la URL).                                                       |
| `src/app/acerca.tsx`                 | `/acerca`                                                                                                                                                                     |
| `src/app/(tabs)/perfil.tsx`          | `/perfil`                                                                                                                                                                     |
| `src/app/(tabs)/productos/index.tsx` | `/productos`                                                                                                                                                                  |
| `src/app/(tabs)/productos/[id].tsx`  | `/productos/:id` (ej. `/productos/12`). Es una ruta dinámica que recibe el parámetro `id`.                                                                                    |
| `src/app/docs/[...slug].tsx`         | `/docs/*` (ej. `/docs/react/hooks`). Ruta de tipo _catch-all_ para capturar múltiples segmentos.                                                                              |
| `src/app/_layout.tsx`                | No genera una URL. Es el layout raíz donde se definen los navegadores globales (Stack, Context, etc.).                                                                        |
| `src/app/+not-found.tsx`             | No genera una URL directa. Se muestra automáticamente como pantalla 404 cuando la URL ingresada no coincide con ninguna ruta.                                                 |
| `src/app/Boton.tsx`                  | **Genera un problema.** Expo Router intentará interpretarlo como la pantalla `/Boton`. Los componentes auxiliares no deben guardarse en `src/app`, sino en `src/components/`. |

---

### B2. De la URL al archivo

| URL                                                | Archivo (dentro de `src/app`)                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx`                                                                                        |
| `/buscar?q=mate&categoria=kiosco`                  | `src/app/buscar.tsx` (los parámetros `q` y `categoria` no van en el nombre de archivo, se leen con `useLocalSearchParams`). |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios`         | `src/app/ayuda/[...slug].tsx`                                                                                               |
| `/ayuda` (con una pantalla propia)                 | `src/app/ayuda/index.tsx`                                                                                                   |

---

### B3. Verdadero o falso

**a) Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración.**

- **Falso.** Con Expo Router las rutas se crean automáticamente basándose en la estructura de archivos y carpetas dentro de la carpeta `app`.

**b) Los archivos `_layout.tsx` son pantallas que el usuario puede visitar.**

- **Falso.** Los archivos `_layout.tsx` son componentes contenedores que envuelven a las pantallas para estructurar la navegación (Stack, Tabs) o proveedores de contexto.

**c) Una carpeta entre paréntesis, como `(tabs)`, no aparece en la URL.**

- **Verdadero.** Las carpetas con paréntesis sirven para agrupar rutas y aplicar layouts sin sumar un segmento a la URL.

**d) Para agregar una librería conviene usar `npm install`, porque siempre trae la última versión.**

- **Falso.** En proyectos de Expo se recomienda usar `npx expo install`, ya que se encarga de instalar la versión exacta de la librería compatible con la versión del SDK de Expo en uso.

**e) En `package.json`, `"main": "expo-router/entry"` reemplaza al viejo `App.tsx`.**

- **Verdadero.** Le indica al entorno de Expo que el punto de entrada de la aplicación pasa a ser el sistema de ruteo de Expo Router.

**f) La ruta `/_sitemap` lista todas las rutas de la app y sirve para depurar.**

- **Verdadero.** Es una pantalla especial que genera Expo Router en desarrollo para inspeccionar el mapa completo de rutas disponibles.

**g) Si existen `docs/index.tsx` y `docs/[...slug].tsx`, la URL `/docs` muestra `docs/index.tsx`.**

- **Verdadero.** La coincidencia exacta (`index.tsx`) tiene mayor prioridad de ruteo que la ruta dinámica o catch-all.

**h) En SDK 57, `expo-router` usa el mismo número de versión mayor que el SDK (57).**

- **Verdadero.** A partir de versiones recientes, la versión de Expo Router se sincronizó con el número mayor del SDK de Expo.

---

## Parte C · Navegar: `<Link>`, `router` y la pila

### C1. Métodos de router

| Método                    | Qué le hace a la pila                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `router.push(href)`       | **Apila** una nueva pantalla en el tope de la pila de navegación.                                                   |
| `router.navigate(href)`   | Navega a la ruta indicada. Si la pantalla ya estaba en la pila, vuelve a ella sin duplicarla; si no está, la apila. |
| `router.replace(href)`    | **Reemplaza** la pantalla actual por la nueva (desapila la actual e inserta la nueva en el tope).                   |
| `router.back()`           | **Desapila** (`pop`) la pantalla actual para volver a la pantalla anterior.                                         |
| `router.dismissTo(href)`  | Desapila las pantallas acumuladas arriba hasta llegar a la ruta especificada.                                       |
| `router.dismissAll()`     | Desapila todas las pantallas secundarias de la pila del Stack, volviendo a la pantalla raíz.                        |
| `router.canGoBack()`      | Consulta si hay pantallas atrás en la pila para poder desapilar. Devuelve `true` o `false` sin modificar la pila.   |
| `router.setParams({...})` | Modifica los parámetros de búsqueda (query params) de la pantalla actual sin cambiar la pila de navegación.         |

---

### C2. Simulación de la pila

La pila inicia en: `[ /productos ]`

1. `router.push("/productos/1")` -> **Pila:** `[ /productos, /productos/1 ]`
2. `router.push("/productos/2")` -> **Pila:** `[ /productos, /productos/1, /productos/2 ]`
3. `router.navigate("/productos/5")` -> **Pila:** `[ /productos, /productos/1, /productos/2, /productos/5 ]`
4. `router.push("/perfil")` -> **Pila:** `[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]`
5. `router.replace("/buscar")` -> **Pila:** `[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]` _(reemplazó `/perfil`)_
6. `router.back()` -> **Pila:** `[ /productos, /productos/1, /productos/2, /productos/5 ]` _(desapiló `/buscar`)_
7. `router.dismissTo("/productos")` -> **Pila:** `[ /productos ]` _(desapiló todo hasta llegar a `/productos`)_
8. `router.canGoBack()` -> Devuelve **`false`** _(solo queda la pantalla inicial `/productos`)_.

---

### C3. ¿Link o router?

**a) El usuario toca la tarjeta de un producto en una lista.**

- **Opción:** `<Link href="/productos/1">` o `router.push('/productos/1')`.
- **Justificación:** Es una interacción declarativa directa del usuario en un elemento estático de la pantalla.

**b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito.**

- **Opción:** `router.replace('/exito')`.
- **Justificación:** Sucede dentro de una función asíncrona tras validar el envío. Se usa `replace` para que al tocar "atrás" el usuario no vuelva al formulario ya enviado.

**c) Botón "Cancelar" dentro de un modal.**

- **Opción:** `router.back()`.
- **Justificación:** Simplemente desapila y cierra la vista modal actual regresando al estado anterior.

**d) Después de un login exitoso hay que ir a la pantalla principal.**

- **Opción:** `router.replace('/')`.
- **Justificación:** Es navegación programática por código. Con `replace` se quita la pantalla de login de la pila, evitando que el usuario vuelva a ella tocando "atrás".

**e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres pantallas más abajo.**

- **Opción:** `router.dismissTo('/pedidos')` (o `router.navigate('/pedidos')`).
- **Justificación:** Limpia varias pantallas del Stack juntas de una sola vez sin apilar duplicados.

---

### C4. Escribí el código

**a) Un `<Link>` que abra el producto con id 8 usando `href` como objeto.**

```tsx
<Link href={{ pathname: "/productos/[id]", params: { id: 8 } }}>
  Ver producto 8
</Link>
```

**b) Un `<Link>` a `/perfil` que siempre apile, aunque la pantalla ya exista.**

```tsx
<Link href="/perfil" push>
  Ir a Perfil
</Link>
```

**c) Un botón (`Pressable`) propio que funcione como link a `/carrito` usando `asChild`.**

```tsx
<Link href="/carrito" asChild>
  <Pressable style={estilos.boton}>
    <Text>Ir al Carrito</Text>
  </Pressable>
</Link>
```

---

### C5. Pensar

- **En la web:** Renderiza cada `<Link>` como una etiqueta nativa `<a href="...">`. Esto le da al usuario la posibilidad de hacer clic derecho, copiar la URL, abrir en otra pestaña o compartir el enlace directo.
- **En el celular:** Al no haber barra de direcciones ni clic derecho, el usuario percibe la navegación como transiciones fluidas de pantallas nativas. El `<Link>` se encarga de manejar los gestos de toque y la pila de vistas nativa.

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| Criterio                                 | Stack                                                      | Tabs                                                                      | Drawer                                                                    |
| ---------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **¿Apila pantallas?**                    | Sí, cada navegación agrega pantallas arriba en la pila.    | No, intercambia entre las pantallas raíz de cada pestaña.                 | No, cambia de pantalla activa desde un menú lateral desplegable.          |
| **¿Cómo cambia de pantalla el usuario?** | Presionando enlaces o con el gesto nativo de volver atrás. | Tocando los íconos de la barra de pestañas (inferior o superior).         | Deslizando desde el borde de la pantalla o tocando el ícono de menú.      |
| **¿Desde dónde se importa en SDK 57?**   | `expo-router` (`import { Stack } from 'expo-router'`)      | `expo-router/js-tabs`                                                     | `expo-router/drawer`                                                      |
| **Un caso de uso típico**                | Flujos en profundidad (Lista -> Detalle -> Formulario).    | Secciones principales de la app siempre a mano (Inicio, Carrito, Perfil). | Opciones secundarias o de administración (Ajustes, Ayuda, Cerrar Sesión). |

---

### D2. Cada tab tiene su pila

- **¿Qué pantalla ve?** Ve el detalle del producto 4.
- **¿Por qué?** Porque cada pestaña (Tab) mantiene su propia Pila de navegación independiente. Al cambiar de pestaña y volver, la pestaña conserva el estado exacto del Stack en el que se la dejó.
- **Ejemplo diario:** Aplicaciones como Instagram, Mercado Libre o YouTube.

---

### D3. ¿Dónde va cada pantalla?

- **a) El detalle de un producto, que debe mantener visible la barra de pestañas:**  
  Va dentro del **Stack interno de la tab "Productos"**.
- **b) Un modal para confirmar una compra, que debe tapar la barra de pestañas:**  
  Va en el **Stack raíz** de la aplicación (fuera del grupo de Tabs).
- **c) La pantalla de login que se abre como modal:**  
  Va en el **Stack raíz** (fuera de Tabs).
- **d) La pantalla "Mis pedidos anteriores" dentro de la sección Perfil:**  
  Va dentro del **Stack de la tab Perfil**.

---

### D4. Configurar el Stack

**a) ¿Qué diferencia hay entre `screenOptions` y las `options` de un `Stack.Screen`?**
`screenOptions` se aplican a nivel general para **todas** las pantallas del Stack, mientras que `options` personalizan las propiedades individuales de una pantalla específica.

**b) ¿Por qué `(tabs)` tiene `headerShown: false`?**
Porque las pestañas manejan sus propios encabezados o pantallas internas. Desactivar el header del Stack raíz en `(tabs)` evita que aparezcan dos barras superiores superpuestas.

**c) Si existe `src/app/perfil-publico.tsx` pero no está declarada en el Stack, ¿existe la pantalla? ¿Para qué sirve declararla?**
Sí existe y se puede visitar. Declararla explícitamente en el Stack sirve para configurar sus propiedades visuales (título, animaciones, tipo de presentación, etc.).

**d) Nombrá cuatro valores posibles de `presentation`. ¿Cuál usarías para una hoja inferior que se abre al 50%?**
Valores posibles: `'card'`, `'modal'`, `'transparentModal'`, `'formSheet'`. Para una hoja inferior al 50% se utiliza **`'formSheet'`** junto con `sheetAllowedDetents: [0.5, 0.9]`.

**e) ¿Cómo cambiarías el título del header desde la propia pantalla de detalle para que diga "Producto 7"?**
Se puede usar el componente `<Stack.Screen />` dentro del archivo de la pantalla:

```tsx
import { Stack } from "expo-router";

export default function DetalleProducto() {
  return (
    <>
      <Stack.Screen options={{ title: "Producto 7" }} />
      {/* Contenido de la pantalla */}
    </>
  );
}
```

---

### D5. Tabs y Drawer en SDK 57

**a) ¿Qué cambió en SDK 57 al importar Tabs? ¿Qué alternativa experimental existe?**
En el SDK 57 las pestañas se importan desde `expo-router/js-tabs` para la versión en JavaScript. Como alternativa experimental se incluye `expo-router/apple-tabs` para usar componentes de pestañas nativos del sistema.

**b) ¿Qué dos paquetes necesita el Drawer y qué componente conviene poner en el layout raíz para los gestos?**
Necesita los paquetes `@react-navigation/drawer` y `react-native-gesture-handler` (junto con `react-native-reanimated`). En el layout raíz conviene envolver todo con `<GestureHandlerRootView style={{ flex: 1 }}>`.

**c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57? ¿Por qué?**
Sí, porque Expo Router se apoya en esa librería por debajo para construir el menú lateral Drawer.

**d) Si hay navegadores anidados, ¿en qué navegador actúa `router.back()`?**
Actúa sobre el **navegador activo más interno** que contenga pantallas en su pila para desapilar.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

**Causa del error:**  
El hook `useLocalSearchParams()` devuelve los parámetros como cadenas de texto (`string`). En el código se hace una comparación estricta `p.id === id` entre un número (`3`) y un string (`"3"`), lo que da `false` y no encuentra el producto.

**Código corregido:**

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumerico = Number(id);
  const producto = productos.find((p) => p.id === idNumerico);

  if (idNumerico === 3) console.log("Es el chipá");
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

---

### E2. Catch-all

| URL                          | `slug`                           |
| ---------------------------- | -------------------------------- |
| `/docs/react`                | `['react']`                      |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs`                      | `undefined`                      |

---

### E3. Anatomía de una URL

URL: `rutasipf://buscar?q=mate&categoria=bebidas`

**a) Identificá el scheme, la ruta y los parámetros de búsqueda.**

- **Scheme:** `rutasipf`
- **Ruta:** `/buscar`
- **Parámetros:** `q=mate` y `categoria=bebidas`

**b) ¿Qué devuelve `useLocalSearchParams()` en `buscar.tsx`?**
Devuelve el objeto: `{ q: 'mate', categoria: 'bebidas' }`

**c) ¿Hacen falta corchetes en el nombre del archivo para recibir `q`? ¿Por qué?**
No. Los corchetes en el nombre del archivo solo sirven para partes de la ruta de la carpeta (path parameters). Los parámetros que van después del signo `?` son query params y se reciben automáticamente en `useLocalSearchParams()`.

**d) En el buscador, cada vez que el usuario escribe se llama a `router.setParams({ q: texto })` en lugar de `router.push`. Dá dos razones.**

1. Evita apilar una nueva pantalla en el historial por cada letra digitada en el buscador.
2. Es más rápido y no genera parpadeos ni transiciones de pantalla innecesarias al buscar.

---

### E4. ¿Dónde estoy?

| Hook                     | En `/productos/3`              | En `/buscar?q=chipa` |
| ------------------------ | ------------------------------ | -------------------- |
| `usePathname()`          | `"/productos/3"`               | `"/buscar"`          |
| `useSegments()`          | `["(tabs)", "productos", "3"]` | `["buscar"]`         |
| `useLocalSearchParams()` | `{ id: "3" }`                  | `{ q: "chipa" }`     |

---

### E5. Local vs global

**a) ¿Cuál es la diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`? ¿Cuál es la opción por defecto y por qué?**
`useLocalSearchParams` devuelve únicamente los parámetros correspondientes a la pantalla actual activa. `useGlobalSearchParams` devuelve los parámetros acumulados de toda la URL (incluyendo pantallas superiores o compartidas). Por defecto se recomienda `useLocalSearchParams` para evitar que cambios de parámetros en otras rutas afecten al componente actual de manera no deseada.

**b) ¿Para qué sirve `useFocusEffect`? Dá un ejemplo de uso.**
Es un hook que ejecuta un efecto de código cada vez que la pantalla pasa a estar en foco o visible para el usuario (al entrar o al volver de otra pantalla).  
_Ejemplo:_ Recargar o actualizar la lista de productos del carrito cada vez que el usuario ingresa a la pestaña Carrito.

**c) La URL `/productos/mate` abre la pantalla de detalle aunque no exista ese producto. ¿Es un error de Expo Router? ¿De quién es la responsabilidad?**
No es un error de Expo Router. El router solo cumple con emparejar la URL ingresada con la pantalla correspondiente (`[id].tsx`). Es responsabilidad del desarrollador validar en el código de la pantalla si el producto buscado existe o mostrar un mensaje indicando que no se encontró.

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a) ¿Qué hace `<Redirect href="/productos" />` y a qué método de `router` equivale?**
Redirige de inmediato a la ruta `/productos`. Equivale al método **`router.replace("/productos")`**.

**b) ¿Por qué una redirección debe reemplazar y no apilar? Describí el problema que aparecería.**
Porque si apilara (`push`), la pantalla desde donde se redirige quedaría guardada en el historial. Al tocar el botón "atrás", el usuario volvería a la pantalla anterior, la cual lo volvería a redirigir automáticamente a `/productos`, generando un bucle infinito atrapado sin poder volver atrás.

---

### F2. Stack.Protected

```tsx
src / app / _layout.tsx;

function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: "modal" }} />
      </Stack.Protected>
    </Stack>
  );
}
```

**a) ¿Qué le pasa a una pantalla cuando su guard es `false`?**
La pantalla se desmonta y es quitada del mapa del navegador, por lo que el usuario no puede acceder a ella ni ver su contenido de ninguna forma.

**b) Al iniciar sesión, el modal de login se cierra solo, sin llamar a `router.back()`. ¿Por qué?**
Porque cuando se inicia sesión, `conSesion` cambia a `true`, haciendo que el guard `!conSesion` sea `false`. `Stack.Protected` detecta este cambio y destruye automáticamente la pantalla `login` del Stack.

**c) Aparece el aviso "The action 'NAVIGATE' ... was not handled by any navigator". ¿Qué lo causa y cómo se evita?**
Ocurre si intentamos navegar a una pantalla cuyo `guard` actualmente está en `false` o no forma parte del navegador activo. Se evita deshabilitando los botones correspondientes o comprobando si el usuario tiene permiso antes de ejecutar la navegación.

**d) ¿Qué ventaja tiene `Stack.Protected` frente a poner un `<Redirect>` condicional en cada pantalla?**
Permite centralizar el control de accesos en el layout principal en lugar de repartir lógica en cada archivo, evitando que la pantalla no autorizada llegue a renderizarse en memoria.

---

### F3. 404, anchor y rutas tipadas

**a) `+not-found.tsx`:** Es la pantalla predeterminada de error 404 que se muestra automáticamente cuando se entra a una ruta desconocida.

**b) `export const unstable_settings = { anchor: "(tabs)" }`:** Se coloca en el layout para establecer la ruta base o "ancla" cuando se entra mediante un deep link directo, garantizando que las pestañas `(tabs)` queden cargadas debajo en el historial.

**c) `typedRoutes`:** Si habilitamos rutas tipadas y escribimos `<Link href="/prodcutos" />` con un error de tipeo, TypeScript marcará un error de compilación. Los tipos válidos se generan automáticamente en la carpeta `.expo/types/`.

---

### F4. Deep links

| Dónde                        | URL                                 |
| ---------------------------- | ----------------------------------- |
| App instalada (build propia) | `comedoripf://menu/7`               |
| Expo Go en desarrollo        | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7`      |

- **¿Qué significa la parte `/--/` en la URL de Expo Go?**  
  Es un delimitador especial de Expo Go para separar la dirección IP/puerto del servidor de desarrollo del camino o ruta interna del proyecto.
- **¿Por qué el scheme propio no funciona dentro de Expo Go?**  
  Porque Expo Go ya viene precompilado con su propio esquema `exp://`. Para poder responder a esquemas personalizados propios como `comedoripf://` se necesita compilar una build de desarrollo (_Development Build_).

---

### F5. Errores comunes

**a) Al usar `<Link href="/perfil" asChild>` con un `<Pressable style={[estilos.boton, activo && estilos.activo]}>` aparece: "You are passing an array of styles to a child of `<Slot>`".**

- **Causa:** El componente `<Slot>` que usa `asChild` para clonar elementos no acepta un arreglo de estilos directo en algunas versiones de React Native.
- **Solución:** Aplanar el arreglo de estilos usando `StyleSheet.flatten([estilos.boton, activo && estilos.activo])` o colocar el estilo en un container interno.

**b) Un compañero creó `src/app/TarjetaProducto.tsx` para reutilizar un componente y ahora la app tiene una ruta nueva.**

- **Causa:** Al guardar el archivo directamente dentro de `src/app/`, Expo Router lo registra automáticamente como la ruta `/TarjetaProducto`.
- **Solución:** Mover el archivo de componente a la carpeta `src/components/TarjetaProducto.tsx`.

**c) Después de iniciar sesión se usa `router.push("/")` y, al tocar atrás, el usuario vuelve al login.**

- **Causa:** `router.push()` apiló la pantalla de inicio sobre el login sin quitar la pantalla de login del historial.
- **Solución:** Cambiar a `router.replace("/")` al iniciar sesión.

**d) Expo Go dice que el proyecto es incompatible después de instalar un paquete con `npm install`.**

- **Causa:** Se instaló una librería que incluye código fuente nativo no soportado dentro del cliente estándar de Expo Go.
- **Solución:** Utilizar Expo Prebuild y ejecutar mediante _Development Builds_ (`npx expo run:android` o `npx expo run:ios`).
