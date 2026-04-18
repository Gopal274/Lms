import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Link } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (e) {
      alert("Login failed: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-3xl font-bold mb-8 text-blue-900">Welcome Back</Text>
      
      <View className="w-full">
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
          onPress={handleLogin}
          className="bg-blue-900 p-4 rounded-xl items-center shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-6 flex-row">
        <Text className="text-gray-600">Don&apos;t have an account? </Text>
        <Link href="/(auth)/signup" className="text-blue-900 font-bold">Sign Up</Link>
      </View>
    </View>
  );
}
