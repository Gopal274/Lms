import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';

interface DrawerProfileHeaderProps {
  name: string;
  email: string;
  avatar?: string;
  onProfilePress?: () => void;
}

const DrawerProfileHeader: React.FC<DrawerProfileHeaderProps> = ({ 
  name, 
  email, 
  avatar,
  onProfilePress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileRow}>
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <User color="#1e3a8a" size={32} strokeWidth={2.5} />
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.email} numberOfLines={1}>{email}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.profileButton} 
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <Text style={styles.profileButtonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  placeholderAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  profileButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#1e3a8a',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonText: {
    color: '#1e3a8a',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default DrawerProfileHeader;
