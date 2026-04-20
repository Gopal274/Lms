import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VibeProfileHeaderProps {
  username: string;
  avatarUrl?: string;
  onProfilePress?: () => void;
  onPurchasesPress?: () => void;
}

const VibeProfileHeader: React.FC<VibeProfileHeaderProps> = ({ 
  username, 
  avatarUrl, 
  onProfilePress,
  onPurchasesPress 
}) => {
  return (
    <View style={styles.container}>
      {/* User Info Section */}
      <TouchableOpacity 
        style={styles.profileRow} 
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <Image 
          source={{ uri: avatarUrl || 'https://via.placeholder.com/100' }} 
          style={styles.avatar} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Hi, {username}</Text>
          <Text style={styles.subtext}>View profile</Text>
        </View>
      </TouchableOpacity>

      {/* My Purchases Card */}
      <TouchableOpacity 
        style={styles.purchasesCard} 
        onPress={onPurchasesPress}
        activeOpacity={0.8}
      >
        <View style={styles.cardLeft}>
          <Ionicons name="briefcase-outline" size={20} color="#475569" />
          <Text style={styles.cardText}>My Purchases</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
      </TouchableOpacity>

      {/* Join Beta Banner */}
      <TouchableOpacity 
        style={styles.betaBanner} 
        activeOpacity={0.8}
      >
        <Text style={styles.betaText}>Join Beta Program ✨</Text>
        <Ionicons name="chevron-forward" size={18} color="#1e3a8a" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f1f5f9',
  },
  textContainer: {
    marginLeft: 15,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 2,
  },
  purchasesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  betaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eff6ff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  betaText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e3a8a',
  },
});

export default VibeProfileHeader;
