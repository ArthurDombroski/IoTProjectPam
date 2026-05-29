import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function HistoryCard({ topic, value, createdAt }) {
  return (
    <View style={styles.card}>
      <Text style={styles.topic}>{topic}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.date}>
        {new Date(createdAt).toLocaleString('pt-BR')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1E1E1E',
    padding: 12, borderRadius: 10, marginBottom: 8
  },
  topic: { color: '#27AE60', fontSize: 12,
    fontWeight: 'bold'
  },
  value: { color: '#FFF', fontSize: 16,
    marginVertical: 2
  },
  date: { color: '#AAA', fontSize: 11 },
});