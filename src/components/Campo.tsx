import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { colores, espacio, radio, tipo, TOQUE_MINIMO } from '../tema/tokens';

interface Props extends Omit<TextInputProps, 'style'> {
  // Etiqueta visible arriba del campo (no alcanza con el placeholder)
  etiqueta: string;
  // Texto de ayuda debajo del campo
  ayuda?: string;
  // Mensaje de error: reemplaza a la ayuda y queda pegado al campo
  error?: string;
}

// Campo de texto con etiqueta, ayuda y error. El borde cambia al enfocar y cuando hay error.
export const Campo: React.FC<Props> = ({ etiqueta, ayuda, error, multiline, onFocus, onBlur, ...resto }) => {
  const [enfocado, setEnfocado] = useState(false);

  return (
    <View style={styles.campo}>
      <Text style={tipo.cuerpoFuerte}>{etiqueta}</Text>
      <TextInput
        accessibilityLabel={etiqueta}
        placeholderTextColor={colores.tintaSecundaria}
        selectionColor={colores.marca}
        multiline={multiline}
        style={[
          styles.entrada,
          multiline && styles.multilinea,
          enfocado && styles.enfocada,
          error ? styles.conError : null,
        ]}
        onFocus={(evento) => {
          setEnfocado(true);
          onFocus?.(evento);
        }}
        onBlur={(evento) => {
          setEnfocado(false);
          onBlur?.(evento);
        }}
        {...resto}
      />
      {error ? (
        <Text selectable accessibilityLiveRegion="polite" style={[tipo.nota, styles.error]}>
          {error}
        </Text>
      ) : ayuda ? (
        <Text style={tipo.nota}>{ayuda}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  campo: {
    gap: espacio.xs,
  },
  entrada: {
    minHeight: TOQUE_MINIMO,
    paddingHorizontal: espacio.md,
    paddingVertical: espacio.md,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.bordeControl,
    borderRadius: radio.control,
    borderCurve: 'continuous',
    // Mismo tamaño que el cuerpo; sin lineHeight porque descentra el texto de un TextInput en iOS
    fontSize: tipo.cuerpo.fontSize,
    color: colores.tinta,
  },
  multilinea: {
    // Lugar para unas tres líneas de texto
    minHeight: TOQUE_MINIMO * 2,
    textAlignVertical: 'top',
  },
  enfocada: {
    borderColor: colores.marca,
  },
  conError: {
    borderColor: colores.peligro,
  },
  error: {
    color: colores.peligro,
  },
});
