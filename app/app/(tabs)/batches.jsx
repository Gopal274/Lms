import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5, MaterialIcons, Feather } from "@expo/vector-icons";
import { Video, Sparkles, Youtube, Instagram, Book, Award, MapPin, ShoppingBag } from "lucide-react-native";
import SquareIconCard from "../../components/batches/SquareIconCard";

// Mock Data
const OTHER_BATCHES = [
  { id: "1", label: "Earners - Mobile Courses" },
  { id: "2", label: "Dropper NEET" },
  { id: "3", label: "Class 11 JEE" },
];

const EARNERS_DATA = [
  { id: "1", label: "Video Editing", icon: Video, iconColor: "#FF6B35", bgColor: "#FFF4F0" },
  { id: "2", label: "AI & ChatGPT", icon: Sparkles, iconColor: "#4A4AFF", bgColor: "#EEF0FF" },
  { id: "3", label: "Youtube Creator", icon: Youtube, iconColor: "#FF0000", bgColor: "#FFF0F0" },
  { id: "4", label: "Instagram & Social", icon: Instagram, iconColor: "#E1306C", bgColor: "#FFF0F5" },
];

const POPULAR_COURSES = [
  {
    id: "1",
    title: "Arjuna NEET 2026",
    category: "Class 12 NEET",
    language: "HINGLISH",
    examTarget: "NEET 2026",
    startDate: "15th April, 2025",
    price: "5000",
    originalPrice: "12000",
    discount: "58% OFF",
    thumbnail: "https://picsum.photos/seed/neet/400/200",
  },
  {
    id: "2",
    title: "Lakshya JEE 2026",
    category: "Class 12 JEE",
    language: "HINGLISH",
    examTarget: "JEE 2026",
    startDate: "20th April, 2025",
    price: "4500",
    originalPrice: "10000",
    discount: "55% OFF",
    thumbnail: "https://picsum.photos/seed/jee/400/200",
  },
];

const PROMO_CARDS = [
  {
    id: "1",
    title: "NEET Rank Predictor",
    description: "Predict your rank based on marks",
    stats: "TOTAL TESTS: 21",
    bgColor: "#FEF9C3", // Yellow
    illustration: "https://picsum.photos/seed/promo1/100/100",
  },
  {
    id: "2",
    title: "JEE Main 2025",
    description: "Full length mock tests",
    stats: "TOTAL TESTS: 15",
    bgColor: "#ECFDF5", // Greenish/Cream
    illustration: "https://picsum.photos/seed/promo2/100/100",
  },
];

const EXPLORE_PW_DATA = [
  { id: "1", label: "Modules & Books", icon: Book, iconColor: "#4A4AFF", bgColor: "#EEF0FF" },
  { id: "2", label: "Test Series", icon: Award, iconColor: "#FF6B35", bgColor: "#FFF4F0" },
  { id: "3", label: "Offline Centres", icon: MapPin, iconColor: "#10B981", bgColor: "#ECFDF5" },
  { id: "4", label: "PW Pi", icon: ShoppingBag, iconColor: "#8B5CF6", bgColor: "#F5F3FF" },
];

const FILTER_PILLS = ["All Filters ⚙", "Online", "Offline", "Power Batch", "State Board"];

