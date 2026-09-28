import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useComedor } from '../context/ComedorContext';
import { DondeEstoy } from '../components/DondeEstoy';

export default function PantallaLogin() {
  const { iniciarSesion } = useComedor();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const exito = iniciarSesion(user, pass);
    if (!exito) {
      setError('Credenciales incorrectas. Proba con cocina / 1234');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔐 Acceso de Personal (Cocina)</Text>
      <Text style={styles.subtitulo}>Ingresá con tu cuenta para gestionar los pedidos en cola.</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Usuario:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: cocina"
        value={user}
        onChangeText={setUser}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 1234"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />

      <Pressable style={styles.btnIngresar} onPress={handleLogin}>
        <Text style={styles.btnText}>Iniciar Sesión</Text>
      </Pressable>

      <Text style={styles.pista}>💡 Pista de prueba: usuario "cocina", clave "1234"</Text>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 20,
  },
  errorText: {
    color: '#dc2626',
    backgroundColor: '#fee2e2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 16,
  },
  btnIngresar: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pista: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 16,
  },
});
