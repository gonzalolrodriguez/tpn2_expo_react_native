import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';

const DEBUG = true; // Se puede cambiar a false para ocultar

export const DondeEstoy: React.FC = () => {
  if (!DEBUG) return null;

  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Inspector de Ruta [DEBUG]</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Pathname: </Text>
        {pathname}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Segments: </Text>
        {JSON.stringify(segments)}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Params: </Text>
        {JSON.stringify(params)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    color: '#475569',
    fontFamily: 'Platform',
    marginTop: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});
