// src/screens/EventDetailScreen.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EventDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Evento</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    color: "#000",
    marginBottom: 20,
  },
});
