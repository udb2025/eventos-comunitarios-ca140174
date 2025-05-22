# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

src/
├── screens/              # Pantallas principales de la aplicación
│   ├── HomeScreen.js          # Vista inicial con novedades comunitarias
│   ├── LoginScreen.js         # Inicio de sesión
│   ├── RegisterScreen.js      # Registro de nuevos usuarios
│   ├── ProfileScreen.js       # Perfil, cerrar sesión, acceso a Acerca de la app
│   ├── MyEventsScreen.js      # Eventos confirmados por el usuario
│   ├── CreateEventScreen.js   # Crear nuevos eventos
│   ├── ExploreScreen.js       # Exploración de eventos públicos por categoría
│   └── AboutScreen.js         # Información legal y versión
│
├── services/             # Configuración externa
│   └── firebaseConfig.js     # Inicialización de Firebase
│
├── sttheme/              # Estilos globales
│   └── styles.js             # Archivo de estilos centralizados
│
└── components/           # Componentes reutilizables
    ├── EventCard.js          # Tarjeta visual de eventos
    └── KeyboardAvoidingWrapper.js  # Wrapper para formularios y teclado

Licencia
   Todos los eventos publicados están licenciados bajo Creative Commons BY-NC 4.0.
   Esto significa que se pueden compartir libremente con atribución, pero no con fines comerciales.
 Autor

   Moises Castillo
   Estudiante de la Universidad Don Bosco
   Carrera: Ingeniería en Ciencias de la Computación
   Proyecto final de la asignatura DPS94
   Carnet CA140174
