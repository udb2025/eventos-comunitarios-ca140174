import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { auth } from "../services/firebaseConfig";
import styles from '../theme/styles'; // importa el archivo


export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Las contraseñas no coinciden',
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: 'success',
        text1: 'Cuenta creada con éxito',
      });
      navigation.navigate("Login");
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al registrarse',
        text2: error.message
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <TextInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} placeholderTextColor="#999" style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor="#999" style={styles.input} />
      <TextInput placeholder="Confirmar contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholderTextColor="#999" style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}


