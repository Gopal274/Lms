import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "../global.css";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNotifications } from "../hooks/useNotifications";

function NotificationWrapper({ children }) {
  const { user } = useAuth();
  useNotifications(!!user);
  return children;
}

export default function RootLayout() {
  const [stripeKey, setStripeKey] = useState("");

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const { data } = await api.get("/stripe-key");
        if (data.success) {
          setStripeKey(data.publishableKey);
        }
      } catch (e) {
        console.log("Stripe key fetch failed", e);
      }
    };
    fetchKey();
  }, []);

  return (
    <StripeProvider publishableKey={stripeKey}>
      <AuthProvider>
        <NotificationWrapper>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="admin" />
          </Stack>
        </NotificationWrapper>
      </AuthProvider>
    </StripeProvider>
  );
}
