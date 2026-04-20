import { Drawer } from "expo-router/drawer";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "../global.css";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNotifications } from "../hooks/useNotifications";
import { DownloadProvider } from "../context/DownloadContext";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DrawerSidebar from "../components/drawer/DrawerSidebar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width } = Dimensions.get('window');

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
        const { data } = await api.get("payment/stripe-key");
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StripeProvider 
            publishableKey={stripeKey}
            merchantIdentifier="merchant.com.anonymous.app"
        >
          <AuthProvider>
            <DownloadProvider>
              <NotificationWrapper>
                <BottomSheetModalProvider>
                  <Drawer 
                    drawerContent={(props) => <DrawerSidebar {...props} />}
                    screenOptions={{ 
                      headerShown: false,
                      drawerStyle: {
                        width: width * 0.82,
                        backgroundColor: '#ffffff',
                      },
                      overlayColor: 'rgba(0,0,0,0.5)',
                    }}
                  >
                    <Drawer.Screen 
                      name="(tabs)" 
                      options={{ 
                        drawerLabel: "Main App",
                        title: "Home",
                        drawerIcon: ({ color }) => <Ionicons name="grid-outline" size={22} color={color} />
                      }} 
                    />
                    <Drawer.Screen 
                      name="(auth)" 
                      options={{ 
                        drawerItemStyle: { display: 'none' },
                        headerShown: false
                      }} 
                    />
                    <Drawer.Screen 
                      name="index" 
                      options={{ 
                        drawerItemStyle: { display: 'none' } 
                      }} 
                    />
                    <Drawer.Screen 
                      name="admin" 
                      options={{ 
                        drawerItemStyle: { display: 'none' } 
                      }} 
                    />
                    <Drawer.Screen 
                      name="batch/[id]" 
                      options={{ 
                        drawerItemStyle: { display: 'none' },
                        title: "Batch"
                      }} 
                    />
                    <Drawer.Screen 
                      name="course/[id]" 
                      options={{ 
                        drawerItemStyle: { display: 'none' },
                        title: "Course"
                      }} 
                    />
                    <Drawer.Screen 
                      name="doubt/[id]" 
                      options={{ 
                        drawerItemStyle: { display: 'none' },
                        title: "Doubt"
                      }} 
                    />
                    <Drawer.Screen 
                      name="lesson/[id]" 
                      options={{ 
                        drawerItemStyle: { display: 'none' },
                        title: "Lesson"
                      }} 
                    />
                    <Drawer.Screen 
                      name="live/[id]" 
                      options={{ 
                        drawerItemStyle: { display: 'none' },
                        headerShown: false
                      }} 
                    />
                    <Drawer.Screen 
                      name="testing/index" 
                      options={{ 
                        drawerItemStyle: { display: 'none' } 
                      }} 
                    />
                    <Drawer.Screen 
                      name="all-classes" 
                      options={{ 
                        drawerItemStyle: { display: 'none' },
                        headerShown: false
                      }} 
                    />
                  </Drawer>
                </BottomSheetModalProvider>
              </NotificationWrapper>
            </DownloadProvider>
          </AuthProvider>
        </StripeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}