import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    if (!agreed) {
        return Alert.alert("Required", "Please agree to the Terms and Privacy Policy to continue.");
    }
    setLoading(true);
    try {
      await signup(name, email, password, referralCode);
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
            className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-4"
          />
          <TextInput
            placeholder="Referral Code (Optional)"
            value={referralCode}
            onChangeText={setReferralCode}
            autoCapitalize="characters"
            className="bg-gray-100 p-4 rounded-xl border border-gray-200 mb-6"
          />

          <View className="flex-row items-start mb-8 px-1">
            <TouchableOpacity 
                onPress={() => setAgreed(!agreed)}
                className={`w-6 h-6 rounded-md border-2 items-center justify-center mt-0.5 ${agreed ? 'bg-blue-900 border-blue-900' : 'border-gray-300'}`}
            >
                {agreed && <Ionicons name="checkmark" size={16} color="white" />}
            </TouchableOpacity>
            <View className="ml-3 flex-1 flex-row flex-wrap">
                <Text className="text-gray-500 font-medium">I agree to the </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/terms')}>
                    <Text className="text-blue-900 font-bold">Terms of Service</Text>
                </TouchableOpacity>
                <Text className="text-gray-500 font-medium"> and </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/privacy-policy')}>
                    <Text className="text-blue-900 font-bold">Privacy Policy</Text>
                </TouchableOpacity>
            </View>
          </View>

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
