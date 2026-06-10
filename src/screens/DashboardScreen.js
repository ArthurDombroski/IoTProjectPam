import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dashboard from '../components/Dashboard';

export default function DashboardScreen({ navigation, history }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Dashboard</Text>

      <Dashboard history={history} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#121212',
    padding: 20, alignItems: 'center'
  },
  backBtn: {
    alignSelf: 'flex-start', marginTop: 40,
    marginBottom: 5
  },
  backBtnText: {
    color: '#27AE60', fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    color: '#FFF', fontSize: 24,
    fontWeight: 'bold', marginBottom: 20
  },
});