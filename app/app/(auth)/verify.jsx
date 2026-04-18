import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { verifyOTP } = useAuth();

  const handleVerify = async () => {
    if (otp.length !== 4) return alert("Enter 4-digit OTP");
    setLoading(true);
    try {
      await verifyOTP(otp);
      alert("Account activated! Please login.");
    } catch (e) {
      alert("Verification failed: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-3xl font-bold mb-4 text-blue-900">Verify Email</Text>
      <Text className="text-gray-600 mb-8 text-center">
        Enter the 4-digit code sent to your email
      </Text>
      
      <View className="w-full">
        <TextInput
          placeholder="0000"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={4}
          className="bg-gray-100 p-4 rounded-xl border border-gray-200 text-center text-2xl tracking-[10px] mb-6"
        />
        
        <TouchableOpacity 
          onPress={handleVerify}
          className="bg-blue-900 p-4 rounded-xl items-center shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
