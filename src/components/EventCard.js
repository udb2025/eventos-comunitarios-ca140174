import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';

export default function EventCard({ event }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.location}>📍 {event.location}</Text>
        <StarRatingDisplay rating={event.rating} starSize={20} color="#000" />
        <Text style={styles.attendees}>{event.attendees}</Text>
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.dateDay}>{dayjs(event.date).format("DD")}</Text>
        <Text style={styles.dateMonth}>{dayjs(event.date).format("MMM").toUpperCase()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  attendees: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  dateBox: {
    backgroundColor: "#eee",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },
  category: {
  fontSize: 12,
  color: "#999",
  marginBottom: 4,
},
});
