import React, { useState } from 'react';
import { router } from 'expo-router';
import { useComedor } from '../../../context/ComedorContext';
import { Boton } from '../../../components/Boton';
import { Campo } from '../../../components/Campo';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { Pantalla } from '../../../components/Pantalla';

export default function PantallaNotaCarrito() {
  const { notaCarrito, setNotaCarrito } = useComedor();
  const [texto, setTexto] = useState(notaCarrito);

  const guardar = () => {
    setNotaCarrito(texto);
    router.back();
  };

  return (
    <Pantalla variante="lectura">
      <Campo
        etiqueta="Aclaración para tu pedido"
        ayuda="Por ejemplo: sin sal, mayonesa aparte o bien cocido."
        placeholder="Escribí tu aclaración"
        value={texto}
        onChangeText={setTexto}
        multiline
        numberOfLines={3}
      />

      <Boton titulo="Guardar nota" onPress={guardar} />

      <DondeEstoy />
    </Pantalla>
  );
}
