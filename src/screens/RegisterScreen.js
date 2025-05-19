// src/screens/RegisterScreen.js
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput placeholder="Nombre completo" placeholderTextColor="#999" style={styles.input} />
      <TextInput placeholder="Correo electrónico" placeholderTextColor="#999" style={styles.input} />
      <TextInput placeholder="Contraseña" placeholderTextColor="#999" secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirmar contraseña" placeholderTextColor="#999" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, color: "#000", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 16, color: "#000" },
  button: { backgroundColor: "#000", padding: 14, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  link: { color: "#666", textAlign: "center", marginTop: 10 }
});
