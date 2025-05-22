import React from "react";
import { Linking, Text, View } from "react-native";
import styles from "../theme/styles";


export default function AboutScreen() {
  const version = "1.0.0"; // cambia aquí según tu versión real

  return (
    <View style={[styles.container, { padding: 20 }]}>
      <Text style={styles.title}>Acerca de la App</Text>

      <Text style={{ color: "#333", fontSize: 16, marginTop: 20 }}>
        Esta aplicación permite a los usuarios gestionar y asistir a eventos comunitarios de forma sencilla y organizada.
      </Text>

      <Text style={{ fontWeight: "bold", marginTop: 24 }}>Versión:</Text>
      <Text style={{ color: "#555" }}>{version}</Text>

      <Text style={{ fontWeight: "bold", marginTop: 24 }}>Licencia:</Text>
      <Text style={{ color: "#333" }}>
        🛈 Todos los eventos publicados están licenciados bajo{" "}
        <Text
          style={{ color: "#1e90ff" }}
          onPress={() => Linking.openURL("https://creativecommons.org/licenses/by-nc/4.0/deed.es")}
        >
          Creative Commons BY-NC 4.0
        </Text>
        . Esto significa que se pueden compartir libremente con atribución, pero no con fines comerciales.
      </Text>
    </View>
  );
}
