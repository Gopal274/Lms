import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  ActivityIndicator, 
  ScrollView, 
  Modal, 
  Dimensions,
  SafeAreaView,
  Animated
} from "react-native";
import { 
  Ionicons, 
  FontAwesome5, 
  MaterialCommunityIcons, 
  Feather,
  MaterialIcons
} from "@expo/vector-icons";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Plus,
  BookOpen,
  Users,
  BarChart2,
  Search,
  Settings,
  X
} from "lucide-react-native";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const { width } = Dimensions.get("window");

// Mock Data for UI enhancement
const STORIES = [
  { id: "1", label: "AIR 1 Tips", avatar: "https://picsum.photos/seed/s1/100/100", color: "#F59E0B" },
  { id: "2", label: "Organic Hack", avatar: "https://picsum.photos/seed/s2/100/100", color: "#10B981" },
  { id: "3", label: "Exam Update", avatar: "https://picsum.photos/seed/s3/100/100", color: "#3B82F6" },
  { id: "4", label: "Motivation", avatar: "https://picsum.photos/seed/s4/100/100", color: "#EF4444" },
  { id: "5", label: "My Success", avatar: "https://picsum.photos/seed/s5/100/100", color: "#8B5CF6" },
];

const GROUPS = [
  { id: "1", name: "NEET 2024 Aspirants", members: "45k", icon: "graduation-cap", color: "#4A4AFF" },
  { id: "2", name: "Physics Lovers", members: "12k", icon: "atom", color: "#EF4444" },
  { id: "3", name: "Chemistry Doubts", members: "30k", icon: "flask", color: "#10B981" },
];

const POLL_DATA = {
  question: "Which subject are you finding hardest this week?",
  options: [
    { label: "Physics", votes: 45 },
    { label: "Chemistry", votes: 25 },
    { label: "Biology", votes: 20 },
    { label: "Mathematics", votes: 10 },
  ],
  totalVotes: "12,450"
};

const FILTERS = ["Feed", "Doubts", "Groups", "Polls", "Saved"];

