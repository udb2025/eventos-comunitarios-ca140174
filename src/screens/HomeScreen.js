import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import styles from "../theme/styles";

const novedadesSimuladas = [
  {
    id: "1",
    titulo: "Nuevo evento: Fiesta del barrio",
    descripcion: "Este sábado a las 6pm en el parque central. ¡No te lo pierdas!",
    fecha: "2025-05-23"
  },
  {
    id: "2",
    titulo: "Evento destacado: Caminata ecológica",
    descripcion: "Actividad comunitaria en la reserva natural. Domingo 9am.",
    fecha: "2025-05-24"
  },
  {
    id: "3",
    titulo: "¡Ya somos 200 usuarios activos!",
    descripcion: "Gracias por formar parte de esta comunidad 🎉",
    fecha: "2025-05-20"
  },
  {
    id: "4",
    titulo: "Se habilitó la categoría Cine 🎬",
    descripcion: "Ya puedes crear o unirte a eventos relacionados con películas.",
    fecha: "2025-05-22"
  },
  {
    id: "5",
    titulo: "Nueva función: Dejar de asistir a eventos",
    descripcion: "Ahora puedes gestionar mejor tu agenda. Revisa 'Mis eventos'.",
    fecha: "2025-05-21"
  }
];

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setNovedades(novedadesSimuladas);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: 70 }]}>
      <Text style={styles.title}>Novedades Comunitarias</Text>

      {loading ? (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={{ marginTop: 10, color: "#555" }}>Cargando novedades...</Text>
        </View>
      ) : (
        <FlatList
          data={novedades}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{
              backgroundColor: "#f2f2f2",
              borderRadius: 10,
              padding: 16,
              marginBottom: 12,
              marginHorizontal: 8
            }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>{item.titulo}</Text>
              <Text style={{ color: "#444", marginVertical: 4 }}>{item.descripcion}</Text>
              <Text style={{ fontSize: 12, color: "#888" }}>{item.fecha}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
