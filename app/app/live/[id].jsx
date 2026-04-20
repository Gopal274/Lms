import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import io from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";

// Safe Agora Import for Expo Go/Development Builds
let AgoraEngine = null;
let ChannelProfileType = { ChannelProfileLiveBroadcasting: 1 };
let ClientRoleType = { ClientRoleAudience: 2 };
let RtcSurfaceView = View;
let createAgoraRtcEngine = () => null;

try {
    const Agora = require('react-native-agora');
    AgoraEngine = Agora;
    createAgoraRtcEngine = Agora.createAgoraRtcEngine;
    ChannelProfileType = Agora.ChannelProfileType;
    ClientRoleType = Agora.ClientRoleType;
    RtcSurfaceView = Agora.RtcSurfaceView;
} catch (e) {
    console.warn("Agora native module not found. Video streaming will not work in Expo Go.");
}

const AGORA_APP_ID = "1ddb4a3eae824e479dded7a3ff38f900";
const { width } = Dimensions.get('window');

export default function LiveRoom() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [polls, setPolls] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [remoteUid, setRemoteUid] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // chat, polls, qa
  const [votedPolls, setVotedPolls] = useState({});
  
  const socketRef = useRef();
  const flatListRef = useRef();
  const engine = useRef(null);

  useEffect(() => {
    fetchSession();
    socketRef.current = io("http://localhost:8000"); 

    return () => {
      socketRef.current.disconnect();
      leave();
    };
  }, [id]);

  const fetchSession = async () => {
    try {
      const { data } = await api.get(`teacher/get-live-sessions-by-id/${id}`);
      if (data.success) {
        setSession(data.session);
        setPolls(data.session.polls || []);
        setQuestions(data.session.questions || []);
        socketRef.current.emit("join_live", { batchId: data.session.batchId });
        
        if (data.session.status === 'live') {
            initAgora(data.session);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const initAgora = async (sessionData) => {
    try {
        const rtcEngine = createAgoraRtcEngine();
        if (!rtcEngine) {
            console.warn("Agora engine creation failed.");
            return;
        }
        engine.current = rtcEngine;
        engine.current.initialize({
            appId: AGORA_APP_ID,
            channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        });

        engine.current.registerEventHandler({
            onJoinChannelSuccess: (_connection, uid) => {
                setIsJoined(true);
            },
            onUserJoined: (_connection, uid) => {
                setRemoteUid(uid);
            },
            onUserOffline: (_connection, uid) => {
                setRemoteUid(0);
            },
        });

        engine.current.enableVideo();
        
        const { data } = await api.get(`teacher/get-session-token/${id}`);
        if (data.success) {
            engine.current.joinChannelWithUserAccount(data.token, sessionData.agoraChannel, user._id, {
                clientRoleType: ClientRoleType.ClientRoleAudience,
            });
        }
    } catch (e) {
        console.error('Agora Init Error', e);
    }
  };

  const leave = () => {
    try {
        engine.current?.leaveChannel();
        engine.current?.release();
        setIsJoined(false);
        setRemoteUid(0);
    } catch (e) {
        console.error('Agora Leave Error', e);
    }
  };

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("new_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on("new_poll", (poll) => {
      setPolls((prev) => [poll, ...prev]);
      setActiveTab('polls'); // Auto switch to polls when new one arrives
    });

    socketRef.current.on("update_poll_votes", (data) => {
      setPolls((prev) => prev.map(p => {
        if (p._id === data.pollId) {
          const newOptions = [...p.options];
          newOptions[data.optionIndex].votes += 1;
          return { ...p, options: newOptions };
        }
        return p;
      }));
    });

    socketRef.current.on("end_poll", (data) => {
        setPolls((prev) => prev.map(p => p._id === data.pollId ? { ...p, active: false } : p));
    });

    socketRef.current.on("new_question", (data) => {
        // q is the question object from DB
        setQuestions((prev) => [data.question, ...prev]);
    });

    socketRef.current.on("question_answered", (data) => {
        setQuestions((prev) => prev.map(q => q._id === data.questionId ? { ...q, isAnswered: true } : q));
    });

    socketRef.current.on("live_status_changed", (data) => {
        if (data.status === 'ended') {
            alert("This live session has ended.");
            router.back();
        } else if (data.status === 'live') {
            fetchSession();
        }
    });
  }, [socketRef.current]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socketRef.current.emit("send_message", {
      batchId: session.batchId,
      message: newMessage,
      user: { name: user.name, role: user.role }
    });
    setNewMessage("");
  };

  const sendQuestion = async () => {
    if (!newQuestion.trim()) return;
    try {
        const { data } = await api.post("teacher/save-question", {
            sessionId: id,
            question: newQuestion,
            userName: user.name
        });
        
        if (data.success) {
            socketRef.current.emit("send_question", {
              batchId: session.batchId,
              question: data.question
            });
            setNewQuestion("");
            alert("Question sent to teacher!");
        }
    } catch (error) {
        alert("Failed to send question");
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    if (votedPolls[pollId] !== undefined) return;
    
    try {
      await api.post("teacher/vote-poll", {
        sessionId: id,
        pollId,
        optionIndex
      });
      
      socketRef.current.emit("vote_poll", {
        batchId: session.batchId,
        pollId,
        optionIndex
      });
      
      setVotedPolls({ ...votedPolls, [pollId]: optionIndex });
    } catch (error) {
      alert("Failed to vote");
    }
  };

  if (loading) return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#ef4444" />
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      {/* Video Area */}
      <View className="aspect-video bg-black justify-center items-center relative">
        {remoteUid !== 0 ? (
            <RtcSurfaceView
                canvas={{ uid: remoteUid }}
                style={StyleSheet.absoluteFill}
            />
        ) : (
            <View className="items-center">
                <Ionicons name="videocam-off" size={64} color="rgba(255,255,255,0.2)" />
                <Text className="text-white font-bold mt-4">
                    {session?.status === 'live' ? 'Connecting to teacher...' : 'Session not live'}
                </Text>
            </View>
        )}
        
        <TouchableOpacity 
          onPress={() => router.back()}
          className="absolute top-4 left-4 bg-black/50 p-2 rounded-full z-10"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        {session?.status === 'live' && (
            <View className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-white mr-2" />
                <Text className="text-white text-[10px] font-bold tracking-widest">LIVE</Text>
            </View>
        )}
      </View>

      {/* Tabs Selector */}
      <View className="flex-row border-b border-gray-100">
        {[
          { id: 'chat', label: 'Chat', icon: 'chatbubble-outline' },
          { id: 'polls', label: 'Polls', icon: 'stats-chart-outline' },
          { id: 'qa', label: 'Q&A', icon: 'help-circle-outline' },
        ].map(tab => (
          <TouchableOpacity 
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={`flex-1 flex-row items-center justify-center py-4 border-b-2 ${
              activeTab === tab.id ? 'border-red-600' : 'border-transparent'
            }`}
          >
            <Ionicons 
              name={tab.icon} 
              size={18} 
              color={activeTab === tab.id ? '#dc2626' : '#6b7280'} 
              style={{ marginRight: 6 }}
            />
            <Text className={`font-bold ${activeTab === tab.id ? 'text-red-600' : 'text-gray-500'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View className="flex-1 bg-gray-50">
        {activeTab === 'chat' && (
          <FlatList
            ref={flatListRef}
            data={messages}
            onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            renderItem={({ item }) => (
              <View className={`px-4 py-2 flex-row items-start ${item.user.role === 'teacher' ? 'bg-red-50/30' : ''}`}>
                <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                  item.user.role === 'teacher' ? 'bg-red-100' : 'bg-gray-200'
                }`}>
                  <Text className={`text-[10px] font-bold ${item.user.role === 'teacher' ? 'text-red-600' : 'text-gray-600'}`}>
                    {item.user.name.charAt(0)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className={`text-[10px] font-bold mb-1 ${item.user.role === 'teacher' ? 'text-red-600' : 'text-gray-500'}`}>
                    {item.user.name} {item.user.role === 'teacher' && '(Teacher)'}
                  </Text>
                  <Text className="text-gray-800 text-sm leading-5">{item.message}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            className="flex-1"
          />
        )}

        {activeTab === 'polls' && (
          <ScrollView className="flex-1 p-4">
            {polls.length === 0 ? (
              <View className="items-center justify-center py-20">
                <Ionicons name="stats-chart" size={48} color="#e5e7eb" />
                <Text className="text-gray-400 mt-4 font-medium">No active polls yet</Text>
              </View>
            ) : (
              polls.map((poll, pIdx) => {
                const totalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0);
                const hasVoted = votedPolls[poll._id] !== undefined;
                const isEnded = poll.active === false;

                return (
                  <View key={poll._id || pIdx} className={`bg-white p-5 rounded-3xl shadow-sm mb-4 border ${isEnded ? 'border-gray-200 bg-gray-50' : 'border-gray-100'}`}>
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className={`text-lg font-bold flex-1 ${isEnded ? 'text-gray-500' : 'text-gray-800'}`}>
                            {poll.question}
                        </Text>
                        {isEnded && (
                            <View className="bg-gray-200 px-2 py-0.5 rounded-full ml-2">
                                <Text className="text-gray-600 text-[8px] font-bold">ENDED</Text>
                            </View>
                        )}
                    </View>
                    <View className="space-y-3">
                      {poll.options.map((opt, oIdx) => {
                        const isSelected = votedPolls[poll._id] === oIdx;
                        const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;

                        return (
                          <TouchableOpacity 
                            key={oIdx}
                            onPress={() => handleVote(poll._id, oIdx)}
                            disabled={hasVoted || isEnded}
                            className={`p-4 rounded-2xl border-2 mb-2 overflow-hidden relative ${
                              isSelected ? 'border-red-600 bg-red-50' : 'border-gray-100 bg-gray-50'
                            } ${isEnded && !isSelected ? 'opacity-60' : ''}`}
                          >
                            {(hasVoted || isEnded) && (
                              <View 
                                style={{ width: `${percentage}%` }} 
                                className={`absolute left-0 top-0 bottom-0 ${isEnded ? 'bg-gray-200' : 'bg-red-100'} opacity-50`} 
                              />
                            )}
                            <View className="flex-row justify-between items-center relative z-10">
                              <Text className={`font-bold flex-1 ${isSelected ? 'text-red-700' : (isEnded ? 'text-gray-500' : 'text-gray-700')}`}>
                                {opt.option}
                              </Text>
                              {(hasVoted || isEnded) && (
                                <Text className={`text-xs font-black ml-2 ${isEnded ? 'text-gray-500' : 'text-red-600'}`}>{percentage}%</Text>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    {(hasVoted || isEnded) && (
                      <Text className="text-[10px] text-gray-400 text-center mt-3 uppercase tracking-widest font-bold">
                        Total {totalVotes} votes
                      </Text>
                    )}
                  </View>
                );
              })
            )}
          </ScrollView>
        )}

        {activeTab === 'qa' && (
          <View className="flex-1 p-4">
            <View className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-6">
               <Text className="font-bold text-gray-800 mb-2">Ask Teacher</Text>
               <TextInput 
                 placeholder="Type your question here..."
                 className="bg-gray-50 p-4 rounded-2xl border border-gray-100 min-h-[100px]"
                 multiline
                 value={newQuestion}
                 onChangeText={setNewQuestion}
               />
               <TouchableOpacity 
                 onPress={sendQuestion}
                 className="bg-red-600 p-4 rounded-2xl items-center mt-4 shadow-sm"
               >
                 <Text className="text-white font-bold">Send Question</Text>
               </TouchableOpacity>
            </View>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2 mb-4">
              Recent Questions
            </Text>
            <FlatList
                data={questions}
                keyExtractor={(item, index) => item._id || index.toString()}
                renderItem={({ item }) => (
                    <View className={`p-4 rounded-2xl mb-3 border ${item.isAnswered ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100'}`}>
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className={`text-[10px] font-bold ${item.isAnswered ? 'text-green-600' : 'text-blue-600'}`}>
                                {item.userName}
                            </Text>
                            {item.isAnswered && (
                                <View className="bg-green-600 px-2 py-0.5 rounded-full">
                                    <Text className="text-white text-[8px] font-bold">ANSWERED</Text>
                                </View>
                            )}
                        </View>
                        <Text className={`text-sm ${item.isAnswered ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                            {item.question}
                        </Text>
                    </View>
                )}
                className="flex-1"
            />
          </View>
        )}
      </View>

      {/* Chat Input Area (Only for Chat Tab) */}
      {activeTab === 'chat' && (
        <View className="bg-white p-4 flex-row items-center border-t border-gray-100">
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Say something..."
            className="flex-1 bg-gray-100 h-12 px-5 rounded-full mr-3 text-gray-800"
          />
          <TouchableOpacity 
              onPress={sendMessage}
              disabled={!newMessage.trim()}
              className={`w-12 h-12 rounded-full justify-center items-center ${newMessage.trim() ? 'bg-red-600 shadow-md' : 'bg-gray-200'}`}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
