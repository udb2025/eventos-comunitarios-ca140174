import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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
    <View >
      <Text style={styles.title}>Crear Nuevo Evento</Text>

      <TextInput style={styles.input} placeholder="Nombre del evento" value={nombre} onChangeText={setNombre} placeholderTextColor="#999" />
       <View style={styles.input}>
  <Picker
    selectedValue={categoria}
    onValueChange={(itemValue) => setCategoria(itemValue)}
    style={{ color: categoria ? "#000" : "#999" }} // gris si no ha seleccionado
    dropdownIconColor="#000"
  >
    <Picker.Item label="Selecciona una categoría" value="" enabled={false} />
    <Picker.Item label="Viajes" value="viajes" />
    <Picker.Item label="Música" value="musica" />
    <Picker.Item label="Educación" value="educacion" />
    <Picker.Item label="Deporte" value="deporte" />
    <Picker.Item label="Cine" value="cine" />
    <Picker.Item label="Fiesta" value="fiesta" />
  </Picker>
</View>

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
