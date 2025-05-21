import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import EventCard from "../components/EventCard";
import { auth, db } from "../services/firebaseConfig";
import styles from "../theme/styles";

const categories = [
  { key: "viajes", label: "Viajes", icon: "airplane-outline" },
  { key: "musica", label: "Música", icon: "musical-notes-outline" },
  { key: "educacion", label: "Educación", icon: "school-outline" },
  { key: "deporte", label: "Deporte", icon: "football-outline" },
  { key: "cine", label: "Cine", icon: "film-outline" },
  { key: "fiesta", label: "Fiesta", icon: "balloon-outline" },
];




export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState("viajes");
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEventos = async (categoria) => {
    setLoading(true);
    try {
      const ref = collection(db, "eventos");
      const q = query(ref, where("publico", "==", true), where("categoria", "==", categoria));
      const snapshot = await getDocs(q);
       console.log("Total documentos encontrados:", snapshot.size);
       snapshot.docs.forEach(doc => {
        console.log("Doc:", doc.id, doc.data());
      });
      const data = snapshot.docs
        .map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.nombre,
            location: d.ubicacion,
            date: d.fecha.toDate(),
            rating: Number(d.calificacion),
            category: d.categoria,
            attendees: `${d.asistentes?.length || 0} personas asistirán`,
          };
        })
        .filter(event => dayjs(event.date).isAfter(dayjs())); // solo eventos futuros

      setEventos(data);
    } catch (err) {
      console.error("Error al cargar eventos públicos:", err);
    } finally {
      setLoading(false);
    }
  };

  // cargar eventos al inicio
  useEffect(() => {
    fetchEventos(selectedCategory);
  }, [selectedCategory]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 80,
        margin: 8,
        borderRadius: 16,
        backgroundColor: selectedCategory === item.key ? "#000" : "#eee",
      }}
      onPress={() => setSelectedCategory(item.key)}
    >
      <Ionicons name={item.icon} size={28} color={selectedCategory === item.key ? "#fff" : "#444"} />
      <Text style={{
        marginTop: 4,
        fontSize: 12,
        color: selectedCategory === item.key ? "#fff" : "#000",
      }}>{item.label}</Text>
    </TouchableOpacity>
  );
const handleJoinEvent = async (eventId) => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const ref = doc(db, "eventos", eventId);
    await updateDoc(ref, {
      asistentes: arrayUnion(uid),
    });

    Toast.show({
      type: "success",
      text1: "¡Confirmado!",
      text2: "Te has unido al evento.",
    });

    fetchEventos(selectedCategory); // recargar eventos si deseas reflejar cambios
  } catch (error) {
    console.error("Error al unirse al evento:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo registrar tu asistencia.",
    });
  }
};
  return (
    <View style={[styles.container, { paddingTop: 70 }]}>
      <Text style={[styles.title, { marginBottom: 10 }]}>Explorar eventos</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={renderCategory}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={{ alignItems: "center" }}
      />

      <View style={{ marginTop: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : eventos.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 30, color: "#666" }}>
            No hay eventos en esta categoría aún.
          </Text>
        ) : (
        eventos.map((event) => (
          <View key={event.id}>
            <EventCard event={event} />
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                paddingVertical: 10,
                borderRadius: 8,
                marginHorizontal: 16,
                marginBottom: 20,
                alignItems: "center",
              }}
              onPress={() => handleJoinEvent(event.id)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Asistir</Text>
            </TouchableOpacity>
          </View>
        ))
        )}
      </View>
    </View>
  );
}
