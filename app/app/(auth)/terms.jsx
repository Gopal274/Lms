import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TermsOfService() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="pt-16 px-6 pb-6 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text className="text-2xl font-black text-blue-900">Terms of Service</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <Text className="text-gray-500 mb-6 font-medium">Last Updated: April 18, 2026</Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">1. Acceptance of Terms</Text>
        <Text className="text-gray-600 mb-6 leading-6">
          By accessing or using our LMS platform, you agree to be bound by these terms. If you do not agree to all of the terms, do not use our services.
        </Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">2. Use of Content</Text>
        <Text className="text-gray-600 mb-6 leading-6">
          All educational content provided on this platform is for your personal, non-commercial use only. Unauthorized reproduction, distribution, or screen recording of content is strictly prohibited and will lead to immediate account termination.
        </Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">3. Account Sharing & Devices</Text>
        <Text className="text-gray-600 mb-6 leading-6">
          Each account is for a single user. You may log in to a maximum of two devices. Sharing your account credentials with others is a violation of these terms.
        </Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">4. Payments & Refunds</Text>
        <Text className="text-gray-600 mb-6 leading-6">
          Payments for courses and subscriptions are final. Refund requests are subject to our refund policy, which can be found on our website.
        </Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">5. Termination</Text>
        <Text className="text-gray-600 mb-20 leading-6">
          We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the platform.
        </Text>
      </ScrollView>
    </View>
  );
}
