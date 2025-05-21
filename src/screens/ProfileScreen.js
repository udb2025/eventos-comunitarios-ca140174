import { signOut, updatePassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { auth } from "../services/firebaseConfig";
import styles from '../theme/styles'; // importa el archivo
export default function ProfileScreen({ navigation }) {
  const user = auth.currentUser;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Toast.show({ type: "error", text1: "Las contraseñas no coinciden" });
      return;
    }
    try {
      await updatePassword(user, newPassword);
      Toast.show({ type: "success", text1: "Contraseña actualizada" });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      Toast.show({ type: "error", text1: "Error", text2: error.message });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    Toast.show({ type: "info", text1: "Sesión cerrada" });
    navigation.replace("Login");
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <Text style={styles.sectionTitle}>Cambiar contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nueva contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Actualizar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </KeyboardAvoidingWrapper>
  );
}


