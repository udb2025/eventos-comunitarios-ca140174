import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBKPb5cGfgH5vlSEbHJZTO6ZGSEhvq3zug",
  authDomain: "eventos-comunitarios-ca140174.firebaseapp.com",
  projectId: "eventos-comunitarios-ca140174",
  storageBucket: "eventos-comunitarios-ca140174.firebasestorage.app",
  messagingSenderId: "1088351713286",
  appId: "1:1088351713286:web:cdfaf697fd79a9b8e82b87",
  measurementId: "G-02KBVTQBTS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


