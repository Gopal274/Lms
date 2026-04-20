import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="pt-16 px-6 pb-6 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1e3a8a" />
        </TouchableOpacity>
        <Text className="text-2xl font-black text-blue-900">Privacy Policy</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <Text className="text-gray-500 mb-6 font-medium">Last Updated: April 18, 2026</Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">1. Information We Collect</Text>
        <Text className="text-gray-600 mb-6 leading-6">
          We collect information that you provide directly to us, such as when you create an account, enroll in courses, or communicate with us. This may include your name, email address, phone number, and payment information.
        </Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">2. How We Use Your Information</Text>
        <Text className="text-gray-600 mb-6 leading-6">
          We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with you about your account and our educational content.
        </Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">3. Device Management</Text>
        <Text className="text-gray-600 mb-6 leading-6">
          To prevent unauthorized account sharing and protect our content, we collect unique device identifiers and limit account access to a maximum of two (2) devices concurrently.
        </Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">4. Data Security</Text>
        <Text className="text-gray-600 mb-6 leading-6">
          We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
        </Text>

        <Text className="text-lg font-bold text-gray-900 mb-2">5. Your Rights</Text>
        <Text className="text-gray-600 mb-20 leading-6">
          You have the right to access, correct, or delete your personal data. You can manage most of your information through your profile settings or by contacting our support team.
        </Text>
      </ScrollView>
    </View>
  );
}
