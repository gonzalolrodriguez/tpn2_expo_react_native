import { TextStyle, ViewStyle } from 'react-native';

// Sistema de diseño del Comedor IPF.
// Ninguna pantalla escribe colores, tamaños de letra ni espaciados a mano: todo sale de acá.

export const colores = {
  // Superficies
  fondo: '#F5F7F3',
  superficie: '#FFFFFF',
  superficieHundida: '#ECEFE9',
  separador: '#D9DFD7',
  // Borde de campos de texto: contraste 3:1 sobre la superficie blanca
  bordeControl: '#7C8A80',

  // Texto
  tinta: '#18211B',
  tintaSecundaria: '#56635A',

  // Verde yerba: el único color de acción de la app
  marca: '#1F6B45',
  marcaSuave: '#E3F0E7',
  sobreMarca: '#FFFFFF',

  // Estados
  aviso: '#8A5A00',
  avisoSuave: '#FBF1D6',
  peligro: '#B3261E',
  peligroSuave: '#FBE9E7',
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
  pildora: 999,
} as const;

// Área táctil mínima (48 dp en Android, 44 pt en iOS)
export const TOQUE_MINIMO = 48;

// Tamaños de ícono: sm para indicadores (chevron, check), md dentro de botones, lg al inicio de una fila
export const tamanioIcono = {
  sm: 16,
  md: 20,
  lg: 24,
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
  tarjeta: '0 1px 3px rgba(24, 33, 27, 0.08)',
  elevada: '0 6px 16px rgba(24, 33, 27, 0.12)',
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

export const formatoPrecio = (valor: number) => `$${valor.toLocaleString('es-AR')}`;
