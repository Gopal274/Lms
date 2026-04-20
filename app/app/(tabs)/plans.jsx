import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, refreshUser } = useAuth();
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data } = await api.get("subscription/get-active-plans");
      if (data.success) {
        setPlans(data.plans);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (plan) => {
    setPurchasing(true);
    try {
      // In a real app, you'd trigger Razorpay/Stripe here
      // For now, we'll simulate a successful payment and call the backend
      const { data } = await api.post("subscription/purchase-subscription", {
        planId: plan._id,
        paymentInfo: { method: "simulated", date: new Date() }
      });

      if (data.success) {
        Alert.alert("Success", `You are now a ${plan.tier} member!`);
        await refreshUser();
      }
    } catch (e) {
      Alert.alert("Error", e.response?.data?.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#1e3a8a" /></View>;

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="mb-6">
        <Text className="text-2xl font-black text-gray-900">Choose Your Plan</Text>
        <Text className="text-gray-500">Unlock premium features and structured learning</Text>
      </View>

      {user?.subscription?.planTier && (
          <View className="bg-blue-900 p-6 rounded-3xl mb-8 shadow-lg">
              <Text className="text-white/60 font-bold uppercase text-[10px]">Your Current Plan</Text>
              <Text className="text-white text-2xl font-black uppercase">{user.subscription.planTier}</Text>
              <Text className="text-white/80 mt-2">Expires: {new Date(user.subscription.expiryDate).toLocaleDateString()}</Text>
          </View>
      )}

      {plans.map((plan) => (
        <View key={plan._id} className="bg-white p-6 rounded-[40px] mb-6 border border-gray-100 shadow-sm overflow-hidden relative">
          {plan.tier === 'pro' && (
              <View className="absolute top-0 right-0 bg-orange-500 px-4 py-1 rounded-bl-2xl">
                  <Text className="text-white text-[10px] font-black uppercase">Most Popular</Text>
              </View>
          )}

          <Text className="text-gray-400 font-bold uppercase text-xs mb-1">{plan.tier} Access</Text>
          <Text className="text-2xl font-black text-gray-900 mb-2">{plan.name}</Text>
          <Text className="text-gray-500 mb-4">{plan.description}</Text>
          
          <View className="flex-row items-baseline mb-6">
            <Text className="text-4xl font-black text-blue-900">₹{plan.price}</Text>
            <Text className="text-gray-400 font-bold ml-1">/ {plan.durationInMonths} Months</Text>
          </View>

          <View className="space-y-3 mb-8">
            {plan.features.map((feature, i) => (
              <View key={i} className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className="text-gray-700 ml-3 font-medium">{feature}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            disabled={purchasing || user?.subscription?.planTier === plan.tier}
            onPress={() => handlePurchase(plan)}
            className={`p-5 rounded-3xl items-center ${user?.subscription?.planTier === plan.tier ? 'bg-gray-100' : 'bg-blue-900 shadow-lg shadow-blue-200'}`}
          >
            {purchasing ? <ActivityIndicator color="white" /> : (
                <Text className={`font-black uppercase tracking-widest ${user?.subscription?.planTier === plan.tier ? 'text-gray-400' : 'text-white'}`}>
                    {user?.subscription?.planTier === plan.tier ? "Current Plan" : "Get Started"}
                </Text>
            )}
          </TouchableOpacity>
        </View>
      ))}

      <View className="h-20" />
    </ScrollView>
  );
}
