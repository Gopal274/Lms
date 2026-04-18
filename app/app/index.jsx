import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/home");
      }
    }
  }, [user, loading]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#1e3a8a" />
    </View>
  );
}