export default function CommunityScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const [activeFilter, setActiveFilter] = useState("Feed");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ content: "", images: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPollOption, setSelectedPollOption] = useState(null);
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("community/get-posts");
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await api.put("community/like-post", { postId });
      if (data.success) {
        setPosts(posts.map(p => p._id === postId ? data.post : p));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleComment = async (postId) => {
    const text = commentText[postId];
    if (!text) return;
    try {
      const { data } = await api.post("community/add-comment", { postId, text });
      if (data.success) {
        setPosts(posts.map(p => p._id === postId ? data.post : p));
        setCommentText({ ...commentText, [postId]: "" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderPost = ({ item }) => {
    const isLiked = item.likes.includes(user?._id);
    
    return (
      <View className="bg-white mb-4 border-b border-slate-50">
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden mr-3 border border-slate-100">
                {item.userAvatar ? (
                  <Image source={{ uri: item.userAvatar }} className="w-full h-full" />
                ) : (
                  <View className="w-full h-full items-center justify-center bg-[#EEF0FF]">
                    <Text className="text-[#4A4AFF] font-black">{item.userName[0]}</Text>
                  </View>
                )}
              </View>
              <View>
                <View className="flex-row items-center">
                  <Text className="font-black text-slate-800 text-sm mr-1">{item.userName}</Text>
                  <MaterialIcons name="verified" size={14} color="#3B82F6" />
                </View>
                <Text className="text-slate-400 text-[10px] font-bold">2 hours ago</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-[#F5F3FF] px-4 py-1.5 rounded-full">
               <Text className="text-[#4A4AFF] text-[10px] font-black">FOLLOW</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <Text className="text-slate-700 text-sm leading-5 mb-4 font-medium">{item.content}</Text>
          
          {item.images?.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 -mx-4">
              {item.images.map((img, idx) => (
                <Image 
                  key={idx} 
                  source={{ uri: img.url }} 
                  className="w-[width-32] h-64 rounded-2xl mx-4 bg-slate-50" 
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          )}

          {/* Actions */}
          <View className="flex-row items-center justify-between pt-2">
            <View className="flex-row items-center gap-6">
              <TouchableOpacity onPress={() => handleLike(item._id)} className="flex-row items-center">
                <Heart size={22} color={isLiked ? "#EF4444" : "#64748b"} fill={isLiked ? "#EF4444" : "transparent"} />
                <Text className={`ml-1.5 text-xs font-black ${isLiked ? 'text-[#EF4444]' : 'text-slate-500'}`}>{item.likes.length}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-row items-center">
                <MessageCircle size={22} color="#64748b" />
                <Text className="ml-1.5 text-xs font-black text-slate-500">{item.comments.length}</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Send size={22} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity>
              <Bookmark size={22} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Social Social Proof */}
          {item.likes.length > 0 && (
            <Text className="text-[10px] font-bold text-slate-400 mt-3">
              Liked by <Text className="text-slate-700">amit_sir</Text> and <Text className="text-slate-700">{item.likes.length} others</Text>
            </Text>
          )}

          {/* Comments Preview */}
          {item.comments.length > 0 && (
            <TouchableOpacity className="mt-2">
              <Text className="text-[11px] font-bold text-[#4A4AFF]">View all {item.comments.length} comments</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const HeaderComponent = () => (
    <View className="bg-white">
      {/* Search and Filters */}
      <View className="px-4 py-3 flex-row items-center justify-between">
         <Text className="text-2xl font-black text-slate-800">PW Community</Text>
         <View className="flex-row gap-4">
            <TouchableOpacity><Search size={22} color="#1e293b" /></TouchableOpacity>
            <TouchableOpacity><BookOpen size={22} color="#1e293b" /></TouchableOpacity>
            <TouchableOpacity><Settings size={22} color="#1e293b" /></TouchableOpacity>
         </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 py-2 mb-4">
        {FILTERS.map((f) => (
          <TouchableOpacity 
            key={f} 
            onPress={() => setActiveFilter(f)}
            className={`mr-2 px-6 py-2 rounded-full border ${activeFilter === f ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200'}`}
          >
            <Text className={`text-xs font-bold ${activeFilter === f ? 'text-white' : 'text-slate-500'}`}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 mb-8">
        {STORIES.map((s) => (
          <TouchableOpacity key={s.id} className="mr-5 items-center">
            <View style={{ borderColor: s.color }} className="p-0.5 border-2 rounded-full">
              <Image source={{ uri: s.avatar }} className="w-14 h-14 rounded-full border-2 border-white" />
            </View>
            <Text className="text-[10px] font-bold text-slate-600 mt-2">{s.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Groups Carousel */}
      <View className="px-4 mb-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-black text-slate-800">Join a Group</Text>
          <TouchableOpacity><Text className="text-sm font-bold text-[#4A4AFF]">View all</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 pl-4">
          {GROUPS.map((g) => (
            <View key={g.id} className="mr-4 w-48 bg-white border border-slate-100 rounded-3xl p-4 shadow-sm">
               <View style={{ backgroundColor: `${g.color}15` }} className="w-12 h-12 rounded-2xl items-center justify-center mb-3">
                  <FontAwesome5 name={g.icon} size={20} color={g.color} />
               </View>
               <Text className="font-black text-slate-800 text-sm mb-1" numberOfLines={1}>{g.name}</Text>
               <Text className="text-slate-400 text-[10px] font-bold mb-4">{g.members} members</Text>
               <TouchableOpacity style={{ backgroundColor: g.color }} className="py-2 rounded-xl items-center">
                  <Text className="text-white font-black text-[10px]">JOIN</Text>
               </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Interactive Poll */}
      <View className="mx-4 mb-8 bg-slate-900 rounded-[32px] p-6 shadow-xl">
         <View className="flex-row items-center mb-4">
            <BarChart2 size={20} color="#F59E0B" />
            <Text className="text-white/60 text-[10px] font-black uppercase tracking-widest ml-2">Community Poll</Text>
         </View>
         <Text className="text-white text-lg font-black leading-tight mb-6">{POLL_DATA.question}</Text>
         
         {POLL_DATA.options.map((opt, idx) => (
           <TouchableOpacity 
             key={idx} 
             onPress={() => setSelectedPollOption(idx)}
             className={`mb-3 relative overflow-hidden h-12 rounded-2xl border ${selectedPollOption === idx ? 'border-orange-500' : 'border-white/10'}`}
           >
              {selectedPollOption !== null && (
                <View 
                  style={{ width: `${opt.votes}%`, backgroundColor: selectedPollOption === idx ? '#F59E0B' : '#ffffff20' }} 
                  className="absolute inset-0"
                />
              )}
              <View className="flex-row items-center justify-between px-4 h-full">
                <Text className={`text-sm font-bold ${selectedPollOption === idx ? 'text-slate-900' : 'text-white'}`}>{opt.label}</Text>
                {selectedPollOption !== null && (
                  <Text className={`text-xs font-black ${selectedPollOption === idx ? 'text-slate-900' : 'text-white/60'}`}>{opt.votes}%</Text>
                )}
              </View>
           </TouchableOpacity>
         ))}
         <Text className="text-white/40 text-[10px] font-bold text-center mt-2">Total Votes: {POLL_DATA.totalVotes}</Text>
      </View>

      <View className="px-4 pb-4">
        <Text className="text-lg font-black text-slate-800">Recent Posts</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={HeaderComponent}
        refreshing={loading}
        onRefresh={fetchPosts}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View className="h-24" />}
        ListEmptyComponent={
          !loading && <View className="items-center py-20"><Text className="text-gray-400 font-bold">No posts yet. Be the first!</Text></View>
        }
      />

      <TouchableOpacity 
        onPress={() => setShowCreateModal(true)}
        className="absolute bottom-28 right-6 bg-[#4A4AFF] w-14 h-14 rounded-2xl items-center justify-center shadow-xl shadow-[#4A4AFF]/40"
      >
        <Plus size={28} color="white" />
      </TouchableOpacity>

      <Modal visible={showCreateModal} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-white rounded-t-[40px] p-6 h-[85%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-black text-slate-800">Create Post</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)} className="bg-slate-100 p-2 rounded-full">
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <View className="flex-row items-center mb-6">
                <Image source={{ uri: "https://picsum.photos/seed/user/100/100" }} className="w-10 h-10 rounded-full mr-3" />
                <View>
                  <Text className="font-bold text-slate-800">Rahul Sharma</Text>
                  <TouchableOpacity className="flex-row items-center bg-slate-100 px-2 py-1 rounded-lg mt-1">
                    <Users size={12} color="#64748b" />
                    <Text className="text-[10px] text-slate-500 font-bold ml-1">Anyone can see</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TextInput
                placeholder="Share something with the community..."
                className="text-lg font-medium text-slate-800 mb-6"
                multiline
                value={newPost.content}
                onChangeText={(text) => setNewPost({ ...newPost, content: text })}
              />
              
              <View className="flex-row gap-4 mb-10">
                 <TouchableOpacity className="bg-[#EEF0FF] p-4 rounded-3xl items-center flex-1">
                    <MaterialIcons name="photo-library" size={24} color="#4A4AFF" />
                    <Text className="text-[#4A4AFF] text-[10px] font-black mt-2 uppercase">Gallery</Text>
                 </TouchableOpacity>
                 <TouchableOpacity className="bg-orange-50 p-4 rounded-3xl items-center flex-1">
                    <MaterialIcons name="camera-alt" size={24} color="#F59E0B" />
                    <Text className="text-orange-600 text-[10px] font-black mt-2 uppercase">Camera</Text>
                 </TouchableOpacity>
                 <TouchableOpacity className="bg-green-50 p-4 rounded-3xl items-center flex-1">
                    <BarChart2 size={24} color="#10B981" />
                    <Text className="text-green-600 text-[10px] font-black mt-2 uppercase">Poll</Text>
                 </TouchableOpacity>
              </View>
            </ScrollView>

            <TouchableOpacity 
              onPress={() => {}}
              className="bg-[#4A4AFF] p-5 rounded-2xl items-center shadow-lg"
            >
              <Text className="text-white font-black text-base">POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
