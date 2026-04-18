import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";
import { useRouter } from "expo-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const { data } = await api.get("/me");
        if (data.success) {
          setUser(data.user);
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }
      }
    } catch (e) {
      console.error("Failed to load user", e);
      // If token is invalid, logout
      if (e.response?.status === 401) {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    if (data.success) {
      await AsyncStorage.setItem("token", data.accessToken);
      // After login, fetch full user info to get courses etc.
      const userRes = await api.get("/me");
      if (userRes.data.success) {
          setUser(userRes.data.user);
          await AsyncStorage.setItem("user", JSON.stringify(userRes.data.user));
      }
      router.replace("/(tabs)/home");
    }
    return data;
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post("/register", { name, email, password });
    if (data.success) {
      // Store activationToken for verify screen
      await AsyncStorage.setItem("activationToken", data.activationToken);
      router.push("/(auth)/verify");
    }
    return data;
  };

  const verifyOTP = async (activation_code) => {
    const activation_token = await AsyncStorage.getItem("activationToken");
    const { data } = await api.post("/activate-user", {
      activation_token,
      activation_code,
    });
    if (data.success) {
      router.replace("/(auth)/login");
    }
    return data;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("activationToken");
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, verifyOTP, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
