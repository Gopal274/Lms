import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Modal } from "react-native";
import api from "../../utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

// Safe Razorpay Import for Expo Go
let RazorpayCheckout = null;
try {
    RazorpayCheckout = require('react-native-razorpay').default;
} catch (e) {
    console.warn("Razorpay native module not found. Payments will not work in Expo Go.");
}

import { useStripe } from "@stripe/stripe-react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const { data } = await api.get(`/get-course/${id}`);
      if (data.success) {
        setCourse(data.course);
      }
    } catch (e) {
      alert("Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollFree = async () => {
    try {
        const { data } = await api.post(`/create-order`, {
            courseId: id,
            payment_info: { type: "free", status: "success" }
        });
        if (data.success) {
            alert("Enrolled successfully!");
            await refreshUser();
            router.push("/(tabs)/history");
        }
    } catch (error) {
        alert("Free enrollment failed");
    }
  };

  const handleRazorpayEnroll = async () => {
    setShowPaymentModal(false);
    if (!RazorpayCheckout) {
        alert("Razorpay is not available in Expo Go. Please use a development build.");
        return;
    }
    try {
      const { data: keyData } = await api.get("/razorpay-key");
      const { data: orderData } = await api.post("/payment", {
        amount: course.price
      });

      if (!orderData.success) {
        alert("Failed to create payment order");
        return;
      }

      const options = {
        description: `Purchase ${course.name}`,
        image: course.thumbnail?.url || "https://via.placeholder.com/100",
        currency: "INR",
        key: keyData.publishableKey,
        amount: orderData.order.amount,
        name: "LMS Academy",
        order_id: orderData.order.id,
        prefill: {
          email: user.email,
          contact: "",
          name: user.name
        },
        theme: { color: "#1e3a8a" }
      };

      RazorpayCheckout.open(options).then(async (data) => {
        try {
          const { data: verifyData } = await api.post("/payment-verification", {
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            courseId: id
          });

          if (verifyData.success) {
            alert("Payment successful!");
            await refreshUser();
            router.push("/(tabs)/history");
          }
        } catch (error) {
          alert("Payment verification failed");
        }
      }).catch((error) => {
        alert(`Error: ${error.description}`);
      });
    } catch (e) {
      alert(e.response?.data?.message || "Razorpay failed");
    }
  };

  const handleStripeEnroll = async () => {
    setShowPaymentModal(false);
    try {
      // 1. Create Payment Intent
      const { data } = await api.post("/payment-stripe", {
        amount: course.price
      });

      if (!data.success) {
        alert("Failed to initialize Stripe payment");
        return;
      }

      const { client_secret } = data;

      // 2. Initialize Payment Sheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: 'LMS Academy',
        defaultBillingDetails: {
            name: user.name,
            email: user.email
        }
      });

      if (initError) {
        alert(`Stripe Error: ${initError.message}`);
        return;
      }

      // 3. Present Payment Sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code !== 'Canceled') {
            alert(`Stripe Error: ${presentError.message}`);
        }
        return;
      }

      // 4. Create Order on Backend
      const { data: orderData } = await api.post("/create-order", {
        courseId: id,
        payment_info: { type: "stripe", status: "success" },
        payment_type: "stripe"
      });

      if (orderData.success) {
        alert("Stripe payment successful!");
        await refreshUser();
        router.push("/(tabs)/history");
      }
    } catch (e) {
      alert(e.response?.data?.message || "Stripe payment failed");
    }
  };

  if (loading) return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#1e3a8a" /></View>;
  if (!course) return <Text className="text-center mt-10">Course not found</Text>;

  const hasAccess = user?.subscription?.planTier === "basic" || 
                    user?.subscription?.planTier === "pro" || 
                    user?.courses?.some((c) => c.courseId === id);

  return (
    <ScrollView className="flex-1 bg-white">
      <Image 
        source={{ uri: course.thumbnail?.url || "https://via.placeholder.com/600x300" }} 
        className="w-full h-64 bg-gray-200" 
      />
      
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800">{course.name}</Text>
        <Text className="text-blue-900 font-bold text-lg mb-2">{course.level}</Text>
        <Text className="text-gray-500 mb-4">{course.purchased} Students Enrolled</Text>
        
        <Text className="text-gray-600 leading-6 mb-6">{course.description}</Text>

        <View className="flex-row items-center mb-8">
          <View className="mr-4">
            <Text className="text-3xl font-bold text-blue-900">
              {course.price === 0 ? "FREE" : `$${course.price}`}
            </Text>
            {course.estimatedPrice && (
              <Text className="text-gray-400 line-through text-lg">
                ${course.estimatedPrice}
              </Text>
            )}
          </View>
          
          {!hasAccess ? (
            <TouchableOpacity 
              onPress={() => course.price === 0 ? handleEnrollFree() : setShowPaymentModal(true)}
              className="flex-1 bg-blue-900 p-4 rounded-2xl items-center shadow-lg"
            >
              <Text className="text-white font-bold text-lg">Buy Now</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={() => router.push(`/lesson/${id}`)}
              className="flex-1 bg-green-600 p-4 rounded-2xl items-center shadow-lg"
            >
              <Text className="text-white font-bold text-lg">Watch Now</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Payment Selection Modal */}
        <Modal
          visible={showPaymentModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl">
              <View className="w-12 h-1 bg-gray-200 rounded-full self-center mb-6" />
              <Text className="text-2xl font-black text-gray-900 mb-2">Choose Payment Method</Text>
              <Text className="text-gray-500 mb-8 font-medium">Safe and secure transactions</Text>
              
              <TouchableOpacity 
                onPress={handleRazorpayEnroll}
                className="flex-row items-center p-5 bg-blue-50 rounded-3xl mb-4 border border-blue-100"
              >
                <View className="w-12 h-12 bg-blue-100 rounded-2xl items-center justify-center mr-4">
                    <Ionicons name="card" size={24} color="#1e3a8a" />
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-bold text-blue-900">Razorpay</Text>
                    <Text className="text-blue-700/60 text-xs">UPI, Cards, Netbanking</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#1e3a8a" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleStripeEnroll}
                className="flex-row items-center p-5 bg-purple-50 rounded-3xl border border-purple-100"
              >
                <View className="w-12 h-12 bg-purple-100 rounded-2xl items-center justify-center mr-4">
                    <Ionicons name="globe" size={24} color="#6b21a8" />
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-bold text-purple-900">Stripe</Text>
                    <Text className="text-purple-700/60 text-xs">International Cards, GPay, Apple Pay</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b21a8" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setShowPaymentModal(false)}
                className="mt-8 p-4 items-center"
              >
                <Text className="text-gray-400 font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View className="mb-6">
            <Text className="text-2xl font-bold mb-4">Course Benefits</Text>
            {course.benefits?.map((b, i) => (
                <Text key={i} className="text-gray-700 mb-2">✅ {b.title}</Text>
            ))}
        </View>

        <Text className="text-2xl font-bold mb-4">Lessons ({course.courseData?.length || 0})</Text>
        {course.courseData?.map((item, index) => (
          <TouchableOpacity 
            key={item._id || index}
            onPress={() => hasAccess ? router.push(`/lesson/${id}`) : alert("Purchase course to watch")}
            className="flex-row items-center p-4 bg-gray-50 rounded-2xl mb-3 border border-gray-100"
          >
            <View className="bg-blue-900 w-8 h-8 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold">{index + 1}</Text>
            </View>
            <View className="flex-1">
                <Text className="text-lg font-medium text-gray-800">{item.title}</Text>
                <Text className="text-gray-500 text-sm">{item.videoSection}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
