// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetailScreen from "./src/screens/EventDetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#fff" }
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Iniciar Sesión" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Registro" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Eventos" }} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: "Detalles del Evento" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
