import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAyaY2mpNFfLZTITU8R95FjnbQHWH1FCLA",
  authDomain: "pooch-parks.firebaseapp.com",
  projectId: "pooch-parks",
  storageBucket: "pooch-parks.appspot.com",
  messagingSenderId: "459286994090",
  appId: "1:459286994090:web:3637761825203a5ce904d3",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
