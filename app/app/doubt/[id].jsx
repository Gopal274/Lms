import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, Image } from "react-native";
import api from "../../utils/api";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function DoubtDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [doubt, setDoubt] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDoubtDetails();
  }, [id]);

  const fetchDoubtDetails = async () => {
    try {
      const { data } = await api.get(`/get-doubt/${id}`);
      if (data.success) {
        setDoubt(data.doubt);
        setReplies(data.replies);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!newReply.trim()) return;
    setIsSubmitting(true);
    try {
      const { data } = await api.post("/add-doubt-reply", {
        doubtId: id,
        content: newReply
      });
      if (data.success) {
        setNewReply("");
        fetchDoubtDetails();
      }
    } catch (e) {
      alert("Failed to send reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#1e3a8a" /></View>;
  if (!doubt) return <Text className="text-center mt-10">Doubt not found</Text>;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
      keyboardVerticalOffset={100}
    >
      <ScrollView className="flex-1 px-4 pt-4">
        {/* Original Doubt */}
        <View className="bg-blue-50 p-6 rounded-[32px] mb-8">
            <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3 border border-blue-200">
                    <Text className="text-blue-900 font-bold">{doubt.userName[0]}</Text>
                </View>
                <View>
                    <Text className="font-bold text-gray-900">{doubt.userName}</Text>
                    <Text className="text-xs text-gray-400">{new Date(doubt.createdAt).toLocaleString()}</Text>
                </View>
            </View>
            <Text className="text-xl font-black text-gray-900 mb-2">{doubt.title}</Text>
            <Text className="text-gray-700 leading-6">{doubt.description}</Text>
            
            {doubt.attachments?.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 flex-row">
                    {doubt.attachments.map((img, i) => (
                        <Image key={i} source={{ uri: img.url }} className="w-32 h-32 rounded-2xl mr-2 bg-gray-200" />
                    ))}
                </ScrollView>
            )}
        </View>

        <Text className="text-lg font-black text-gray-900 mb-6">Discussion ({doubt.replyCount})</Text>

        {/* Replies */}
        {replies.map((reply) => (
            <View key={reply._id} className={`mb-6 flex-row ${reply.userId === user._id ? 'justify-end' : 'justify-start'}`}>
                <View className={`max-w-[85%] p-4 rounded-3xl ${reply.isTeacherReply ? 'bg-orange-50 border border-orange-100' : 'bg-gray-50 border border-gray-100'}`}>
                    <View className="flex-row items-center mb-2">
                        <Text className={`text-[10px] font-black uppercase ${reply.isTeacherReply ? 'text-orange-600' : 'text-blue-900'}`}>
                            {reply.isTeacherReply ? 'MENTOR RESPONSE' : reply.userName}
                        </Text>
                    </View>
                    <Text className="text-gray-800 leading-5">{reply.content}</Text>
                </View>
            </View>
        ))}
        <View className="h-10" />
      </ScrollView>

      {/* Input Area */}
      <View className="p-4 border-t border-gray-100 bg-white flex-row items-center">
        <TextInput 
          placeholder="Type your reply..."
          className="flex-1 bg-gray-50 p-4 rounded-3xl mr-3 font-medium"
          value={newReply}
          onChangeText={setNewReply}
          multiline
        />
        <TouchableOpacity 
          disabled={isSubmitting}
          onPress={handleSendReply}
          className="w-14 h-14 bg-blue-900 rounded-full items-center justify-center shadow-lg shadow-blue-200"
        >
          {isSubmitting ? <ActivityIndicator color="white" /> : <Ionicons name="send" size={24} color="white" />}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
