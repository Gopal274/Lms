import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput, Image, ScrollView } from "react-native";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function DoubtsScreen() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, my, resolved
  const { user } = useAuth();
  const router = useRouter();
  
  const [showModal, setShowModal] = useState(false);
  const [newDoubt, setNewDoubt] = useState({ title: "", description: "", subject: "Physics" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [aiSolution, setAiSolution] = useState("");
  const [showAIModal, setShowAIModal] = useState(false);
  const [isSolvingAI, setIsSolvingAI] = useState(false);

  useEffect(() => {
    fetchDoubts();
  }, [filter]);

  const fetchDoubts = async () => {
    setLoading(true);
    try {
      let url = "doubt/get-doubts";
      if (filter === "my") url += `?userId=${user._id}`;
      if (filter === "resolved") url += "?status=resolved";
      
      const { data } = await api.get(url);
      if (data.success) {
        setDoubts(data.doubts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDoubt = async () => {
    if (!newDoubt.title || !newDoubt.description) return;
    setIsSubmitting(true);
    try {
      const { data } = await api.post("doubt/create-doubt", newDoubt);
      if (data.success) {
        setShowModal(false);
        setNewDoubt({ title: "", description: "", subject: "Physics" });
        fetchDoubts();
      }
    } catch (e) {
      alert("Failed to post doubt");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAISolve = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission required to access gallery');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setIsSolvingAI(true);
      setShowAIModal(true);
      setAiSolution("");
      try {
        const { data } = await api.post("doubt/ai-solve", {
          image: result.assets[0].base64,
          text: "Identify and solve the problem in this image."
        });
        if (data.success) {
          setAiSolution(data.solution);
        }
      } catch (e) {
        setAiSolution("AI failed to solve this problem. Please try again with a clearer image.");
      } finally {
        setIsSolvingAI(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/doubt/${item._id}`)}
      className="bg-white p-5 rounded-[32px] mb-4 border border-gray-100 shadow-sm"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="bg-blue-50 px-3 py-1 rounded-full">
            <Text className="text-blue-900 font-black text-[10px] uppercase">{item.subject}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${item.status === 'resolved' ? 'bg-green-50' : 'bg-orange-50'}`}>
            <Text className={`font-black text-[10px] uppercase ${item.status === 'resolved' ? 'text-green-600' : 'text-orange-600'}`}>
                {item.status}
            </Text>
        </View>
      </View>

      <Text className="text-lg font-bold text-gray-900 mb-2">{item.title}</Text>
      <Text className="text-gray-500 text-sm mb-4" numberOfLines={2}>{item.description}</Text>

      <View className="flex-row items-center justify-between border-t border-gray-50 pt-4">
        <View className="flex-row items-center">
            <View className="w-6 h-6 rounded-full bg-gray-200 mr-2 items-center justify-center">
                <Text className="text-[10px] font-bold">{item.userName[0]}</Text>
            </View>
            <Text className="text-xs text-gray-400 font-medium">{item.userName}</Text>
        </View>
        <View className="flex-row items-center">
            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#94a3b8" />
            <Text className="text-xs text-gray-400 font-bold ml-1">{item.replyCount} Replies</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white px-4 pt-4 pb-2 border-b border-gray-100">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {['all', 'my', 'resolved'].map((f) => (
                <TouchableOpacity 
                    key={f}
                    onPress={() => setFilter(f)}
                    className={`px-6 py-2 rounded-full mr-2 border ${filter === f ? 'bg-blue-900 border-blue-900' : 'bg-white border-gray-100'}`}
                >
                    <Text className={`font-bold capitalize ${filter === f ? 'text-white' : 'text-gray-500'}`}>{f === 'my' ? 'My Doubts' : f}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      <FlatList
        data={doubts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          !loading && <View className="items-center mt-20">
            <Ionicons name="help-circle-outline" size={64} color="#ccc" />
            <Text className="text-gray-400 mt-4 font-bold">No doubts found.</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={fetchDoubts}
      />

      <TouchableOpacity 
        onPress={() => setShowModal(true)}
        className="absolute bottom-6 right-6 w-16 h-16 bg-blue-900 rounded-full items-center justify-center shadow-xl shadow-blue-400"
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={handleAISolve}
        className="absolute bottom-24 right-6 w-16 h-16 bg-white rounded-full items-center justify-center shadow-xl border border-blue-50"
      >
        <Ionicons name="sparkles" size={28} color="#1e3a8a" />
      </TouchableOpacity>

      <Modal visible={showAIModal} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[40px] p-8 h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                    <Ionicons name="sparkles" size={24} color="#1e3a8a" className="mr-2" />
                    <Text className="text-2xl font-black text-gray-900 ml-2">AI Solution</Text>
                </View>
                <TouchableOpacity onPress={() => setShowAIModal(false)}>
                    <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {isSolvingAI ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#1e3a8a" />
                    <Text className="mt-4 text-gray-500 font-bold">AI is analyzing the problem...</Text>
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className="text-gray-800 text-lg leading-7 pb-10">
                        {aiSolution}
                    </Text>
                </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[40px] p-8 pb-12">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-black text-gray-900">Ask a Doubt</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                    <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <TextInput 
              placeholder="Title (e.g. Problem with Newton's 2nd Law)"
              className="bg-gray-50 p-4 rounded-2xl mb-4 font-bold"
              value={newDoubt.title}
              onChangeText={(text) => setNewDoubt({ ...newDoubt, title: text })}
            />
            
            <TextInput 
              placeholder="Describe your doubt in detail..."
              className="bg-gray-50 p-4 rounded-2xl mb-4 h-32 text-top"
              multiline
              value={newDoubt.description}
              onChangeText={(text) => setNewDoubt({ ...newDoubt, description: text })}
            />

            <View className="flex-row flex-wrap gap-2 mb-8">
                {['Physics', 'Chemistry', 'Math', 'Biology'].map((s) => (
                    <TouchableOpacity 
                        key={s}
                        onPress={() => setNewDoubt({ ...newDoubt, subject: s })}
                        className={`px-4 py-2 rounded-full border ${newDoubt.subject === s ? 'bg-blue-900 border-blue-900' : 'bg-white border-gray-100'}`}
                    >
                        <Text className={`font-bold ${newDoubt.subject === s ? 'text-white' : 'text-gray-500'}`}>{s}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity 
              disabled={isSubmitting}
              onPress={handleCreateDoubt}
              className="bg-blue-900 p-5 rounded-3xl items-center shadow-lg"
            >
              {isSubmitting ? <ActivityIndicator color="white" /> : <Text className="text-white font-black uppercase tracking-widest">Post Doubt</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
