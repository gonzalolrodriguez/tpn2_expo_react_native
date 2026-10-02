import { TextStyle, ViewStyle } from 'react-native';

// Sistema de diseño del Comedor IPF.
// Ninguna pantalla escribe colores, tamaños de letra ni espaciados a mano: todo sale de acá.

export const colores = {
  // Paleta del Instituto Politécnico Formosa, tomada de su escudo y de ipfconecta.formosa.gob.ar

  // Superficies
  fondo: '#F4FAF9',
  superficie: '#FFFFFF',
  superficieHundida: '#E7F4F2',
  separador: '#D3E3E0',
  // Borde de campos de texto: contraste 3:1 sobre la superficie blanca
  bordeControl: '#6E8A87',

  // Texto
  tinta: '#143A40',
  tintaSecundaria: '#4A6468',

  // Verde del escudo (la "P"), apenas oscurecido para dar 4.5:1 como texto sobre el fondo claro.
  // Es el único color de acción de la app.
  marca: '#067A4D',
  marcaSuave: '#DFF1E9',
  sobreMarca: '#FFFFFF',

  // Verdes institucionales para superficies de marca: fondo del escudo, verde mar y verde azulado del sitio
  marcaProfunda: '#08383F',
  marcaMar: '#074D59',
  marcaAcento: '#00968D',
  // Crema de las letras del escudo: texto e íconos sobre las superficies de marca
  crema: '#E5EEE7',

  // Estados
  aviso: '#8A5A00',
  avisoSuave: '#FBF1D6',
  peligro: '#B3261E',
  peligroSuave: '#FBE9E7',

  // Velo oscuro debajo del texto que va sobre una foto: el verde profundo del escudo,
  // de transparente a casi opaco. Es el único degradado sobre contenido.
  veloInicio: 'rgba(8, 56, 63, 0)',
  veloFin: 'rgba(8, 56, 63, 0.9)',
} as const;

// Escala de 4 pt
export const espacio = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radio = {
  control: 12,
  tarjeta: 16,
  // Superficies grandes de marca: el bloque de inicio y la foto del detalle
  destacado: 28,
  pildora: 999,
} as const;

// Área táctil mínima (48 dp en Android, 44 pt en iOS)
export const TOQUE_MINIMO = 48;

// Tamaños de ícono: sm para indicadores (chevron, check), md dentro de botones, lg al inicio de una fila
export const tamanioIcono = {
  sm: 16,
  md: 20,
  lg: 24,
  // Ilustración de los estados vacíos
  xl: 40,
} as const;

// Opacidad de los estados de un control
export const opacidad = {
  deshabilitado: 0.4,
  // Respuesta al toque cuando el sistema pide reducir el movimiento (reemplaza a la escala)
  presionado: 0.72,
} as const;

// Tipografía del sistema. El interletrado se ajusta al tamaño:
// negativo en los títulos grandes, neutro en el cuerpo.
export const tipo = {
  tituloGrande: { fontSize: 32, lineHeight: 38, fontWeight: '700', letterSpacing: -0.6, color: colores.tinta },
  titulo: { fontSize: 22, lineHeight: 28, fontWeight: '700', letterSpacing: -0.3, color: colores.tinta },
  subtitulo: { fontSize: 17, lineHeight: 22, fontWeight: '600', color: colores.tinta },
  cuerpo: { fontSize: 16, lineHeight: 24, fontWeight: '400', color: colores.tinta },
  cuerpoFuerte: { fontSize: 16, lineHeight: 24, fontWeight: '600', color: colores.tinta },
  nota: { fontSize: 13, lineHeight: 18, fontWeight: '400', color: colores.tintaSecundaria },
  // Números protagonistas: turno y totales. Cifras tabulares para que no "bailen".
  numero: {
    fontSize: 72,
    lineHeight: 78,
    fontWeight: '800',
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
    color: colores.tinta,
  },
  precio: { fontSize: 16, lineHeight: 24, fontWeight: '600', fontVariant: ['tabular-nums'], color: colores.tinta },
} satisfies Record<string, TextStyle>;

