import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import { 
  Shield, 
  Bell, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Calendar, 
  GraduationCap, 
  Play, 
  CheckCircle2, 
  Circle,
  Info,
  X,
  Check,
  MessageCircle,
} from "lucide-react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  interpolate, 
  measure, 
  useDerivedValue,
  runOnUI
} from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");

// Constants
const PURPLE = "#5B4FCF";
const GREEN = "#22C55E";
const RED = "#EF4444";
const GOLD = "#D4A017";
const DARK_BG = "#1a1a1a";

// Mock Data
const PLANS = [
  { 
    id: "batch", 
    label: "Batch", 
    price: "4999", 
    oldPrice: "6000", 
    discount: "17% OFF", 
    colors: ["#3B82F6", "#2563EB"], // Blue gradient
    border: "#FFD700" 
  },
  { 
    id: "infinity", 
    label: "Infinity", 
    price: "7999", 
    oldPrice: "12000", 
    discount: "33% OFF", 
    colors: ["#10B981", "#059669"], // Green gradient
    popular: true 
  },
  { 
    id: "pro", 
    label: "Infinity Pro", 
    price: "9999", 
    oldPrice: "18000", 
    discount: "44% OFF", 
    colors: ["#D4A017", "#B45309"] // Golden/Olive gradient
  },
];

const BATCH_INCLUDES = [
  "Live Lectures by 2 Set of Faculties",
  "DPPs Discussion by Batch Faculty",
  "Regular Test RBT & AITS",
  "Live Doubt Resolution",
  "Digital Preparation Kit",
  "Free Access to All Arjuna NEET 2026 Versions",
];

const TEACHERS = [
  { id: "1", name: "Physics by MR Sir", subject: "Physics", exp: "11 Yr", image: "https://picsum.photos/seed/t1/150/150" },
  { id: "2", name: "Botany by Archana Ma'am", subject: "Botany", exp: "9 Yr", image: "https://picsum.photos/seed/t2/150/150" },
  { id: "3", name: "Zoology by Samapti Ma'am", subject: "Zoology", exp: "10 Yr", image: "https://picsum.photos/seed/t3/150/150" },
];

const DEMO_VIDEOS = [
  { id: "1", title: "Basic Mathematics", subtitle: "Lecture 01", teacher: "MR Sir", duration: "02:10:12", date: "15 Apr 2024" },
  { id: "2", title: "Cell Biology", subtitle: "Lecture 01", teacher: "Archana Ma'am", duration: "01:45:30", date: "16 Apr 2024" },
];

const SCHEDULE_ITEMS = [
  { id: "1", label: "Notices", icon: "notifications", color: "#F59E0B" },
  { id: "2", label: "Physics by MR Sir", icon: "book", color: "#EF4444" },
  { id: "3", label: "Physics by Satyam Mudali...", icon: "flash", color: "#3B82F6" },
  { id: "4", label: "Botany Sh...", icon: "leaf", color: "#10B981" },
];

const FAQS = [
  { q: "Why should I join this course? How will it help me?", a: "This course is designed by top faculties to provide comprehensive coverage of the syllabus with regular tests and doubt sessions." },
  { q: "How will the classes be conducted? What if I miss a class?", a: "Classes are conducted live online. Recordings are available immediately after the class if you miss any." },
  { q: "Can I download the classes?", a: "Yes, you can download classes within the app to watch them offline anytime." },
  { q: "How can I resolve my doubts?", a: "We have a dedicated Doubt Room with live doubt resolution by experts." },
  { q: "What is Digital Preparation KIT? How to access its features?", a: "It's a comprehensive set of study materials and tools available in the 'Resources' tab." },
  { q: "What is the refund policy?", a: "Refunds are processed as per our standard policy within 7 days of purchase." },
];

const GradientBackground = ({ colors, style }) => (
  <Svg height="100%" width="100%" style={[StyleSheet.absoluteFill, style]}>
    <Defs>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={colors[0]} />
        <Stop offset="100%" stopColor={colors[1]} />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
  </Svg>
);

