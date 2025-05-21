import dayjs from "dayjs";
import React from "react";
import { Text, View } from "react-native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import styles from '../theme/styles'; // importa el archivo

export default function EventCard({ event }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.location}>📍{event.location}</Text>
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


