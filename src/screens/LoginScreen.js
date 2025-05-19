// src/screens/LoginScreen.js
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput placeholder="Correo electrónico" placeholderTextColor="#999" style={styles.input} />
      <TextInput placeholder="Contraseña" placeholderTextColor="#999" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Crear una cuenta</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.socialText}>O inicia sesión con</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, color: "#000", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 16, color: "#000" },
  button: { backgroundColor: "#000", padding: 14, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  link: { color: "#666", textAlign: "center", marginTop: 10 },
  divider: { height: 1, backgroundColor: "#ccc", marginVertical: 20 },
  socialText: { color: "#000", textAlign: "center", marginBottom: 10 },
  socialButtons: { flexDirection: "row", justifyContent: "space-around" },
  socialButton: { borderWidth: 1, borderColor: "#000", padding: 10, borderRadius: 8, width: "40%" },
  socialButtonText: { textAlign: "center", color: "#000" }
});
