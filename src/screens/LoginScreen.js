// src/screens/LoginScreen.js
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Button title="Ir a Registro" onPress={() => navigation.navigate("Register")} />
      <Button title="Ir a Home" onPress={() => navigation.navigate("Home")} />
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