const AccordionItem = ({ title, children, isExpanded, onToggle }) => {
  const heightValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: isExpanded ? withTiming(heightValue.value) : withTiming(0),
    opacity: isExpanded ? withTiming(1) : withTiming(0),
    overflow: 'hidden',
  }));

  const onLayout = (event) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0 && heightValue.value !== layoutHeight) {
      heightValue.value = layoutHeight;
    }
  };

  return (
    <View className="mb-4">
      <TouchableOpacity 
        onPress={onToggle}
        className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex-row items-center justify-between"
      >
        <Text className="font-black text-slate-800">{title}</Text>
        {isExpanded ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
      </TouchableOpacity>
      <Animated.View style={animatedStyle}>
        <View onLayout={onLayout} className="p-4 bg-white border-x border-b border-slate-50 rounded-b-2xl">
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const FaqItem = ({ faq, isExpanded, onToggle }) => {
  const heightValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    height: isExpanded ? withTiming(heightValue.value) : withTiming(0),
    opacity: isExpanded ? withTiming(1) : withTiming(0),
    overflow: 'hidden',
  }));

  const onLayout = (event) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0) heightValue.value = layoutHeight;
  };

  return (
    <TouchableOpacity 
      onPress={onToggle}
      activeOpacity={0.9}
      className="bg-[#F8FAFC] rounded-2xl p-5 mb-4 border border-slate-100 shadow-sm"
    >
      <View className="flex-row items-center justify-between">
        <Text className="font-black text-slate-700 flex-1 mr-3 leading-5">{faq.q}</Text>
        <View className="bg-white rounded-full p-1 shadow-sm">
           <ChevronDown size={18} color={isExpanded ? PURPLE : "#94a3b8"} style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }} />
        </View>
      </View>
      <Animated.View style={animatedStyle}>
        <View onLayout={onLayout} className="mt-4 pt-4 border-t border-slate-100">
           <Text className="text-slate-500 text-xs font-bold leading-5">{faq.a}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function BatchDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedPlan, setSelectedPlan] = useState("batch");
  const [isIncludesExpanded, setIsIncludesExpanded] = useState(true);
  const [isOtherDetailsExpanded, setIsOtherDetailsExpanded] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const currentPlan = useMemo(() => PLANS.find(p => p.id === selectedPlan), [selectedPlan]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    ),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Sticky Header */}
      <View className="bg-white border-b border-slate-50 z-20">
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="#1e293b" />
            </TouchableOpacity>
            <Text className="text-lg font-black text-slate-800 flex-1" numberOfLines={1}>Lakshya NEET 2027</Text>
          </View>
          <View className="flex-row items-center">
            <View className="flex-row items-center bg-[#EEF0FF] px-2 py-1 rounded-full mr-3 border border-[#DDD6FE]">
              <Shield size={14} color={PURPLE} fill={PURPLE} />
              <Text className="text-xs font-black text-slate-700 ml-1">0</Text>
            </View>
            <TouchableOpacity className="mr-3">
              <FontAwesome5 name="whatsapp" size={22} color="#22C55E" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Bell size={22} color="#1e293b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row px-4">
          {[
            { id: "Description", label: "Description" },
            { id: "All Classes", label: "All Classes" },
            { id: "Infinite Learning", label: "Infinite Learning ☀️🪙" }
          ].map((tab) => (
            <TouchableOpacity 
              key={tab.id} 
              onPress={() => setActiveTab(tab.id)}
              className="mr-6 py-3 relative"
            >
              <Text className={`text-sm font-black ${activeTab === tab.id ? "text-[#5B4FCF]" : "text-slate-400"}`}>
                {tab.label}
              </Text>
              {activeTab === tab.id && (
                <View className="absolute bottom-0 left-0 right-0 h-1 bg-[#5B4FCF] rounded-t-full" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeTab === "Description" && (
          <View className="pb-32">
            {/* Section A — Choose a Plan */}
            <View className="px-4 mt-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-black text-slate-800">Choose a plan</Text>
                <TouchableOpacity 
                  onPress={handlePresentModalPress}
                >
                  <Text className="text-[#5B4FCF] font-black text-sm">Compare Plan</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between">
                {PLANS.map((plan) => (
                  <TouchableOpacity 
                    key={plan.id}
                    onPress={() => setSelectedPlan(plan.id)}
                    className="w-[31%] items-center"
                  >
                    <View 
                      className="w-full aspect-[4/5] rounded-2xl relative overflow-hidden"
                      style={{ 
                        borderWidth: plan.id === selectedPlan ? 3 : 1,
                        borderColor: plan.id === selectedPlan ? '#FFD700' : '#f1f5f9'
                      }}
                    >
                      <GradientBackground colors={plan.colors} />
                      {plan.popular && (
                        <View className="absolute top-0 left-0 right-0 bg-green-500 py-1 items-center">
                          <Text className="text-[8px] font-black text-white uppercase tracking-widest">Popular</Text>
                        </View>
                      )}
                      <View className="flex-1 items-center justify-center p-2">
                        <Text className="text-white font-black text-sm mt-auto text-center">{plan.label}</Text>
                      </View>
                    </View>
                    <View className="mt-3">
                      {selectedPlan === plan.id ? (
                        <View className="bg-[#EEF0FF] p-0.5 rounded-full border border-[#5B4FCF]">
                          <Check size={16} color="#5B4FCF" strokeWidth={4} />
                        </View>
                      ) : (
                        <View className="w-5 h-5 rounded-full border-2 border-slate-200" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Section B — Plan Includes (Collapsible) */}
            <View className="px-4 mt-8">
              <AccordionItem 
                title="Batch Includes" 
                isExpanded={isIncludesExpanded} 
                onToggle={() => setIsIncludesExpanded(!isIncludesExpanded)}
              >
                <View className="flex-row flex-wrap">
                  {BATCH_INCLUDES.map((item, idx) => (
                    <View key={idx} className="w-1/2 flex-row mb-4 pr-3">
                      <Star size={14} color="#3B82F6" fill="#3B82F6" className="mt-0.5" />
                      <Text className="text-[10px] text-slate-600 ml-2 font-bold leading-4">{item}</Text>
                    </View>
                  ))}
                </View>
              </AccordionItem>
            </View>

            {/* Section C — This Batch Includes */}
            <View className="px-4 mt-4">
              <Text className="text-lg font-black text-slate-800 mb-6">This Batch Includes</Text>
              
              <View className="space-y-6">
                <View className="flex-row items-start mb-6">
                  <View className="bg-orange-100 p-2.5 rounded-xl mr-4 shadow-sm">
                    <Calendar size={20} color="#F59E0B" />
                  </View>
                  <View>
                    <Text className="text-sm font-black text-slate-800 mb-1">Course Duration</Text>
                    <Text className="text-xs text-slate-500 font-medium">Bridge Course Start: 01 May 2024</Text>
                    <Text className="text-xs text-slate-500 font-medium">Syllabus Class Start: 15 May 2024</Text>
                    <Text className="text-xs text-slate-500 font-medium">Syllabus Class End: 31 Jan 2025</Text>
                  </View>
                </View>

                {[
                  { icon: Star, color: "#5B4FCF", bg: "#EEF0FF", title: "Validity", value: "Till NEET 2027 Exam" },
                  { icon: Star, color: "#5B4FCF", bg: "#EEF0FF", title: "Mode of Lectures", value: "Live Online" },
                  { icon: Star, color: "#5B4FCF", bg: "#EEF0FF", title: "Schedule", value: "2 Classes per day (Mon-Sat)" },
                  { icon: Star, color: "#5B4FCF", bg: "#EEF0FF", title: "Exam Guidance", value: "Available at PW Offline centers" },
                  { icon: Star, color: "#5B4FCF", bg: "#EEF0FF", title: "Well-being Support", value: "One-to-one emotional support" },
                  { icon: GraduationCap, color: "#5B4FCF", bg: "#EEF0FF", title: "Subjects", value: "Physics, Botany, Zoology, Chemistry" },
                ].map((item, idx) => (
                  <View key={idx} className="flex-row items-center mb-5">
                    <View style={{ backgroundColor: item.bg }} className="p-2.5 rounded-xl mr-4 shadow-sm">
                      <item.icon size={20} color={item.color} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-black text-slate-800">{item.title}</Text>
                      <Text className="text-xs text-slate-500 font-medium mt-0.5">{item.value}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Section D — Orientation Video Card */}
            <View className="px-4 mt-4">
              <TouchableOpacity className="bg-white border border-slate-100 rounded-[24px] overflow-hidden flex-row shadow-sm">
                <View className="w-1/3 aspect-video relative">
                  <Image source={{ uri: "https://picsum.photos/seed/orient/300/200" }} className="w-full h-full" />
                  <View className="absolute inset-0 items-center justify-center bg-black/30">
                    <View className="bg-white rounded-full p-2.5 shadow-lg">
                      <Play size={16} color="#000" fill="#000" />
                    </View>
                  </View>
                </View>
                <View className="flex-1 p-4 justify-center">
                  <Text className="text-sm font-black text-slate-800 leading-5">Hello Baccho !! To Know More About The Batch Watch Orientation Video</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Section E — Demo Videos */}
            <View className="flex-row items-center justify-between px-4 mt-10 mb-5">
               <Text className="text-lg font-black text-slate-800">Demo Videos</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
              {DEMO_VIDEOS.map((video) => (
                <View key={video.id} className="mr-5 w-72">
                  <View className="bg-[#EEF0FF] rounded-[32px] p-5 relative mb-4 h-44 justify-between">
                    <Image source={{ uri: "https://via.placeholder.com/40x40" }} className="absolute top-5 right-5 w-10 h-10 opacity-30" />
                    <View>
                      <Text className="text-[#5B4FCF] font-black text-xl leading-tight">{video.title}</Text>
                      <Text className="text-[#5B4FCF] font-bold text-sm opacity-60 mt-1">{video.subtitle}</Text>
                    </View>
                    
                    <View className="flex-row items-center justify-between">
                      <View>
                        <Text className="text-[#5B4FCF] font-black text-xs">{video.teacher}</Text>
                      </View>
                      <View className="relative">
                        <Image source={{ uri: "https://picsum.photos/seed/t1/100/100" }} className="w-14 h-14 rounded-full border-4 border-white" />
                        <View className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm">
                          <Play size={12} color="#5B4FCF" fill="#5B4FCF" />
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text className="text-sm font-black text-slate-800 px-1" numberOfLines={1}>{video.title}</Text>
                  <View className="flex-row items-center mt-2 px-1">
                    <Feather name="clock" size={12} color="#94a3b8" />
                    <Text className="text-[10px] text-slate-400 font-black ml-1.5">{video.duration}</Text>
                    <View className="w-1 h-1 rounded-full bg-slate-300 mx-2" />
                    <Text className="text-[10px] text-slate-400 font-black">{video.date}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity className="mx-4 mt-6 py-4 rounded-2xl border border-slate-200 items-center">
               <Text className="text-slate-600 font-black text-sm">View all ›</Text>
            </TouchableOpacity>

            {/* Section F — Know Your Teachers */}
            <View className="flex-row items-center justify-between px-4 mt-12 mb-5">
               <Text className="text-lg font-black text-slate-800">Know Your Teachers</Text>
               <TouchableOpacity><Text className="text-sm font-black text-[#3B82F6]">View all</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
              {TEACHERS.map((teacher) => (
                <View key={teacher.id} className="mr-5 w-36">
                  <View className="bg-slate-100 rounded-[24px] overflow-hidden aspect-square mb-3 relative">
                    <Image source={{ uri: teacher.image }} className="w-full h-full" />
                    <View className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-2">
                      <Text className="text-white text-[10px] font-black" numberOfLines={1}>{teacher.name}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between px-1">
                    <Text className="text-[11px] font-black text-slate-700 flex-1" numberOfLines={1}>{teacher.subject} by M...</Text>
                    <View className="bg-[#EEF0FF] rounded-full p-1.5">
                      <Ionicons name="arrow-forward" size={10} color="#5B4FCF" />
                    </View>
                  </View>
                  <Text className="text-[10px] text-slate-400 font-bold mt-1 px-1">Exp: {teacher.exp}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Section G — Checkout Your Schedule */}
            <View className="flex-row items-center justify-between px-4 mt-12 mb-5">
               <Text className="text-lg font-black text-slate-800">Checkout Your Schedule</Text>
               <TouchableOpacity><Text className="text-sm font-black text-[#3B82F6]">View all</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
              {SCHEDULE_ITEMS.map((item) => (
                <TouchableOpacity key={item.id} className="mr-4 w-32 aspect-square rounded-[32px] border-2 border-[#5B4FCF20] bg-white p-4 items-center justify-center shadow-sm">
                  <View style={{ backgroundColor: `${item.color}15` }} className="p-3.5 rounded-2xl mb-3">
                    <Ionicons name={item.icon} size={24} color={item.color} />
                  </View>
                  <Text className="text-[10px] font-black text-slate-700 text-center leading-4" numberOfLines={2}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Section H — Other Details (Collapsible) */}
            <View className="px-4 mt-10">
              <AccordionItem 
                title="Other Details" 
                isExpanded={isOtherDetailsExpanded} 
                onToggle={() => setIsOtherDetailsExpanded(!isOtherDetailsExpanded)}
              >
                <View className="flex-row flex-wrap justify-between">
                  {[1, 2, 3, 4].map(i => (
                    <View key={i} className="w-[48%] aspect-square bg-slate-50 rounded-[28px] overflow-hidden mb-4 border border-slate-100">
                      <Image source={{ uri: `https://picsum.photos/seed/m${i}/300/300` }} className="w-full h-full" />
                    </View>
                  ))}
                </View>
                <View className="bg-orange-500 py-3.5 mt-2 rounded-2xl items-center shadow-lg shadow-orange-200">
                  <Text className="text-white font-black text-xs tracking-widest uppercase">Click Image To Explore More</Text>
                </View>
              </AccordionItem>
            </View>

            {/* Section I — FAQ's */}
            <View className="px-4 mt-12">
              <Text className="text-lg font-black text-slate-800 mb-6">FAQ's</Text>
              {FAQS.map((faq, idx) => (
                <FaqItem 
                  key={idx} 
                  faq={faq} 
                  isExpanded={expandedFaq === idx} 
                  onToggle={() => setExpandedFaq(expandedFaq === idx ? null : idx)} 
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom Price Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-50 p-5 flex-row items-center justify-between shadow-2xl z-30">
        <View>
          <View className="flex-row items-center">
            <Text className="text-2xl font-black text-[#5B4FCF]">₹{currentPlan.price}</Text>
            <Text className="text-sm text-slate-300 line-through ml-2 font-black">₹{currentPlan.oldPrice}</Text>
          </View>
          <View className="flex-row items-center mt-1">
            <View className="bg-green-100 px-2 py-1 rounded-lg flex-row items-center">
              <MaterialCommunityIcons name="percent" size={12} color="#22C55E" />
              <Text className="text-[10px] font-black text-green-600 ml-0.5">{currentPlan.discount}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="bg-[#5B4FCF] px-12 py-4 rounded-[20px] shadow-lg shadow-blue-200">
          <Text className="text-white font-black text-base tracking-widest">BUY NOW</Text>
        </TouchableOpacity>
      </View>

      {/* Compare Plan Bottom Sheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: '#1a1a1a' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
      >
        <BottomSheetView className="flex-1 bg-[#1a1a1a]">
          <View className="flex-row items-center justify-between p-8 border-b border-white/5">
            <Text className="text-white text-xl font-black">Lakshya NEET 2027</Text>
            <TouchableOpacity onPress={() => bottomSheetModalRef.current?.dismiss()} className="bg-white/10 p-2.5 rounded-full">
              <X size={20} color="white" />
            </TouchableOpacity>
          </View>

          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {/* Modal Plan Selector */}
            <View className="flex-row justify-between px-6 mt-8">
              {PLANS.map((plan) => (
                <TouchableOpacity 
                  key={plan.id}
                  onPress={() => setSelectedPlan(plan.id)}
                  className="w-[31%] items-center"
                >
                  <View 
                    className="w-full aspect-[4/5] rounded-[24px] overflow-hidden relative"
                    style={{ 
                      borderWidth: plan.id === selectedPlan ? 2 : 0,
                      borderColor: '#5B4FCF'
                    }}
                  >
                     <GradientBackground colors={plan.id === 'batch' ? ['#2a2a2a', '#1a1a1a'] : plan.colors} />
                     <View className="flex-1 items-center justify-center p-2">
                        <Text className="text-white font-black text-[10px] uppercase text-center">{plan.label}</Text>
                     </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Comparison Table */}
            <View className="px-6 mt-10">
              <View className="flex-row mb-6 border-b border-white/5 pb-4">
                <View className="w-[35%]" />
                {PLANS.map(p => (
                  <View key={p.id} className="flex-1 items-center">
                    <View className="bg-white/5 p-2 rounded-xl mb-2">
                       <Ionicons name={p.id === 'batch' ? "layers" : p.id === 'infinity' ? "infinite" : "star"} size={16} color="white" />
                    </View>
                    <Text className="text-white text-[8px] font-black uppercase tracking-widest">{p.label}</Text>
                  </View>
                ))}
              </View>

              {/* Base Section */}
              <View className="mb-8">
                {[
                  "Live Lectures", "DPPs & Solutions", "Test Series", "Doubt Resolution"
                ].map((feat, idx) => (
                  <View key={idx} className="flex-row py-4 border-b border-white/5 items-center">
                    <View className="w-[35%] flex-row items-center">
                      <Text className="text-white/80 text-[11px] font-bold">{feat}</Text>
                      <Info size={12} color="#4b5563" className="ml-1.5" />
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'batch' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <Check size={16} color="#22C55E" strokeWidth={4} />
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'infinity' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <Check size={16} color="#22C55E" strokeWidth={4} />
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'pro' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <Check size={16} color="#22C55E" strokeWidth={4} />
                    </View>
                  </View>
                ))}
              </View>

              {/* Infinity Section */}
              <View className="mb-8">
                <Text className="text-slate-500 text-[10px] font-black mb-4 uppercase tracking-widest">Infinity Perks</Text>
                {[
                  "1:1 Mentorship", "Offline Access", "Hard Copy Notes"
                ].map((feat, idx) => (
                  <View key={idx} className="flex-row py-4 border-b border-white/5 items-center">
                    <View className="w-[35%]">
                      <Text className="text-white/80 text-[11px] font-bold">{feat}</Text>
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'batch' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <X size={16} color="#EF4444" strokeWidth={3} />
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'infinity' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <Check size={16} color="#22C55E" strokeWidth={4} />
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'pro' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <Check size={16} color="#22C55E" strokeWidth={4} />
                    </View>
                  </View>
                ))}
              </View>

              {/* Infinity Pro Section */}
              <View className="mb-10">
                <Text className="text-slate-500 text-[10px] font-black mb-4 uppercase tracking-widest">Infinity Pro Exclusive</Text>
                {[
                  "Mock Test Feedback", "Personal Counselor"
                ].map((feat, idx) => (
                  <View key={idx} className="flex-row py-4 border-b border-white/5 items-center">
                    <View className="w-[35%]">
                      <Text className="text-white/80 text-[11px] font-bold">{feat}</Text>
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'batch' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <X size={16} color="#EF4444" strokeWidth={3} />
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'infinity' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <X size={16} color="#EF4444" strokeWidth={3} />
                    </View>
                    <View className={`flex-1 items-center ${selectedPlan === 'pro' ? 'bg-[#5B4FCF15] rounded-lg py-2' : ''}`}>
                       <Check size={16} color="#22C55E" strokeWidth={4} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </BottomSheetScrollView>

          {/* Modal Bottom Price Bar */}
          <View className="bg-[#242424] p-8 flex-row items-center justify-between border-t border-white/5">
            <View>
              <Text className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{currentPlan.label} Plan</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-white text-2xl font-black">₹{currentPlan.price}</Text>
                <Text className="text-slate-600 text-sm line-through ml-2 font-bold">₹{currentPlan.oldPrice}</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-yellow-500 px-10 py-4 rounded-[20px] shadow-xl shadow-yellow-500/20">
              <Text className="text-black font-black text-base uppercase tracking-tighter">Buy Now</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
