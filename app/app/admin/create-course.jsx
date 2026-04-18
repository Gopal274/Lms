import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../../utils/api";
import { useRouter } from "expo-router";

export default function CreateCourse() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [tags, setTags] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [demoUrl, setDemoUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !tags || !demoUrl) return Alert.alert("Error", "Please fill required fields");

    setLoading(true);
    try {
      const payload = {
        name,
        description,
        price: parseInt(price) || 0,
        estimatedPrice: parseInt(price) * 1.5 || 0,
        tags,
        level,
        demoUrl,
        benefits: [{ title: "Access to all lessons" }],
        prerequisites: [{ title: "Basic understanding" }],
        thumbnail: image ? `data:image/jpeg;base64,${image.base64}` : null,
      };

      const { data } = await api.post("/create-course", payload);
      if (data.success) {
        Alert.alert("Success", "Course created successfully");
        router.replace("/admin/dashboard");
      }
    } catch (e) {
      Alert.alert("Error", e.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-6 text-blue-900">New Course Details</Text>
      
      <View className="space-y-4">
        <View className="mb-4">
          <Text className="text-gray-600 font-bold mb-1">Course Name *</Text>
          <TextInput
            placeholder="e.g. Complete React Native Course"
            value={name}
            onChangeText={setName}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 font-bold mb-1">Description *</Text>
          <TextInput
            placeholder="What will students learn?"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200 min-h-[100px] text-top"
          />
        </View>

        <View className="flex-row space-x-4 mb-4">
          <View className="flex-1">
            <Text className="text-gray-600 font-bold mb-1">Price (USD)</Text>
            <TextInput
              placeholder="0 for Free"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              className="bg-gray-100 p-4 rounded-xl border border-gray-200"
            />
          </View>
          <View className="flex-1">
            <Text className="text-gray-600 font-bold mb-1">Level</Text>
            <TextInput
              placeholder="Beginner/Pro"
              value={level}
              onChangeText={setLevel}
              className="bg-gray-100 p-4 rounded-xl border border-gray-200"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 font-bold mb-1">Tags (comma separated) *</Text>
          <TextInput
            placeholder="React, Mobile, Coding"
            value={tags}
            onChangeText={setTags}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200"
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 font-bold mb-1">Demo Video URL *</Text>
          <TextInput
            placeholder="https://..."
            value={demoUrl}
            onChangeText={setDemoUrl}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200"
          />
        </View>

        <Text className="text-gray-600 font-bold mb-1">Course Thumbnail</Text>
        <TouchableOpacity 
          onPress={pickImage}
          className="bg-gray-100 h-40 rounded-xl items-center justify-center border-dashed border-2 border-gray-300 mb-6"
        >
          {image ? (
            <Image source={{ uri: image.uri }} className="w-full h-full rounded-xl" />
          ) : (
            <Text className="text-gray-500">Tap to select thumbnail</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleSubmit}
          className="bg-blue-900 p-4 rounded-xl items-center shadow-lg mt-6"
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-lg">Create Course</Text>}
        </TouchableOpacity>
      </View>
      <View className="h-20" />
    </ScrollView>
  );
}
