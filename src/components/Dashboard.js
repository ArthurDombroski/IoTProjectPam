import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLegend, VictoryTheme } from 'victory-native';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard({ history }) {
    const tempData = history
        .filter(item => item.topic === 'casa/temp')
        .slice(0, 10)
        .reverse()
        .map((item, index) => ({ x: index + 1, y: parseFloat(item.value) }));

    const humData = history
        .filter(item => item.topic === 'casa/umid')
        .slice(0, 10)
        .reverse()
        .map((item, index) => ({ x: index + 1, y: parseFloat(item.value) }));

    if (tempData.length === 0 && humData.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>Nenhum dado para exibir ainda.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Temperatura (°C)</Text>
                <VictoryChart
                    width={screenWidth - 60}
                    height={200}
                    theme={VictoryTheme.material}
                    padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
                >
                    <VictoryAxis
                        style={{ axis: { stroke: '#555' }, tickLabels: { fill: '#AAA', fontSize: 10 } }}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{ axis: { stroke: '#555' }, tickLabels: { fill: '#AAA', fontSize: 10 } }}
                    />
                    <VictoryLine
                        data={tempData}
                        style={{ data: { stroke: '#E74C3C', strokeWidth: 2 } }}
                    />
                </VictoryChart>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Umidade (%)</Text>
                <VictoryChart
                    width={screenWidth - 60}
                    height={200}
                    theme={VictoryTheme.material}
                    padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
                >
                    <VictoryAxis
                        style={{ axis: { stroke: '#555' }, tickLabels: { fill: '#AAA', fontSize: 10 } }}
                    />
                    <VictoryAxis
                        dependentAxis
                        style={{ axis: { stroke: '#555' }, tickLabels: { fill: '#AAA', fontSize: 10 } }}
                    />
                    <VictoryLine
                        data={humData}
                        style={{ data: { stroke: '#3498DB', strokeWidth: 2 } }}
                    />
                </VictoryChart>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', marginTop: 10 },
    title: {
        color: '#FFF', fontSize: 18,
        fontWeight: 'bold', marginBottom: 10
    },
    card: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20, padding: 15, marginBottom: 15
    },
    cardTitle: {
        color: '#AAA', fontSize: 13,
        marginBottom: 5
    },
    empty: { padding: 20, alignItems: 'center' },
    emptyText: { color: '#AAA', fontSize: 14 },
});