export default function BatchesTab() {
  const [selectedBatch, setSelectedBatch] = useState("1");
  const router = useRouter();

  const SectionHeader = ({ title, subtitle }) => (
    <View className="mb-4 mt-6 px-4">
      <Text className="text-lg font-extrabold text-slate-800">{title}</Text>
      {subtitle && <Text className="text-sm text-slate-500 mt-1">{subtitle}</Text>}
    </View>
  );

  const CourseCard = ({ course }) => (
    <View className="mx-4 mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ elevation: 2 }}>
      <TouchableOpacity 
        onPress={() => router.push(`/batch/${course.id}`)}
        activeOpacity={0.9}
      >
        <Image source={{ uri: course.thumbnail }} className="h-44 w-full" resizeMode="cover" />
      </TouchableOpacity>
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className="bg-orange-100 px-2 py-0.5 rounded">
            <Text className="text-[10px] font-bold text-orange-600 uppercase">{course.category}</Text>
          </View>
          <View className="border border-slate-300 px-2 py-0.5 rounded">
            <Text className="text-[10px] font-bold text-slate-600">{course.language}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push(`/batch/${course.id}`)}>
          <Text className="text-lg font-bold text-slate-800 leading-6 mb-2" numberOfLines={2}>
            {course.title}
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center mb-1">
          <Ionicons name="book-outline" size={14} color="#64748b" />
          <Text className="text-xs text-slate-500 ml-1">{course.examTarget}</Text>
        </View>
        <View className="flex-row items-center mb-4">
          <Ionicons name="calendar-outline" size={14} color="#64748b" />
          <Text className="text-xs text-slate-500 ml-1">{course.startDate}</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View>
            <View className="flex-row items-center">
              <Text className="text-xl font-black text-slate-900">₹{course.price}</Text>
              {course.originalPrice && (
                <Text className="text-sm text-slate-400 line-through ml-2">₹{course.originalPrice}</Text>
              )}
            </View>
            <Text className="text-[10px] text-slate-400">For Registration</Text>
            {course.discount && (
              <View className="bg-green-100 px-1.5 py-0.5 rounded mt-1 self-start">
                <Text className="text-[10px] font-bold text-green-600">{course.discount}</Text>
              </View>
            )}
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity 
              onPress={() => router.push(`/batch/${course.id}`)}
              className="bg-slate-900 px-6 py-2.5 rounded-lg"
            >
              <Text className="text-white font-bold text-sm">
                {course.discount ? "Buy Now" : "Explore"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push(`/batch/${course.id}`)}
              className="border border-slate-300 w-10 h-10 items-center justify-center rounded-lg"
            >
              <Ionicons name="chevron-forward" size={20} color="#334155" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Persistent Header */}
      <View className="bg-white pt-2">
        <View className="flex-row items-center px-4 mb-3">
          <TouchableOpacity className="mr-3">
            <Ionicons name="menu-outline" size={30} color="#1e293b" />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
            <Ionicons name="search-outline" size={20} color="#64748b" className="mr-2" />
            <TextInput
              placeholder="Search for board"
              placeholderTextColor="#94a3b8"
              className="flex-1 text-sm font-medium"
            />
          </View>
        </View>

        {/* Purple Banner */}
        <View className="bg-[#EEF0FF] mx-4 rounded-xl px-4 py-3 flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="bg-white p-2 rounded-full mr-3">
              <Ionicons name="people" size={20} color="#4A4AFF" />
            </View>
            <Text className="text-base font-bold text-slate-800">12th - NEET</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm font-bold text-[#4A4AFF]">Change</Text>
          </TouchableOpacity>
        </View>

        {/* Other Batches Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-4 mb-4"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className="flex-row items-center py-1">
            <Text className="text-[10px] font-black text-slate-400 mr-3 tracking-wider">VIEW OTHER BATCHES</Text>
            {OTHER_BATCHES.map((batch) => (
              <TouchableOpacity
                key={batch.id}
                onPress={() => setSelectedBatch(batch.id)}
                className={`flex-row items-center px-4 py-2 rounded-full border mr-2 ${
                  selectedBatch === batch.id ? "bg-[#EEF0FF] border-[#4A4AFF]" : "bg-white border-slate-200"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    selectedBatch === batch.id ? "text-[#4A4AFF]" : "text-slate-600"
                  }`}
                >
                  {batch.label}
                </Text>
                {selectedBatch === batch.id && (
                  <Ionicons name="close-outline" size={16} color="#4A4AFF" className="ml-1" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* 1. Earners Section */}
        <SectionHeader title="Earners : Learn a skill and start earning early" />
        <FlatList
          data={EARNERS_DATA}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 4 }}
          renderItem={({ item }) => (
            <SquareIconCard
              label={item.label}
              icon={item.icon}
              iconColor={item.iconColor}
              bgColor={item.bgColor}
            />
          )}
        />

        {/* 2. Popular Courses */}
        <SectionHeader title="Popular Courses" />
        {POPULAR_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        {/* 3. View All Batches Button */}
        <View className="px-4 mb-6">
          <TouchableOpacity className="border border-[#4A4AFF] rounded-xl py-4 items-center justify-center">
            <Text className="text-[#4A4AFF] font-bold text-base">View All Batches</Text>
          </TouchableOpacity>
        </View>

        {/* 4. What's New Section */}
        <SectionHeader title="What's New" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-4 mb-6"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {PROMO_CARDS.map((promo) => (
            <View
              key={promo.id}
              className="w-80 p-5 rounded-3xl mr-4 flex-row"
              style={{ backgroundColor: promo.bgColor }}
            >
              <View className="flex-1 justify-between">
                <View>
                  <Text className="text-green-700 font-black text-lg mb-1 leading-tight">{promo.title}</Text>
                  <Text className="text-slate-600 text-xs mb-2 leading-4">{promo.description}</Text>
                  <Text className="text-slate-500 font-bold text-[10px] tracking-widest">{promo.stats}</Text>
                </View>
                <TouchableOpacity className="bg-slate-900 self-start px-4 py-2 rounded-full mt-4">
                  <Text className="text-white text-xs font-bold">Explore Now</Text>
                </TouchableOpacity>
              </View>
              <View className="w-24 items-center justify-center">
                <Image source={{ uri: promo.illustration }} className="w-20 h-20" resizeMode="contain" />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* 5. Explore PW Section */}
        <SectionHeader title="Explore PW" />
        <FlatList
          data={EXPLORE_PW_DATA}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 4 }}
          renderItem={({ item }) => (
            <SquareIconCard
              label={item.label}
              icon={item.icon}
              iconColor={item.iconColor}
              bgColor={item.bgColor}
            />
          )}
        />

        {/* 6. All Courses Section */}
        <SectionHeader title="All Courses" subtitle="49 courses available" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-4 mb-6"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className="flex-row items-center">
            {FILTER_PILLS.map((filter, index) => (
              <TouchableOpacity
                key={index}
                className="px-4 py-2 rounded-full border border-slate-200 mr-2 bg-white"
              >
                <Text className="text-xs font-bold text-slate-600">{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {POPULAR_COURSES.map((course) => (
          <CourseCard key={`all-${course.id}`} course={course} />
        ))}

        {/* Extra padding for bottom tab bar */}
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}
