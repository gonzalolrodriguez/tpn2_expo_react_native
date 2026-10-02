import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useComedor } from '../context/ComedorContext';
import { Boton } from '../components/Boton';
import { Campo } from '../components/Campo';
import { DondeEstoy } from '../components/DondeEstoy';
import { LogoInstituto } from '../components/Marca';
import { Pantalla } from '../components/Pantalla';
import { colores, tipo } from '../tema/tokens';

export default function PantallaLogin() {
  const { iniciarSesion } = useComedor();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const exito = iniciarSesion(user, pass);
    if (!exito) {
      setError('El usuario o la contraseña no coinciden. Probá con cocina y 1234.');
    }
  };

  return (
    <Pantalla variante="lectura">
      {/* Logo horizontal del instituto: lleva texto oscuro, por eso va sobre el fondo claro */}
      <View style={styles.logo}>
        <LogoInstituto />
      </View>

      <Text style={[tipo.cuerpo, styles.intro]}>
        Ingresá con la cuenta del personal para atender los pedidos en cola.
      </Text>

      <Campo
        etiqueta="Usuario"
        placeholder="cocina"
        value={user}
        onChangeText={setUser}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
      />

      {/* El error va pegado a los campos, no arriba del formulario */}
      <Campo
        etiqueta="Contraseña"
        ayuda="Cuenta de prueba: usuario cocina, contraseña 1234."
        error={error}
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={handleLogin}
      />

      <Boton titulo="Iniciar sesión" onPress={handleLogin} />

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
  },
  intro: {
    color: colores.tintaSecundaria,
  },
});
