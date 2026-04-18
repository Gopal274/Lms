import { Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function AdminLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/home");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1e3a8a" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ 
      headerShown: true, 
      headerTitleStyle: { fontWeight: 'bold', color: '#1e3a8a' },
      headerTintColor: '#1e3a8a'
    }}>
      <Stack.Screen name="dashboard" options={{ title: "Admin Dashboard" }} />
      <Stack.Screen name="create-course" options={{ title: "Create Course" }} />
      <Stack.Screen name="course/[id]/add-lesson" options={{ title: "Add Lesson" }} />
    </Stack>
  );
}
