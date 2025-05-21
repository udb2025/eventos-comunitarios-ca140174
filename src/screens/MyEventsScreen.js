import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { auth, db } from "../services/firebaseConfig";
import styles from "../theme/styles";

export default function MyEventsScreen() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const q = query(
          collection(db, "eventos"),
          where("asistentes", "array-contains", uid)
        );
       const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.nombre,
          location: d.ubicacion,
          date: d.fecha.toDate(),
          rating: Number(d.calificacion),
          category: d.categoria,
          attendees: `${d.asistentes?.length || 0} personas asistirán`
        };
      });

        setEventos(data);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const groupEvents = (events) => {
  const today = dayjs();
  const tomorrow = today.add(1, "day");
  const nextWeek = today.add(7, "days");

  const grouped = {
    "Hoy": [],
    "Mañana": [],
    "Esta semana": [],
    "Próximos": [],
    "Pasados": [],
  };
  for (let event of events) {
    const d = dayjs(event.date);

    if (d.isSame(today, "day")) {
      grouped["Hoy"].push(event);
    } else if (d.isSame(tomorrow, "day")) {
      grouped["Mañana"].push(event);
    } else if (d.isAfter(today) && d.isBefore(nextWeek)) {
      grouped["Esta semana"].push(event);
    } else if (d.isAfter(nextWeek)) {
      grouped["Próximos"].push(event);
    } else if (d.isBefore(today)) {
      grouped["Pasados"].push(event);
    }
  }

  return grouped;
  };

  const groupedEvents = groupEvents(eventos);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10, color: "#666" }}>Cargando eventos...</Text>
      </View>
    );
  }

  return (
<KeyboardAvoidingWrapper style={styles.container}>
      {Object.entries(groupedEvents).map(([section, events]) =>
        events.length > 0 && (
          <View key={section} style={{ marginBottom: 24 }}>
            <Text style={styles.sectionTitle}>{section}</Text>
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </View>
        )
      )}
 </KeyboardAvoidingWrapper>
  );
}
