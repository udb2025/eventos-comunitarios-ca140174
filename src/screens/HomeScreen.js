// src/screens/HomeScreen.js
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Eventos</Text>
      <Button title="Ver Detalles del Evento" onPress={() => navigation.navigate("EventDetail")} />
      <Button title="Ir a Perfil" onPress={() => navigation.navigate("Profile")} />
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
