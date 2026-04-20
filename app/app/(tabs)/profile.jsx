import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Alert, Share } from "react-native";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [linkedStudents, setLinkedStudents] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [isLinking, setIsLinking] = useState(false);
  const [selectedStudentReport, setSelectedStudentReport] = useState(null);

  useEffect(() => {
    if (user?.role === 'parent') {
        fetchLinkedStudents();
    }
  }, [user]);

  const fetchLinkedStudents = async () => {
    try {
        const { data } = await api.get("parent/get-students");
        if (data.success) {
            setLinkedStudents(data.students);
        }
    } catch (e) {
        console.error(e);
    }
  };

  const handleLinkStudent = async () => {
    if (!studentEmail) return;
    setIsLinking(true);
    try {
        const { data } = await api.post("parent/link-student", { studentEmail });
        if (data.success) {
            setStudentEmail("");
            fetchLinkedStudents();
            Alert.alert("Success", "Student linked successfully");
        }
    } catch (e) {
        Alert.alert("Error", e.response?.data?.message || "Failed to link student");
    } finally {
        setIsLinking(false);
    }
  };

  const handleViewReport = async (studentId) => {
    setLoading(true);
    try {
        const { data } = await api.get(`parent/student-progress/${studentId}`);
        if (data.success) {
            setSelectedStudentReport(data.report);
        }
    } catch (e) {
        Alert.alert("Error", "Failed to fetch student report");
    } finally {
        setLoading(false);
    }
  };

  const handleUpdateInfo = async () => {
    setLoading(true);
    try {
      const { data } = await api.put("user/update-user-info", { name });
      if (data.success) {
        setUser(data.user);
        setIsEditing(false);
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (e) {
      Alert.alert("Error", e.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleShareReferral = async () => {
    try {
      await Share.share({
        message: `Join me on LMS Academy! Use my referral code: ${user?.referralCode} to get started. Download now!`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share referral code");
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) return Alert.alert("Error", "Please fill all fields");
    setLoading(true);
    try {
      const { data } = await api.put("user/update-user-password", { oldPassword, newPassword });
      if (data.success) {
        setIsChangingPassword(false);
        setOldPassword("");
        setNewPassword("");
        Alert.alert("Success", "Password changed successfully");
      }
    } catch (e) {
      Alert.alert("Error", e.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 items-center pt-20">
        <View className="bg-blue-100 w-32 h-32 rounded-full items-center justify-center mb-6">
          <Text className="text-5xl">👤</Text>
        </View>
        
        {isEditing ? (
          <View className="w-full mb-4">
            <TextInput
              className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-center text-xl font-bold"
              value={name}
              onChangeText={setName}
            />
            <View className="flex-row mt-4 space-x-4">
              <TouchableOpacity 
                onPress={handleUpdateInfo}
                disabled={loading}
                className="flex-1 bg-blue-900 p-4 rounded-2xl items-center"
              >
                {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Save</Text>}
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 p-4 rounded-2xl items-center"
              >
                <Text className="text-gray-700 font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="items-center mb-4">
            <Text className="text-3xl font-bold text-blue-900">{user?.name}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text className="text-blue-500 font-bold mt-1">Edit Name</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <Text className="text-gray-500 text-lg mb-8">{user?.email}</Text>
        
        <View className="w-full space-y-4">
          {/* Referral Section */}
          <View className="bg-blue-50 p-6 rounded-[32px] border border-blue-100 mb-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text className="text-blue-800 font-black text-xl">Refer & Earn</Text>
                    <Text className="text-blue-600/70 font-medium">Invite friends, get points!</Text>
                </View>
                <View className="bg-blue-100 p-3 rounded-2xl">
                    <Ionicons name="gift" size={24} color="#1e3a8a" />
                </View>
            </View>
            
            <View className="flex-row gap-4 mb-4">
                <View className="flex-1 bg-white/60 p-4 rounded-2xl border border-blue-200/50">
                    <Text className="text-gray-500 text-xs font-bold uppercase mb-1">Your Code</Text>
                    <Text className="text-blue-900 font-black text-lg">{user?.referralCode}</Text>
                </View>
                <View className="flex-1 bg-white/60 p-4 rounded-2xl border border-blue-200/50">
                    <Text className="text-gray-500 text-xs font-bold uppercase mb-1">Points</Text>
                    <Text className="text-blue-900 font-black text-lg">{user?.referralPoints || 0}</Text>
                </View>
            </View>

            <TouchableOpacity 
                onPress={handleShareReferral}
                className="bg-blue-900 p-4 rounded-2xl flex-row justify-center items-center shadow-lg"
            >
                <Ionicons name="share-social" size={20} color="white" />
                <Text className="text-white font-bold ml-2 text-lg">Share with Friends</Text>
            </TouchableOpacity>
          </View>

          {/* Parent Dashboard Section */}
          {user?.role === 'parent' && (
            <View className="bg-orange-50 p-6 rounded-[32px] border border-orange-100 mb-4 shadow-sm">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-orange-800 font-black text-xl">Parent Dashboard</Text>
                        <Text className="text-orange-600/70 font-medium text-xs">Track your children's progress</Text>
                    </View>
                    <View className="bg-orange-100 p-3 rounded-2xl">
                        <Ionicons name="people" size={24} color="#9a3412" />
                    </View>
                </View>

                {/* Link Student Form */}
                <View className="flex-row mb-6">
                    <TextInput 
                        placeholder="Child's Email"
                        className="flex-1 bg-white p-3 rounded-l-2xl border border-orange-200"
                        value={studentEmail}
                        onChangeText={setStudentEmail}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity 
                        onPress={handleLinkStudent}
                        disabled={isLinking}
                        className="bg-orange-600 px-6 rounded-r-2xl items-center justify-center"
                    >
                        {isLinking ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Link</Text>}
                    </TouchableOpacity>
                </View>

                {/* Linked Students List */}
                <View className="space-y-3">
                    {linkedStudents.map((student) => (
                        <View key={student._id} className="bg-white/60 p-4 rounded-2xl border border-orange-200">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-row items-center">
                                    <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center mr-2">
                                        <Text className="text-orange-800 font-bold">{student.name[0]}</Text>
                                    </View>
                                    <Text className="font-bold text-gray-800">{student.name}</Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => handleViewReport(student._id)}
                                    className="bg-orange-100 px-3 py-1 rounded-full"
                                >
                                    <Text className="text-orange-800 font-bold text-[10px]">VIEW REPORT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    {linkedStudents.length === 0 && (
                        <Text className="text-orange-400 text-xs italic text-center">No students linked yet.</Text>
                    )}
                </View>

                {/* Student Report Modal/Overlay */}
                {selectedStudentReport && (
                    <View className="mt-6 p-4 bg-white rounded-3xl border border-orange-100">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="font-black text-orange-900 uppercase text-[10px]">Academic Progress</Text>
                            <TouchableOpacity onPress={() => setSelectedStudentReport(null)}>
                                <Ionicons name="close-circle" size={20} color="#9a3412" />
                            </TouchableOpacity>
                        </View>
                        {selectedStudentReport.map((rep, idx) => (
                            <View key={idx} className="mb-4">
                                <Text className="font-bold text-gray-800 text-sm mb-1">{rep.courseName}</Text>
                                <View className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <View className="h-full bg-orange-500" style={{ width: `${rep.completionPercentage}%` }} />
                                </View>
                                <Text className="text-[10px] text-gray-500 mt-1">{rep.completionPercentage.toFixed(0)}% Complete</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
          )}

          <View className="bg-gray-50 p-4 rounded-2xl flex-row justify-between items-center border border-gray-100">
            <Text className="text-gray-600 font-bold">Role</Text>
            <Text className="text-blue-900 font-bold uppercase">{user?.role}</Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-2xl flex-row justify-between items-center border border-gray-100">
            <Text className="text-gray-600 font-bold">Enrolled Courses</Text>
            <Text className="text-blue-900 font-bold">{user?.courses?.length || 0}</Text>
          </View>

          {!isChangingPassword ? (
            <TouchableOpacity 
              onPress={() => setIsChangingPassword(true)}
              className="bg-gray-50 p-4 rounded-2xl items-center border border-gray-100"
            >
              <Text className="text-gray-700 font-bold">Change Password</Text>
            </TouchableOpacity>
          ) : (
            <View className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <Text className="font-bold mb-2">Change Password</Text>
              <TextInput
                placeholder="Old Password"
                secureTextEntry
                className="bg-white p-3 rounded-xl border border-gray-200 mb-2"
                value={oldPassword}
                onChangeText={setOldPassword}
              />
              <TextInput
                placeholder="New Password"
                secureTextEntry
                className="bg-white p-3 rounded-xl border border-gray-200 mb-4"
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <View className="flex-row space-x-2">
                <TouchableOpacity 
                  onPress={handleChangePassword}
                  disabled={loading}
                  className="flex-1 bg-blue-900 p-3 rounded-xl items-center"
                >
                  {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Update</Text>}
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setIsChangingPassword(false)}
                  className="flex-1 bg-gray-200 p-3 rounded-xl items-center"
                >
                  <Text className="text-gray-700 font-bold">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity 
            onPress={logout}
            className="bg-red-50 p-4 rounded-2xl items-center border border-red-100 mt-6"
          >
            <Text className="text-red-600 font-bold text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-20" />
    </ScrollView>
  );
}
