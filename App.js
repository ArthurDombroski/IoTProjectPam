import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { MQTT_HOST, MQTT_PORT, MQTT_PATH, MQTT_USER, MQTT_PASS } from '@env';
import MQTTService from './src/services/mqttService.js';
import { saveReading, getReadings } from './src/services/supabaseService.js';
import StatusModal from './src/components/StatusModal.js';
import LightControl from './src/components/LightControl.js';
import Gauges from './src/components/Gauges.js';
import HistoryCard from './src/components/HistoryCard.js';

const mqtt = new MQTTService();

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);
  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);
  const [history, setHistory] = useState([]);

  const mqttConfig = {
    host: MQTT_HOST,
    port: parseInt(MQTT_PORT),
    path: MQTT_PATH,
    user: MQTT_USER,
    pass: MQTT_PASS,
    clientId: 'RN_App_' + Math.random(),
  };

  useEffect(() => {
    startConnection();
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getReadings();
    setHistory(data);
  };

  const startConnection = () => {
    setShowError(false);
    mqtt.connect(
      mqttConfig,
      async (topic, message) => {
        if (topic === 'casa/temp') setTemp(parseFloat(message));
        if (topic === 'casa/umid') setHum(parseFloat(message));
        if (topic === 'casa/luz') setIsLightOn(message === '1');

        // Salva no Supabase
        await saveReading(topic, message);
        await loadHistory();
      },
      () => {
        setIsConnected(true);
        mqtt.subscribe('casa/temp');
        mqtt.subscribe('casa/umid');
        mqtt.subscribe('casa/luz');
      },
      (err) => {
        setIsConnected(false);
        setShowError(true);
      }
    );
  };

  const toggleLight = () => {
    const newState = isLightOn ? '0' : '1';
    mqtt.publish('casa/luz', newState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smart Home IoT</Text>

      <LightControl isLightOn={isLightOn} onToggle={toggleLight} />

      <Gauges temp={temp} hum={hum} />

      <Text style={styles.historyTitle}>Histórico</Text>
      <ScrollView style={styles.historyBox}>
        {history.map((item) => (
          <HistoryCard
            key={item.id}
            topic={item.topic}
            value={item.value}
            createdAt={item.created_at}
          />
        ))}
      </ScrollView>

      <StatusModal
        visible={showError}
        onRetry={startConnection}
        onLater={() => setShowError(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#121212',
    padding: 20, alignItems: 'center'
  },
  header: {
    color: '#FFF', fontSize: 24,
    fontWeight: 'bold', marginTop: 40,
    marginBottom: 20
  },
  historyTitle: {
    color: '#FFF', fontSize: 18,
    fontWeight: 'bold', marginTop: 20,
    marginBottom: 10, alignSelf: 'flex-start'
  },
  historyBox: { width: '100%', flex: 1 },
  historyItem: {
    backgroundColor: '#1E1E1E',
    padding: 12, borderRadius: 10, marginBottom: 8
  },
  historyTopic: {
    color: '#27AE60', fontSize: 12,
    fontWeight: 'bold'
  },
  historyValue: {
    color: '#FFF', fontSize: 16,
    marginVertical: 2
  },
  historyDate: { color: '#AAA', fontSize: 11 },
});