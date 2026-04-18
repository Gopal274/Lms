import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Modal } from "react-native";
import api from "../../utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import RazorpayCheckout from "react-native-razorpay";
import { useStripe } from "@stripe/stripe-react-native";

export default function BatchDetail() {
  const { id } = useLocalSearchParams();
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    fetchBatch();
  }, [id]);

  const fetchBatch = async () => {
    try {
      const { data } = await api.get(`/get-batch/${id}`);
      if (data.success) {
        setBatch(data.batch);
      }
    } catch (e) {
      alert("Failed to fetch batch details");
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollFree = async () => {
    try {
        const { data } = await api.post(`/create-order`, {
            batchId: id,
            payment_info: { type: "free", status: "success" }
        });
        if (data.success) {
            alert("Joined batch successfully!");
            await refreshUser();
            router.push("/(tab)/resources");
        }
    } catch (error) {
        alert("Free enrollment failed");
    }
  };

  const handleRazorpayEnroll = async () => {
    setShowPaymentModal(false);
    try {
        const { data: keyData } = await api.get("/razorpay-key");
        const { data: orderData } = await api.post("/payment", {
            amount: batch.price
        });

        if (!orderData.success) {
            alert("Failed to create payment order");
            return;
        }

        const options = {
            description: `Join ${batch.name} Batch`,
            image: batch.thumbnail?.url || "https://via.placeholder.com/100",
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
                    batchId: id
                });

                if (verifyData.success) {
                    alert("Payment successful!");
                    await refreshUser();
                    router.push("/(tab)/resources");
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
      const { data } = await api.post("/payment-stripe", {
        amount: batch.price
      });

      if (!data.success) {
        alert("Failed to initialize Stripe payment");
        return;
      }

      const { client_secret } = data;

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

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        if (presentError.code !== 'Canceled') {
            alert(`Stripe Error: ${presentError.message}`);
        }
        return;
      }

      const { data: orderData } = await api.post("/create-order", {
        batchId: id,
        payment_info: { type: "stripe", status: "success" },
        payment_type: "stripe"
      });

      if (orderData.success) {
        alert("Stripe payment successful!");
        await refreshUser();
        router.push("/(tab)/resources");
      }
    } catch (e) {
      alert(e.response?.data?.message || "Stripe payment failed");
    }
  };

  if (loading) return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#1e3a8a" /></View>;
  if (!batch) return <Text className="text-center mt-10 text-gray-500">Batch not found</Text>;

  const isJoined = user?.batches?.includes(id);

  return (
    <ScrollView className="flex-1 bg-white">
      <Image 
        source={{ uri: batch.thumbnail?.url || "https://via.placeholder.com/600x300" }} 
        className="w-full h-64 bg-gray-200" 
      />
      
      <View className="p-6">
        <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 mr-4">
                <Text className="text-3xl font-bold text-gray-800">{batch.name}</Text>
                <View className="flex-row items-center mt-2">
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text className="text-gray-500 ml-1">Duration: {batch.duration}</Text>
                </View>
            </View>
            <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-900 font-bold">{batch.purchased || 0} Joined</Text>
            </View>
        </View>
        
        <Text className="text-gray-600 leading-6 mb-8 text-lg">{batch.description}</Text>

        <View className="flex-row items-center mb-8 bg-gray-50 p-4 rounded-3xl">
          <View className="mr-6">
            <Text className="text-gray-500 text-sm">Batch Price</Text>
            <Text className="text-3xl font-bold text-blue-900">
              {batch.price === 0 ? "FREE" : `$${batch.price}`}
            </Text>
          </View>
          
          {!isJoined ? (
            <TouchableOpacity 
              onPress={() => batch.price === 0 ? handleEnrollFree() : setShowPaymentModal(true)}
              className="flex-1 bg-blue-900 p-4 rounded-2xl items-center shadow-lg"
            >
              <Text className="text-white font-bold text-lg">Join Batch</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              disabled
              className="flex-1 bg-green-600 p-4 rounded-2xl items-center shadow-lg opacity-80"
            >
              <Text className="text-white font-bold text-lg">Already Joined</Text>
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

        <Text className="text-2xl font-bold mb-6">Subjects & Teachers</Text>
        {batch.subjects?.map((item, index) => (
          <View 
            key={item._id || index}
            className="flex-row items-center p-4 bg-white rounded-2xl mb-4 border border-gray-100 shadow-sm"
          >
            <View className="bg-blue-900 w-12 h-12 rounded-2xl items-center justify-center mr-4">
                <Ionicons name="book" size={24} color="white" />
            </View>
            <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
                <Text className="text-gray-500 font-medium">Teacher ID: {item.teacherId}</Text>
            </View>
          </View>
        ))}

        {isJoined && (
            <TouchableOpacity 
                onPress={() => router.push("/(tab)/resources")}
                className="mt-6 bg-gray-100 p-4 rounded-2xl flex-row justify-center items-center"
            >
                <Text className="text-blue-900 font-bold mr-2 text-lg">Go to Batch Materials</Text>
                <Ionicons name="arrow-forward" size={20} color="#1e3a8a" />
            </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
