import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      if (!user?.batches || user.batches.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch resources for all batches student belongs to
      const allResources = [];
      for (const batchId of user.batches) {
        const { data } = await api.get(`/get-resources/${batchId}`);
        if (data.success) {
          allResources.push(...data.resources);
        }
      }
      setResources(allResources.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'dpp': return 'list-circle';
      case 'assignment': return 'document-attach';
      case 'notes': return 'book';
      default: return 'document';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => Linking.openURL(item.file.url)}
      className="bg-white p-4 rounded-2xl mb-4 flex-row items-center shadow-sm border border-gray-100"
    >
      <View className="bg-blue-50 p-3 rounded-full mr-4">
        <Ionicons name={getIcon(item.type)} size={24} color="#1e3a8a" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full text-xs font-bold uppercase mr-2">
            {item.type}
          </Text>
          <Text className="text-gray-400 text-xs">
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Ionicons name="download-outline" size={24} color="#666" />
    </TouchableOpacity>
  );

  if (loading) return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <ActivityIndicator size="large" color="#1e3a8a" />
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <FlatList
        data={resources}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="text-gray-500">Batch Study Materials</Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center mt-20">
            <Ionicons name="folder-open-outline" size={64} color="#ccc" />
            <Text className="text-gray-400 mt-4 text-center">
              No materials found. Enroll in a batch to see DPPs and Notes.
            </Text>
          </View>
        }
      />
    </View>
  );
}
