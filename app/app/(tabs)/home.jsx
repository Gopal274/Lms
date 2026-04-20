import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import { 
  Ionicons, 
  FontAwesome5, 
  MaterialCommunityIcons, 
  Feather,
  MaterialIcons
} from "@expo/vector-icons";
import { 
  Search, 
  Wallet, 
  Bell, 
  Flame, 
  Zap, 
  BookOpen, 
  Play, 
  Download, 
  HelpCircle, 
  Library, 
  Layout,
  MessageSquare,
  Trophy,
  ChevronRight
} from "lucide-react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Mock Data
const FILTERS = ["All", "Physics", "Chemistry", "Mathematics", "Biology", "English"];

const LIVE_CLASSES = [
  { id: "1", title: "Ray Optics", teacher: "MR Sir", startTime: "10:45 AM", avatar: "https://picsum.photos/seed/t1/100/100" },
  { id: "2", title: "Organic Chemistry", teacher: "Archana Ma'am", startTime: "12:15 PM", avatar: "https://picsum.photos/seed/t2/100/100" },
];

const STUDY_ZONE = [
  { id: "1", label: "My Batches", icon: Layout, color: "#4A4AFF", bg: "#F5F3FF" },
  { id: "2", label: "Test Series", icon: Trophy, color: "#F59E0B", bg: "#FEF3C7" },
  { id: "3", label: "Downloads", icon: Download, color: "#10B981", bg: "#ECFDF5" },
  { id: "4", label: "Doubt Room", icon: MessageSquare, color: "#EF4444", bg: "#FEF2F2" },
  { id: "5", label: "Library", icon: Library, color: "#8B5CF6", bg: "#F5F3FF" },
  { id: "6", label: "Free Content", icon: Zap, color: "#3B82F6", bg: "#EFF6FF" },
];

const RECOMMENDED_BATCHES = [
  { id: "1", title: "Arjuna NEET 2026", price: "5000", originalPrice: "12000", discount: "58% OFF", thumbnail: "https://picsum.photos/seed/neet/400/200" },
  { id: "2", title: "Lakshya JEE 2026", price: "4500", originalPrice: "10000", discount: "55% OFF", thumbnail: "https://picsum.photos/seed/jee/400/200" },
];

const COMMUNITY_POSTS = [
  { id: "1", title: "AIR 1 Strategy", type: "Video", bg: "#FCD34D" },
  { id: "2", title: "Physics Hack", type: "Quote", bg: "#6EE7B7" },
  { id: "3", title: "Exam Tips", type: "Article", bg: "#93C5FD" },
];

const GradientCard = ({ children, colors, height = 180 }) => (
  <View style={{ height, width: '100%', borderRadius: 24, overflow: 'hidden' }}>
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={colors[0]} />
          <Stop offset="100%" stopColor={colors[1]} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
    {children}
  </View>
);

