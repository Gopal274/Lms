import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import Constants from 'expo-constants';

// Get the host IP from Expo Constants to work on real devices and emulators
const debuggerHost = Constants.expoConfig?.hostUri;
const host = debuggerHost ? debuggerHost.split(':').shift() : 'localhost';

const API_BASE_URL = Platform.OS === 'android' 
  ? `http://${host === 'localhost' ? '10.0.2.2' : host}:8000/api/v1` 
  : "http://localhost:8000/api/v1";

console.log(`[API] Platform: ${Platform.OS}`);
console.log(`[API] Connecting to backend at: ${API_BASE_URL}`);

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
