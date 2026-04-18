import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, TextInput, FlatList } from "react-native";
import api from "../../utils/api";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useAuth } from "../../context/AuthContext";
import { usePreventScreenCapture } from 'expo-screen-capture';

const { width } = Dimensions.get('window');

export default function LessonView() {
  const { id } = useLocalSearchParams(); // This is Course ID
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [progress, setProgress] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('playlist'); // playlist, doubt, materials, quiz
  const [question, setQuestion] = useState("");
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [quizResults, setQuizResults] = useState({}); // Track results per question index
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizSummary, setQuizSummary] = useState({
      correct: 0,
      incorrect: 0,
      skipped: 0,
      totalTime: 0,
      accuracy: 0
  });

  useEffect(() => {
    if (activeTab === 'quiz' && currentLesson?.quiz?.length > 0 && !quizFinished) {
        startQuizQuestion(currentQuizIndex);
    }
  }, [activeTab, currentQuizIndex, quizFinished]);

  useEffect(() => {
    let timer;
    if (activeTab === 'quiz' && timeLeft > 0 && !quizFinished) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleQuizAnswer(-1); // Auto-skip on timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, activeTab, quizFinished]);

  const startQuizQuestion = (index) => {
      const q = currentLesson.quiz[index];
      setTimeLeft(q?.timeLimit || 60);
      if (index === 0) setQuizStartTime(Date.now());
  };

  const handleQuizAnswer = (optionIndex) => {
    const isCorrect = optionIndex !== -1 && currentLesson.quiz[currentQuizIndex].options[optionIndex].isCorrect;
    
    setQuizResults({ ...quizResults, [currentQuizIndex]: { 
        optionIndex, 
        isCorrect,
        timeTaken: (currentLesson.quiz[currentQuizIndex].timeLimit || 60) - timeLeft
    }});

    if (currentQuizIndex < currentLesson.quiz.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
        finishQuiz();
    }
  };

  const finishQuiz = async () => {
      const resultsArray = Object.keys(quizResults).map(idx => ({
          questionIndex: parseInt(idx),
          selectedOption: quizResults[idx].optionIndex,
          isCorrect: quizResults[idx].isCorrect,
          timeTaken: quizResults[idx].timeTaken
      }));

      const correct = resultsArray.filter(r => r.isCorrect).length;
      const incorrect = resultsArray.filter(r => r.selectedOption !== -1 && !r.isCorrect).length;
      const skipped = currentLesson.quiz.length - resultsArray.length;
      const totalTime = Math.round((Date.now() - quizStartTime) / 1000);
      const accuracy = Math.round((correct / currentLesson.quiz.length) * 100);
      
      setQuizFinished(true);
      setQuizSummary({
          correct,
          incorrect,
          skipped,
          totalTime,
          accuracy
      });

      try {
        await api.put("/submit-quiz", {
          courseId: id,
          contentId: currentLesson._id,
          score: correct,
          total: currentLesson.quiz.length,
          correct,
          incorrect,
          skipped,
          totalTime,
          answers: resultsArray
        });
      } catch (e) {
        console.log("Failed to submit quiz score", e);
      }
  };

  // Prevent Screen Capture & Recording
  usePreventScreenCapture();

  const currentLesson = content[activeVideo];
  
  const player = useVideoPlayer(currentLesson?.videoUrl, (player) => {
    player.loop = false;
    
    // Find progress for this lesson
    const lessonProgress = (progress || []).find(p => p.contentId === currentLesson?._id);
    if (lessonProgress && lessonProgress.timestamp) {
      player.currentTime = lessonProgress.timestamp;
    }
    
    player.play();
  });

  useEffect(() => {
    fetchContent();
  }, [id]);

  useEffect(() => {
    if (!currentLesson) return;

    const interval = setInterval(async () => {
      if (player && player.playing) {
        try {
          await api.put("/update-progress", {
            courseId: id,
            contentId: currentLesson._id,
            timestamp: player.currentTime,
          });
        } catch (e) {
          console.log("Failed to update progress", e);
        }
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [currentLesson, player]);

  const fetchContent = async () => {
    try {
      const { data } = await api.get(`/get-course-content/${id}`);
      if (data.success) {
        setContent(data.content);
        setProgress(data.progress || []);
      }
    } catch (e) {
      if (user?.subscription?.planTier === 'basic' || user?.subscription?.planTier === 'pro') {
          // If the get-course-content fails because they aren't enrolled, 
          // we might need a dedicated endpoint or logic to fetch content for subscribers.
          // For now, I'll assume the backend getCourseByUser logic needs update too.
          console.log("Subscriber trying to access content...");
      }
      alert("Purchase course or login to watch content");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return;
    setIsQuestionLoading(true);
    try {
      const { data } = await api.put("/add-question", {
        question,
        courseId: id,
        contentId: currentLesson._id,
      });
      if (data.success) {
        setQuestion("");
        // Refresh content to show new question
        await fetchContent();
      }
    } catch (e) {
      alert("Failed to post question");
    } finally {
      setIsQuestionLoading(false);
    }
  };

  if (loading) return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#1e3a8a" /></View>;
  if (!content || content.length === 0) return <Text className="text-center mt-10">No content available for this course.</Text>;

  return (
    <View className="flex-1 bg-white">
      {/* Video Player Section */}
      <View className="bg-black w-full relative" style={{ height: width * 0.56 }}>
        <VideoView
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Dynamic Watermark for Security */}
        <View 
            pointerEvents="none" 
            className="absolute inset-0 flex-row flex-wrap justify-around items-center opacity-10"
        >
            {[1, 2, 3, 4, 5, 6].map(i => (
                <Text key={i} className="text-white text-[10px] font-bold -rotate-45" style={{ margin: 20 }}>
                    {user?.email || "Protected Content"}
                </Text>
            ))}
        </View>
        
        {/* HLS Badge Indicator */}
        <View className="absolute top-2 right-2 bg-black/40 px-2 py-0.5 rounded border border-white/20">
            <Text className="text-white text-[8px] font-bold">HLS ADAPTIVE</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-800">{currentLesson.title}</Text>
          <Text className="text-blue-900 font-medium mb-2">{currentLesson.videoSection}</Text>
          <Text className="text-gray-600 text-sm leading-5 mb-4">{currentLesson.description}</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-gray-100 mb-4">
          {['playlist', 'doubt', 'materials', 'quiz'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center py-3 border-b-2 ${
                activeTab === tab ? "border-blue-900" : "border-transparent"
              }`}
            >
              <Text className={`font-bold capitalize ${
                activeTab === tab ? "text-blue-900" : "text-gray-400"
              }`}>
                {tab === 'doubt' ? 'Doubt' : tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="px-4">
          {activeTab === 'playlist' && (
            <View>
              {content.map((item, index) => (
                <TouchableOpacity 
                  key={item._id || index}
                  onPress={() => setActiveVideo(index)}
                  className={`flex-row items-center p-4 rounded-2xl mb-3 border ${
                    activeVideo === index ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <View className={`w-8 h-8 rounded-full items-center justify-center mr-4 ${
                    activeVideo === index ? "bg-blue-900" : "bg-gray-400"
                  }`}>
                    <Text className="text-white font-bold">{index + 1}</Text>
                  </View>
                  <View className="flex-1">
                      <Text className={`text-lg font-medium ${activeVideo === index ? "text-blue-900" : "text-gray-800"}`}>
                        {item.title}
                      </Text>
                      <Text className="text-gray-500 text-sm">{item.videoLength} mins</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === 'quiz' && (
            <View className="mb-10">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-black text-gray-900">Lesson Quiz</Text>
                {!quizFinished && currentLesson.quiz?.length > 0 && (
                    <View className={`px-4 py-2 rounded-2xl flex-row items-center border ${timeLeft < 10 ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-100'}`}>
                        <Text className={`font-black text-lg ${timeLeft < 10 ? 'text-red-600' : 'text-blue-900'}`}>{timeLeft}s</Text>
                    </View>
                )}
              </View>

              {(!currentLesson.quiz || currentLesson.quiz.length === 0) ? (
                <View className="items-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <Text className="text-gray-400 italic font-bold">No quiz available for this lesson.</Text>
                </View>
              ) : quizFinished ? (
                <View>
                    {/* Performance Analytics Card */}
                    <View className="bg-blue-900 p-8 rounded-[40px] shadow-2xl mb-8 overflow-hidden relative">
                        <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                        <View className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full" />
                        
                        <View className="items-center">
                            <Text className="text-white/60 font-black uppercase tracking-widest text-[10px] mb-2">Total Accuracy</Text>
                            <Text className="text-white text-7xl font-black">{quizSummary.accuracy}%</Text>
                            <View className="w-16 h-1.5 bg-white/20 rounded-full mt-4" />
                        </View>

                        <View className="flex-row justify-between mt-10 border-t border-white/10 pt-6">
                            <View className="items-center flex-1">
                                <Text className="text-green-400 text-xl font-black">{quizSummary.correct}</Text>
                                <Text className="text-white/60 text-[8px] font-bold uppercase mt-1">Correct</Text>
                            </View>
                            <View className="items-center flex-1 border-x border-white/10">
                                <Text className="text-red-400 text-xl font-black">{quizSummary.incorrect}</Text>
                                <Text className="text-white/60 text-[8px] font-bold uppercase mt-1">Wrong</Text>
                            </View>
                            <View className="items-center flex-1">
                                <Text className="text-blue-300 text-xl font-black">{quizSummary.totalTime}s</Text>
                                <Text className="text-white/60 text-[8px] font-bold uppercase mt-1">Time</Text>
                            </View>
                        </View>
                    </View>

                    <Text className="text-lg font-black text-gray-900 mb-4 px-2">Answer Key & Explanation</Text>
                    {currentLesson.quiz.map((q, idx) => {
                        const res = quizResults[idx];
                        const correctOptIdx = q.options.findIndex(o => o.isCorrect);
                        
                        return (
                            <View key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-4">
                                <Text className="font-bold text-gray-800 mb-4">{idx + 1}. {q.question}</Text>
                                
                                <View className="flex-row items-center mb-2">
                                    <View className={`px-3 py-1 rounded-full mr-2 ${res?.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                                        <Text className={`text-[10px] font-black ${res?.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                            {res?.isCorrect ? 'CORRECT' : (res?.optionIndex === -1 ? 'SKIPPED' : 'WRONG')}
                                        </Text>
                                    </View>
                                    <Text className="text-[10px] text-gray-400 font-bold">TAKEN: {res?.timeTaken}s</Text>
                                </View>

                                {!res?.isCorrect && (
                                    <Text className="text-xs text-green-700 font-bold mt-2">
                                        Correct Answer: {q.options[correctOptIdx]?.text}
                                    </Text>
                                )}
                                
                                {q.explanation && (
                                    <View className="mt-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                        <Text className="text-orange-900 text-xs leading-5 italic">{q.explanation}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}

                    <TouchableOpacity 
                        onPress={() => {
                            setQuizFinished(false);
                            setCurrentQuizIndex(0);
                            setQuizResults({});
                        }}
                        className="bg-blue-900 p-5 rounded-3xl items-center shadow-lg mt-4 mb-10"
                    >
                        <Text className="text-white font-black uppercase tracking-widest">Retry Assessment</Text>
                    </TouchableOpacity>
                </View>
              ) : (
                <View className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl">
                    <View className="flex-row items-center justify-between mb-8">
                        <View className="bg-blue-50 px-4 py-1.5 rounded-full">
                            <Text className="text-blue-900 font-black text-[10px]">QUESTION {currentQuizIndex + 1} OF {currentLesson.quiz.length}</Text>
                        </View>
                    </View>

                    <Text className="text-xl font-bold text-gray-900 mb-8 leading-8">
                        {currentLesson.quiz[currentQuizIndex].question}
                    </Text>

                    <View className="space-y-4">
                        {currentLesson.quiz[currentQuizIndex].options.map((opt, oIdx) => (
                            <TouchableOpacity
                                key={oIdx}
                                onPress={() => handleQuizAnswer(oIdx)}
                                className="p-5 rounded-3xl border-2 border-gray-50 bg-gray-50 flex-row items-center mb-4"
                            >
                                <View className="w-8 h-8 rounded-full bg-white items-center justify-center mr-4 border border-gray-100">
                                    <Text className="text-gray-400 font-black text-xs">{String.fromCharCode(65 + oIdx)}</Text>
                                </View>
                                <Text className="font-bold text-gray-800 flex-1">{opt.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity 
                        onPress={() => handleQuizAnswer(-1)}
                        className="mt-6 self-center px-6 py-2"
                    >
                        <Text className="text-gray-400 font-bold uppercase tracking-widest text-xs">Skip Question</Text>
                    </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {activeTab === 'doubt' && (
            <View>
              <View className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
                <Text className="font-bold mb-2">Ask a Question</Text>
                <TextInput
                  placeholder="Ask your doubt about this lesson..."
                  className="bg-white p-3 rounded-xl border border-gray-200 mb-3"
                  multiline
                  value={question}
                  onChangeText={setQuestion}
                />
                <TouchableOpacity 
                  onPress={handleQuestionSubmit}
                  disabled={isQuestionLoading}
                  className="bg-blue-900 p-3 rounded-xl items-center"
                >
                  {isQuestionLoading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Post Question</Text>}
                </TouchableOpacity>
              </View>

              <Text className="text-lg font-bold mb-4">Questions ({currentLesson.questions?.length || 0})</Text>
              {(currentLesson.questions || []).map((q, i) => (
                <View key={q._id || i} className="mb-6 p-4 bg-white border border-gray-100 rounded-2xl">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-2">
                      <Text className="text-blue-900 font-bold">{q.user?.name?.[0] || 'U'}</Text>
                    </View>
                    <Text className="font-bold text-gray-800">{q.user?.name}</Text>
                  </View>
                  <Text className="text-gray-700 ml-10">{q.question}</Text>
                  
                  {q.questionReplies?.length > 0 && (
                    <View className="mt-4 ml-10">
                      <Text className="text-sm font-bold text-gray-400 mb-2">Replies</Text>
                      {q.questionReplies.map((r, ri) => (
                        <View key={r._id || ri} className="mb-2 p-3 bg-gray-50 rounded-xl">
                          <Text className="font-bold text-xs text-blue-900">{r.user?.name} (Mentor)</Text>
                          <Text className="text-gray-700 text-sm">{r.answer}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
              {(!currentLesson.questions || currentLesson.questions.length === 0) && (
                <Text className="text-center text-gray-400 py-10">No questions yet. Be the first to ask!</Text>
              )}
            </View>
          )}

          {activeTab === 'materials' && (
            <View>
              {(currentLesson.links || []).map((link, i) => (
                <TouchableOpacity 
                  key={i}
                  className="flex-row items-center p-4 bg-gray-50 border border-gray-100 rounded-2xl mb-3"
                  onPress={() => { /* Open link logic */ }}
                >
                  <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-4">
                    <Text className="text-red-900 font-bold">PDF</Text>
                  </View>
                  <View>
                    <Text className="font-bold text-gray-800">{link.title}</Text>
                    <Text className="text-gray-400 text-xs">Tap to view / download</Text>
                  </View>
                </TouchableOpacity>
              ))}
              {(!currentLesson.links || currentLesson.links.length === 0) && (
                <Text className="text-center text-gray-400 py-10">No materials available for this lesson.</Text>
              )}
            </View>
          )}
        </View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
