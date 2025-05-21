import dayjs from "dayjs";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";

const mockEvents = [
  {
    id: 1,
    name: "Reunión de la comunidad",
    location: "Parque Central",
    date: dayjs().add(1, "day").toDate(), // mañana
    rating: 4.5,
    attendees: "Juan y 12 más asistirán",
    category: "Comunitario"
  },
  {
    id: 2,
    name: "Taller de reciclaje",
    location: "Centro cultural",
    date: dayjs().add(2, "days").toDate(),
    rating: 5,
    attendees: "Ana y 7 más asistirán",
    category: "Comunitario"
  },
  {
    id: 3,
    name: "Cine al aire libre",
    location: "Plaza pública",
    date: dayjs().subtract(2, "days").toDate(), // evento pasado
    rating: 4,
    attendees: "Carlos y 20 más asistieron",
    category: "Comunitario"
  },
];

function groupEvents(events) {
  const today = dayjs();
  const tomorrow = today.add(1, "day");
  const grouped = {
    "Mañana": [],
    "Esta semana": [],
    "Pasados": []
  };

  for (let event of events) {
    const d = dayjs(event.date);
    if (d.isSame(tomorrow, 'day')) grouped["Mañana"].push(event);
    else if (d.isAfter(today) && d.isBefore(today.add(7, "days"))) grouped["Esta semana"].push(event);
    else if (d.isBefore(today)) grouped["Pasados"].push(event);
  }

  return grouped;
}

export default function MyEventsScreen() {
  const groupedEvents = groupEvents(mockEvents);

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40, // 👈 agrega esto
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
});