// Profundidad: sombra con desplazamiento y desenfoque suave, solo para superficies elevadas
export const sombra = {
  tarjeta: '0 1px 3px rgba(8, 56, 63, 0.08)',
  elevada: '0 8px 24px rgba(8, 56, 63, 0.14)',
} as const;

// Superficie agrupada: fondo blanco con esquinas continuas. Las filas se separan con líneas finas,
// no con una tarjeta por elemento.
export const superficie = {
  backgroundColor: colores.superficie,
  borderRadius: radio.tarjeta,
  borderCurve: 'continuous',
  boxShadow: sombra.tarjeta,
} satisfies ViewStyle;

// Fila estándar dentro de un grupo
export const fila = {
  minHeight: TOQUE_MINIMO,
  flexDirection: 'row',
  alignItems: 'center',
  gap: espacio.md,
  paddingHorizontal: espacio.lg,
  paddingVertical: espacio.md,
} satisfies ViewStyle;

// Relleno y ritmo vertical del contenido de cada pantalla
export const contenidoPantalla = {
  padding: espacio.lg,
  gap: espacio.lg,
} satisfies ViewStyle;

// Opciones de header compartidas por el Stack raíz y los Stack de cada pestaña
export const opcionesHeader = {
  headerStyle: { backgroundColor: colores.superficie },
  headerTintColor: colores.marca,
  headerTitleStyle: { color: colores.tinta },
  headerShadowVisible: false,
} as const;

// Movimiento. Las curvas y duraciones son las mismas en toda la app para que se sientan emparentadas.
export const movimiento = {
  // Respuesta al toque
  presion: 120,
  // Cambios de estado chicos: chips, insignias
  estado: 180,
  // Entradas de contenido
  entrada: 320,
  // Separación entre elementos de una entrada escalonada
  escalon: 45,
  // Resorte sin rebote para asentar elementos
  resorte: { duration: 400, dampingRatio: 1 },
  // Resorte con rebote leve: solo para momentos de celebración (el número de turno)
  resorteVivo: { duration: 500, dampingRatio: 0.7 },
  // Curva de salida fuerte: cubic-bezier(0.23, 1, 0.32, 1)
  curvaSalida: [0.23, 1, 0.32, 1],
  // Curva para lo que se mueve dentro de la pantalla: cubic-bezier(0.77, 0, 0.175, 1)
  curvaMovimiento: [0.77, 0, 0.175, 1],
  // Escala de una superficie mientras está presionada
  escalaPresion: 0.97,
  // Escala desde la que llega un elemento que aparece (nunca desde 0)
  escalaEntrada: 0.94,
  // Recorrido vertical con el que llega el ticket del turno
  desplazamiento: 16,
  // Tope de elementos escalonados: del noveno en adelante entran juntos
  escalonesMaximos: 8,
  // Las salidas son más rápidas que las entradas
  salida: 150,
  // Cuánto dura a la vista la confirmación de "agregado al carrito"
  confirmacion: 1100,
  // Fundido de una foto cuando termina de cargar
  imagen: 200,
} as const;

// Diseño adaptable: mismos componentes en teléfono, tablet y escritorio
export const diseno = {
  // Ancho máximo del contenido en pantallas grandes
  anchoMaximo: 1120,
  // Ancho máximo de formularios y pantallas de lectura
  anchoLectura: 560,
  // A partir de este ancho hay dos columnas; desde el siguiente, tres
  tablet: 700,
  escritorio: 1050,
  // Proporción de todas las fotos de platos (los archivos son 4:3)
  proporcionFoto: 4 / 3,
  // Proporción apaisada de la portada que lleva al menú desde el inicio
  proporcionPortada: 2,
  // Parte de una foto que cubre el velo oscuro, medida desde abajo
  altoVelo: '70%',
  // Lado de la miniatura cuadrada en las filas de carrito, confirmación y cocina
  miniatura: 48,
  // Ancho de cada foto en la fila de destacados del inicio
  tarjetaDestacada: 248,
  // Alto del escudo en el bloque de inicio y del logo en el ingreso
  escudo: 72,
  logo: 64,
  // Ancho de la barra lateral de pestañas en escritorio
  barraLateral: 232,
} as const;

export const formatoPrecio = (valor: number) => `$${valor.toLocaleString('es-AR')}`;
