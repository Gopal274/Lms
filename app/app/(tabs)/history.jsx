import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from "react-native";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { useRouter } from "expo-router";

const History = () => {
  const { user, refreshUser } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPurchasedCourses();
  }, [user]);

  const fetchPurchasedCourses = async () => {
    if (!user?.courses) {
        setLoading(false);
        return;
    }
    
    try {
        // Since user.courses only contains IDs, we fetch details for each
        const coursesData = await Promise.all(
            user.courses.map(async (c) => {
                const { data } = await api.get(`/get-course/${c.courseId}`);
                return data.course;
            })
        );
        setPurchasedCourses(coursesData.filter(c => c !== null));
    } catch (e) {
        console.error("Failed to fetch purchased courses", e);
    } finally {
        setLoading(false);
        setRefreshing(false);
    }
  };

  const onRefresh = async () => {
      setRefreshing(true);
      await refreshUser();
      await fetchPurchasedCourses();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/lesson/${item._id}`)}
      className="bg-white rounded-3xl mb-6 shadow-sm border border-gray-100 overflow-hidden flex-row p-3 items-center"
    >
      <Image 
        source={{ uri: item.thumbnail?.url || "https://via.placeholder.com/100x100" }} 
        className="w-24 h-24 rounded-2xl bg-gray-200" 
      />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>{item.name}</Text>
        <Text className="text-blue-900 font-medium mt-1">{item.level}</Text>
        <View className="bg-green-100 self-start px-2 py-1 rounded-md mt-2">
            <Text className="text-green-700 text-xs font-bold">PURCHASED</Text>
        </View>
      </View>
      <Text className="text-2xl text-gray-300 ml-2">▶️</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-3xl font-bold text-blue-900 mb-6 mt-10">My Courses</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1e3a8a" />
      ) : (
        <FlatList
          data={purchasedCourses}
          renderItem={renderItem}
          keyExtractor={(item) => item?._id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View className="items-center mt-20">
                <Text className="text-gray-400 text-lg">No courses purchased yet.</Text>
                <TouchableOpacity 
                    onPress={() => router.push("/(tab)/home")}
                    className="mt-4 bg-blue-900 px-6 py-3 rounded-xl"
                >
                    <Text className="text-white font-bold">Browse Courses</Text>
                </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}

export default History;
