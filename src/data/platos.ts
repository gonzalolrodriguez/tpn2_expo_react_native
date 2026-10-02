export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';
  // Foto del plato: recurso local (require devuelve el identificador del recurso)
  imagen: number;
}

export const PLATOS: Plato[] = [
  // Desayuno
  {
    id: 1,
    nombre: 'Café con Leche y 2 Medialunas',
    descripcion: 'Café artesanal pasado con leche y dos medialunas recién horneadas.',
    precio: 2500,
    categoria: 'desayuno',
    imagen: require('../../assets/platos/cafe-medialunas.jpg'),
  },
  {
    id: 2,
    nombre: 'Tostados de Jamón y Queso',
    descripcion: 'Pan de miga tostado crocante relleno de jamón cocido y queso muzzarella.',
    precio: 3200,
    categoria: 'desayuno',
    imagen: require('../../assets/platos/tostado.jpg'),
  },
  {
    id: 3,
    nombre: 'Chipá Formoseño',
    descripcion: 'Porción de 3 chipás tradicionales bien calentitos hechos con almidón de mandioca y queso.',
    precio: 1800,
    categoria: 'desayuno',
    imagen: require('../../assets/platos/chipa.jpg'),
  },
  // Almuerzo
  {
    id: 4,
    nombre: 'Milanesa con Papas Fritas',
    descripcion: 'Milanesa de carne vacuna crocante acompañada con papas fritas doradas.',
    precio: 5500,
    categoria: 'almuerzo',
    imagen: require('../../assets/platos/milanesa.jpg'),
  },
  {
    id: 5,
    nombre: 'Empanadas de Carne (3 unidades)',
    descripcion: 'Empanadas cortadas a cuchillo, bien jugosas con condimento autóctono.',
    precio: 3600,
    categoria: 'almuerzo',
    imagen: require('../../assets/platos/empanadas.jpg'),
  },
  {
    id: 6,
    nombre: 'Guiso de Lentejas Especial',
    descripcion: 'Plato abundante de guiso casero con panceta, chorizo colorado y verduras.',
    precio: 4800,
    categoria: 'almuerzo',
    imagen: require('../../assets/platos/guiso-lentejas.jpg'),
  },
  {
    id: 7,
    nombre: 'Hamburguesa Completa',
    descripcion: 'Hamburguesa casera de 180g con lechuga, tomate, jamón, queso y huevo frito.',
    precio: 5200,
    categoria: 'almuerzo',
    imagen: require('../../assets/platos/hamburguesa.jpg'),
  },
  // Bebidas
  {
    id: 8,
    nombre: 'Limonada con Menta y Jengibre (500ml)',
    descripcion: 'Refrescante limonada natural preparada al momento.',
    precio: 1900,
    categoria: 'bebidas',
    imagen: require('../../assets/platos/limonada.jpg'),
  },
  {
    id: 9,
    nombre: 'Gaseosa 500ml',
    descripcion: 'Línea Coca-Cola, Sprite o Fanta bien helada.',
    precio: 1800,
    categoria: 'bebidas',
    imagen: require('../../assets/platos/gaseosa.jpg'),
  },
  {
    id: 10,
    nombre: 'Agua Mineral Sin Gas (600ml)',
    descripcion: 'Agua mineral de manantial fresca.',
    precio: 1200,
    categoria: 'bebidas',
    imagen: require('../../assets/platos/agua.jpg'),
  },
  // Kiosco
  {
    id: 11,
    nombre: 'Alfajor Artesanal de Dulce de Leche',
    descripcion: 'Alfajor suave bañado en chocolate negro relleno de abundante dulce de leche.',
    precio: 1500,
    categoria: 'kiosco',
    imagen: require('../../assets/platos/alfajor.jpg'),
  },
  {
    id: 12,
    nombre: 'Barra de Cereal y Frutos Secos',
    descripcion: 'Snack saludable para recargar energías entre clases.',
    precio: 1100,
    categoria: 'kiosco',
    imagen: require('../../assets/platos/barra-cereal.jpg'),
  },
];
