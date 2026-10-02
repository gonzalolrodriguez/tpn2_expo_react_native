import React from 'react';
import { Image } from 'expo-image';
import { diseno } from '../tema/tokens';

// Identidad del Instituto Politécnico Formosa. Los dos archivos se cargan solo desde acá.
const ESCUDO = require('../../assets/escudo-ipf.png');
const LOGO = require('../../assets/logo-ipf.png');

// Proporción ancho/alto de cada archivo (512 × 443 y 900 × 358 px).
// Valores locales: describen estos dos archivos y no se repiten en ningún otro lugar.
const PROPORCION_ESCUDO = 512 / 443;
const PROPORCION_LOGO = 900 / 358;

const NOMBRE = 'Instituto Politécnico Formosa';

interface Props {
  // Alto en píxeles; el ancho sale de la proporción del archivo
  alto?: number;
  // Cuando el nombre del instituto ya está escrito al lado
  decorativo?: boolean;
}

// Escudo solo: verde profundo con letras crema. Pensado para las superficies de marca.
export const Escudo: React.FC<Props> = ({ alto = diseno.escudo, decorativo = false }) => (
  <Image
    source={ESCUDO}
    contentFit="contain"
    style={{ height: alto, aspectRatio: PROPORCION_ESCUDO }}
    accessible={!decorativo}
    accessibilityLabel={decorativo ? undefined : `Escudo del ${NOMBRE}`}
    alt={decorativo ? '' : `Escudo del ${NOMBRE}`}
  />
);

// Logo horizontal con el nombre en texto oscuro: solo sobre fondos claros.
export const LogoInstituto: React.FC<Props> = ({ alto = diseno.logo, decorativo = false }) => (
  <Image
    source={LOGO}
    contentFit="contain"
    style={{ height: alto, aspectRatio: PROPORCION_LOGO }}
    accessible={!decorativo}
    accessibilityLabel={decorativo ? undefined : NOMBRE}
    alt={decorativo ? '' : NOMBRE}
  />
);
