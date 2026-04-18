import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from "react-native";
import api from "../../utils/api";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchCourses(), fetchLiveSessions(), fetchBatches()]);
    setLoading(false);
    setRefreshing(false);
  };

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/get-courses");
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchLiveSessions = async () => {
    try {
      const { data } = await api.get("/get-all-live-sessions");
      if (data.success) {
        setLiveSessions(data.sessions);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBatches = async () => {
    try {
      const { data } = await api.get("/get-batches");
      if (data.success) {
        setBatches(data.batches);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderLiveItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/live/${item._id}`)}
      className="bg-red-50 p-4 rounded-3xl mr-4 border border-red-100 w-64"
    >
      <View className="flex-row items-center mb-2">
        <View className="bg-red-500 w-2 h-2 rounded-full animate-pulse mr-2" />
        <Text className="text-red-500 font-bold text-xs uppercase">Live Now</Text>
      </View>
      <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>{item.title}</Text>
      <Text className="text-gray-500 text-sm mb-3">{item.subjectId}</Text>
      <TouchableOpacity 
        onPress={() => router.push(`/live/${item._id}`)}
        className="bg-red-500 py-2 rounded-xl items-center"
      >
        <Text className="text-white font-bold">Join Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderBatchItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/batch/${item._id}`)}
      className="bg-blue-50 p-4 rounded-3xl mr-4 border border-blue-100 w-64"
    >
      <Text className="text-lg font-bold text-blue-900" numberOfLines={1}>{item.name}</Text>
      <Text className="text-gray-500 text-sm mb-2">{item.duration}</Text>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-bold text-blue-900">{item.price === 0 ? "FREE" : `$${item.price}`}</Text>
        <View className="bg-blue-900 px-3 py-1 rounded-lg">
            <Text className="text-white text-xs font-bold">View Details</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/course/${item._id}`)}
      className="bg-white rounded-3xl mb-6 shadow-sm border border-gray-100 overflow-hidden"
    >
      <Image 
        source={{ uri: item.thumbnail?.url || "https://via.placeholder.com/300x150" }} 
        className="w-full h-40 bg-gray-200" 
      />
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800">{item.name}</Text>
        <Text className="text-gray-500 mt-1" numberOfLines={2}>{item.description}</Text>
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-blue-900 font-bold">{item.level}</Text>
          <Text className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-bold">
            {item.price === 0 ? "FREE" : `$${item.price}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <View className="flex-row justify-between items-center mb-6 mt-10">
        <View>
          <Text className="text-gray-500">Hello,</Text>
          <Text className="text-2xl font-bold text-blue-900">{user?.name}</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1e3a8a" />
      ) : (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
          ListHeaderComponent={
            <View>
              {liveSessions.length > 0 && (
                <View className="mb-6">
                  <Text className="text-xl font-bold text-gray-800 mb-4">Live Classes</Text>
                  <FlatList
                    horizontal
                    data={liveSessions}
                    renderItem={renderLiveItem}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}

              {batches.length > 0 && (
                <View className="mb-6">
                  <Text className="text-xl font-bold text-gray-800 mb-4">Upcoming Batches</Text>
                  <FlatList
                    horizontal
                    data={batches}
                    renderItem={renderBatchItem}
                    keyExtractor={(item) => item._id}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
              
              <Text className="text-xl font-bold text-gray-800 mb-4">Explore Courses</Text>
            </View>
          }
          ListEmptyComponent={<Text className="text-center text-gray-500 mt-10">No courses available.</Text>}
        />
      )}
    </View>
  );
}
