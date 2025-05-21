import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { auth, db } from "../services/firebaseConfig";
import styles from "../theme/styles";


export default function CreateEventScreen() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [esPublico, setEsPublico] = useState(true); // toggle por defecto

  const uid = auth.currentUser?.uid;

  const handleCrearEvento = async () => {
    if (!nombre || !categoria || !ubicacion || !fecha) {
      Toast.show({
        type: "error",
        text1: "Todos los campos son obligatorios",
      });
      return;
    }

    const asistentes = esPublico ? [] : [uid];  

    try {
      await addDoc(collection(db, "eventos"), {
        nombre,
        categoria,
        ubicacion,
        fecha,
        calificacion: 0,
        asistentes,
        publico: esPublico,
        creadoPor: uid,
      });

      Toast.show({ type: "success", text1: "Evento creado exitosamente" });

      setNombre("");
      setCategoria("");
      setUbicacion("");
      setFecha(new Date());
      setEsPublico(true);
    } catch (error) {
      Toast.show({ type: "error", text1: "Error al crear", text2: error.message });
    }
  };

  return (
     <KeyboardAvoidingWrapper  style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>

      <TextInput style={styles.input} placeholder="Nombre del evento" value={nombre} onChangeText={setNombre} placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Categoría" value={categoria} onChangeText={setCategoria} placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Ubicación" value={ubicacion} onChangeText={setUbicacion} placeholderTextColor="#999" />

      <TouchableOpacity onPress={() => setMostrarPicker(true)} style={styles.button}>
        <Text style={styles.buttonText}>
          {`Seleccionar fecha: ${dayjs(fecha).format("DD/MM/YYYY HH:mm")}`}
        </Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={fecha}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarPicker(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      {/* Toggle */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Switch value={esPublico} onValueChange={setEsPublico} />
        <Text style={{ marginLeft: 10, color: "#000" }}>
          Evento público
        </Text>
      </View>

      <TouchableOpacity onPress={handleCrearEvento} style={styles.button}>
        <Text style={styles.buttonText}>Guardar Evento</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingWrapper>
  );
}
