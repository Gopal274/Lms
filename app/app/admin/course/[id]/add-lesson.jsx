import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import api from "../../../../utils/api";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function AddLesson() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSection, setVideoSection] = useState("Introduction");
  const [videoLength, setVideoLength] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !videoUrl) return Alert.alert("Error", "Please fill required fields");

    setLoading(true);
    try {
      // First fetch current course to get existing courseData
      const { data: courseData } = await api.get(`course/get-course/${id}`);
      if (!courseData.success) throw new Error("Failed to fetch course");

      const currentCourse = courseData.course;
      const updatedCourseData = [...(currentCourse.courseData || [])];
      
      updatedCourseData.push({
        title,
        description,
        videoUrl,
        videoSection,
        videoLength: parseInt(videoLength) || 0,
        links: [],
        questions: []
      });

      const { data } = await api.put(`course/edit-course/${id}`, {
        courseData: updatedCourseData
      });

      if (data.success) {
        Alert.alert("Success", "Lesson added successfully");
        router.back();
      }
    } catch (e) {
      Alert.alert("Error", "Failed to add lesson: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-6 text-blue-900">Add New Lesson</Text>
      
      <View className="space-y-4">
        <View className="mb-4">
          <Text className="text-gray-600 font-bold mb-1">Lesson Title *</Text>
          <TextInput
            placeholder="e.g. Intro to Physics"
            value={title}
            onChangeText={setTitle}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 font-bold mb-1">Video URL *</Text>
          <TextInput
            placeholder="https://..."
            value={videoUrl}
            onChangeText={setVideoUrl}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 font-bold mb-1">Section</Text>
          <TextInput
            placeholder="e.g. Chapter 1"
            value={videoSection}
            onChangeText={setVideoSection}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200"
          />
        </View>

        <View className="flex-row space-x-4 mb-4">
          <View className="flex-1">
            <Text className="text-gray-600 font-bold mb-1">Length (mins)</Text>
            <TextInput
              placeholder="e.g. 45"
              value={videoLength}
              onChangeText={setVideoLength}
              keyboardType="numeric"
              className="bg-gray-100 p-4 rounded-xl border border-gray-200"
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 font-bold mb-1">Description</Text>
          <TextInput
            placeholder="What is this lesson about?"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200 min-h-[100px] text-top"
          />
        </View>

        <TouchableOpacity 
          onPress={handleSubmit}
          className="bg-blue-900 p-4 rounded-xl items-center shadow-lg mt-6"
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-lg">Add Lesson</Text>}
        </TouchableOpacity>
      </View>
      <View className="h-20" />
    </ScrollView>
  );
}
