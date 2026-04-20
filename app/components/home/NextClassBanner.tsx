import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, Calendar, PlayCircle } from 'lucide-react-native';

export interface ClassData {
  title: string;
  time: string;
  type: 'LIVE' | 'RECORDED';
  isLive?: boolean;
}

interface NextClassBannerProps {
  nextClass?: ClassData;
  onJoinPress?: () => void;
}

const NextClassBanner: React.FC<NextClassBannerProps> = ({ 
  nextClass, 
  onJoinPress 
}) => {
  if (!nextClass) {
    return (
      <View style={styles.emptyContainer}>
        <Calendar size={24} color="#94a3b8" />
        <Text style={styles.emptyText}>No class today</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[
          styles.badge, 
          { backgroundColor: nextClass.type === 'LIVE' ? '#fee2e2' : '#f1f5f9' }
        ]}>
          <View style={[
            styles.dot, 
            { backgroundColor: nextClass.type === 'LIVE' ? '#ef4444' : '#64748b' }
          ]} />
          <Text style={[
            styles.badgeText, 
            { color: nextClass.type === 'LIVE' ? '#ef4444' : '#64748b' }
          ]}>
            {nextClass.type}
          </Text>
        </View>
        <Text style={styles.timeText}>{nextClass.time}</Text>
      </View>
      
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>{nextClass.title}</Text>
        <TouchableOpacity 
          style={styles.joinButton} 
          onPress={onJoinPress}
          activeOpacity={0.8}
        >
          <PlayCircle size={18} color="#ffffff" fill="#ffffff" style={{ opacity: 0.2 }} />
          <Text style={styles.joinButtonText}>Join Class</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  emptyContainer: {
    marginHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  emptyText: {
    marginTop: 8,
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  timeText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
    marginRight: 16,
  },
  joinButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default NextClassBanner;
