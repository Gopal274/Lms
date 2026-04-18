import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleUpdateInfo = async () => {
    setLoading(true);
    try {
      const { data } = await api.put("/update-user-info", { name });
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

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) return Alert.alert("Error", "Please fill all fields");
    setLoading(true);
    try {
      const { data } = await api.put("/update-user-password", { oldPassword, newPassword });
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
