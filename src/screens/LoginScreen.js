import { AntDesign } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Toast from 'react-native-toast-message';
import { useGoogleAuth } from "../services/authWithGoogle";
import { auth } from "../services/firebaseConfig";
import styles from '../theme/styles'; // importa el archivo


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithGoogle, loading } = useGoogleAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: 'success',
        text1: 'Inicio de sesión exitoso',
      });
     navigation.navigate("Main");
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
        text2: error.message,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
        style={styles.input}
      />
      <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle}>
        <AntDesign name="google" size={20} color="#DB4437" />
        <Text style={styles.socialButtonText}>Iniciar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Crear una cuenta</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}


