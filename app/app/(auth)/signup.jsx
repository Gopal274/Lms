import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Link } from "expo-router";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async () => {
    setLoading(true);
    try {
      await signup(name, email, password);
    } catch (e) {
      alert("Signup failed: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow:1}} className="bg-white p-6">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold mb-8 text-blue-900">Create Account</Text>
        
        <View className="w-full">
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-4"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-4"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-6"
          />

          <TouchableOpacity 
            onPress={handleSignup}
            className="bg-blue-900 p-4 rounded-xl items-center shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-6 flex-row">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login" className="text-blue-900 font-bold">Login</Link>
        </View>
      </View>
    </ScrollView>
  );
}
