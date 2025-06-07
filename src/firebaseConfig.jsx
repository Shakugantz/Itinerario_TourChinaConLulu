import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyOcf9AbxkCJJhxeTwzKSuNgV7dVm16KA",
  authDomain: "itinerario-viajechinaconlulu.firebaseapp.com",
  projectId: "itinerario-viajechinaconlulu",
  storageBucket: "itinerario-viajechinaconlulu.firebasestorage.app",
  messagingSenderId: "52117745951",
  appId: "1:52117745951:web:f27c76703593f4a1bc402a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
