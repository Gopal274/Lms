import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import api from "../../utils/api";
import { useRouter } from "expo-router";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/get-all-courses");
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (e) {
      alert("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-100">
      <View className="flex-row">
        <Image 
          source={{ uri: item.thumbnail?.url || "https://via.placeholder.com/150" }} 
          className="w-20 h-20 rounded-xl bg-gray-200"
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
          <Text className="text-gray-500 mb-2" numberOfLines={2}>{item.description}</Text>
          <View className="flex-row items-center justify-between">
             <Text className="text-blue-900 font-bold">${item.price}</Text>
             <Text className="text-gray-400 text-xs">{item.purchased} sales</Text>
          </View>
        </View>
      </View>
      <View className="flex-row mt-4 space-x-2">
        <TouchableOpacity 
          onPress={() => router.push(`/admin/course/${item._id}/add-lesson`)}
          className="bg-blue-900 px-4 py-2 rounded-lg flex-1 items-center"
        >
          <Text className="text-white font-bold">Manage Content</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-blue-900 px-4 py-2 rounded-lg flex-1 items-center">
          <Text className="text-blue-900 font-bold">Edit Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <TouchableOpacity 
        onPress={() => router.push("/admin/create-course")}
        className="bg-blue-900 p-4 rounded-xl mb-6 items-center shadow-lg"
      >
        <Text className="text-white font-bold text-lg">+ Create New Course</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#1e3a8a" />
      ) : (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text className="text-center text-gray-500 mt-10">No courses created yet.</Text>}
        />
      )}
    </View>
  );
}