export default function StudyTab() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [pulseAnim] = useState(new Animated.Value(1));
  const router = useRouter();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const SectionHeader = ({ title, showLivePulse = false, onActionPress, actionLabel = "View all" }) => (
    <View className="flex-row items-center justify-between px-4 mt-8 mb-4">
      <View className="flex-row items-center">
        <Text className="text-xl font-black text-slate-800 tracking-tight">{title}</Text>
        {showLivePulse && (
          <View className="flex-row items-center ml-2 bg-red-100 px-2 py-0.5 rounded-full">
            <Animated.View 
              style={{ transform: [{ scale: pulseAnim }] }} 
              className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5" 
            />
            <Text className="text-[10px] font-black text-red-600">LIVE</Text>
          </View>
        )}
      </View>
      {onActionPress && (
        <TouchableOpacity onPress={onActionPress}>
          <Text className="text-sm font-bold text-[#4A4AFF]">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center justify-between bg-white border-b border-slate-50">
        <View className="flex-row items-center">
          <TouchableOpacity className="border-2 border-[#4A4AFF] rounded-full p-0.5">
            <Image 
              source={{ uri: "https://picsum.photos/seed/user/100/100" }} 
              className="w-10 h-10 rounded-full" 
            />
          </TouchableOpacity>
          <View className="ml-3">
            <Text className="text-xs text-slate-400 font-bold">Hi, Rahul! 👋</Text>
            <View className="flex-row items-center mt-0.5">
              <Flame size={14} color="#FF6B35" fill="#FF6B35" />
              <Text className="text-sm font-black text-slate-800 ml-1">240 <Text className="text-slate-400 font-bold">XP</Text></Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity><Search size={22} color="#64748b" /></TouchableOpacity>
          <TouchableOpacity><Wallet size={22} color="#64748b" /></TouchableOpacity>
          <View className="relative">
            <TouchableOpacity><Bell size={22} color="#64748b" /></TouchableOpacity>
            <View className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Quick Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="pl-4 py-4"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity 
              key={f}
              onPress={() => setActiveFilter(f)}
              className={`px-6 py-2 rounded-full mr-2 border ${
                activeFilter === f ? "bg-slate-900 border-slate-900" : "bg-white border-slate-200"
              }`}
            >
              <Text className={`text-xs font-bold ${activeFilter === f ? "text-white" : "text-slate-500"}`}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 1. Hero Course Card */}
        <View className="px-4 mb-2">
          <GradientCard colors={["#5B4FCF", "#3B82F6"]}>
            <View className="flex-1 p-6 flex-row">
              <View className="flex-1 justify-between">
                <View>
                  <View className="bg-white/20 self-start px-2 py-1 rounded-lg mb-2">
                    <Text className="text-white text-[10px] font-black uppercase tracking-widest">Ongoing</Text>
                  </View>
                  <Text className="text-white text-2xl font-black leading-tight">Arjuna NEET 2024</Text>
                  <Text className="text-white/70 text-sm mt-1 font-bold">Today's Target: 2 Lectures, 1 Test</Text>
                </View>
                <TouchableOpacity className="bg-white px-6 py-3 rounded-2xl self-start flex-row items-center">
                  <Play size={16} color="#5B4FCF" fill="#5B4FCF" className="mr-2" />
                  <Text className="text-[#5B4FCF] font-black text-sm">Resume Learning</Text>
                </TouchableOpacity>
              </View>
              <View className="w-24 items-center justify-center">
                <Image 
                  source={{ uri: "https://via.placeholder.com/150x200" }} 
                  className="w-24 h-32 opacity-80"
                  resizeMode="contain"
                />
              </View>
            </View>
          </GradientCard>
        </View>

        {/* 2. Upcoming Live Classes */}
        <SectionHeader title="Live Classes" showLivePulse={true} onActionPress={() => {}} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
          {LIVE_CLASSES.map((lc) => (
            <View key={lc.id} className="mr-4 w-72 bg-white border border-slate-100 rounded-[28px] p-4 flex-row items-center shadow-sm">
              <View className="relative">
                <Image source={{ uri: lc.avatar }} className="w-14 h-14 rounded-2xl" />
                <View className="absolute -bottom-1 -right-1 bg-[#EEF0FF] p-1 rounded-lg border-2 border-white">
                  <MaterialIcons name="videocam" size={10} color="#4A4AFF" />
                </View>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-slate-800 font-black text-sm" numberOfLines={1}>{lc.teacher}: {lc.title}</Text>
                <View className="flex-row items-center mt-1">
                  <Feather name="clock" size={12} color="#94a3b8" />
                  <Text className="text-[10px] text-slate-400 font-bold ml-1">Starts in 10:45</Text>
                </View>
              </View>
              <TouchableOpacity className="bg-slate-900 px-4 py-2 rounded-xl ml-2">
                <Text className="text-white font-black text-[10px]">Join</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* 3. My Study Zone (Grid) */}
        <SectionHeader title="My Study Zone" />
        <View className="px-4 flex-row flex-wrap justify-between">
          {STUDY_ZONE.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              className="w-[31%] mb-4 items-center"
            >
              <View 
                style={{ backgroundColor: item.bg }} 
                className="w-full aspect-square rounded-[24px] items-center justify-center mb-2"
              >
                <item.icon size={26} color={item.color} />
              </View>
              <Text className="text-[10px] font-black text-slate-700 text-center">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Daily Streak & Rewards */}
        <View className="px-4 mt-6">
          <View className="bg-[#1e293b] rounded-[32px] p-6 flex-row items-center">
            <View className="flex-1">
              <Text className="text-white/60 text-[10px] font-black uppercase tracking-widest">Daily Progress</Text>
              <Text className="text-white text-lg font-black mt-1">You're on a 5-day streak! 🔥</Text>
              <View className="flex-row items-center mt-4">
                {[1, 1, 1, 1, 1, 0, 0].map((s, i) => (
                  <View 
                    key={i} 
                    className={`w-7 h-7 rounded-lg items-center justify-center mr-1.5 ${
                      s ? "bg-orange-500" : "bg-white/10"
                    }`}
                  >
                    <Text className={`text-[10px] font-black ${s ? "text-white" : "text-white/30"}`}>M T W T F S S"[i]</Text>
                  </View>
                ))}
              </View>
            </View>
            <View className="items-center justify-center ml-4">
               <View className="w-16 h-16 rounded-full border-4 border-white/10 items-center justify-center relative">
                  <Trophy size={28} color="#F59E0B" />
                  <View className="absolute -bottom-1 bg-orange-500 px-2 rounded-full">
                    <Text className="text-[8px] font-black text-white">LVL 4</Text>
                  </View>
               </View>
            </View>
          </View>
        </View>

        {/* 5. Recommended Batches */}
        <SectionHeader title="Recommended for You" onActionPress={() => {}} />
        {RECOMMENDED_BATCHES.map((batch) => (
          <TouchableOpacity 
            key={batch.id} 
            onPress={() => router.push(`/batch/${batch.id}`)}
            className="mx-4 mb-6 bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm"
          >
            <Image source={{ uri: batch.thumbnail }} className="h-44 w-full" />
            <View className="p-5">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-lg font-black text-slate-800">{batch.title}</Text>
                <View className="bg-green-100 px-2 py-1 rounded-lg">
                  <Text className="text-[10px] font-black text-green-600">{batch.discount}</Text>
                </View>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-xl font-black text-slate-900">₹{batch.price}</Text>
                  <Text className="text-sm text-slate-400 line-through ml-2">₹{batch.originalPrice}</Text>
                </View>
                <TouchableOpacity className="bg-[#4A4AFF] px-6 py-2.5 rounded-2xl">
                  <Text className="text-white font-black text-xs">Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* 6. Community Highlights */}
        <SectionHeader title="PW Community" onActionPress={() => {}} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 mb-10">
          {COMMUNITY_POSTS.map((post) => (
            <TouchableOpacity 
              key={post.id} 
              style={{ backgroundColor: post.bg }}
              className="w-40 h-64 rounded-[32px] mr-4 p-5 justify-between relative overflow-hidden"
            >
              <View className="bg-black/10 self-start px-2 py-1 rounded-lg">
                <Text className="text-black/50 text-[10px] font-black uppercase">{post.type}</Text>
              </View>
              <View>
                <Text className="text-black font-black text-lg leading-tight">{post.title}</Text>
                <View className="flex-row items-center mt-3">
                  <View className="bg-black/10 rounded-full p-1.5">
                    <Play size={12} color="black" fill="black" />
                  </View>
                  <Text className="text-black/50 text-[10px] font-black ml-2">WATCH</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Floating Doubt Bot */}
      <TouchableOpacity 
        className="absolute bottom-28 right-6 bg-slate-900 w-14 h-14 rounded-[20px] items-center justify-center shadow-xl shadow-slate-400"
        style={{ elevation: 8 }}
      >
        <HelpCircle size={28} color="white" />
        <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
