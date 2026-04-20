import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Play } from 'lucide-react-native';

export interface WatchItem {
  id: string;
  title: string;
  thumbnail: string;
  subject: string;
  progress: number; // 0 to 1
}

interface ContinueWatchingProps {
  items: WatchItem[];
}

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue Watching</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <View style={styles.playOverlay}>
                <Play size={20} color="#ffffff" fill="#ffffff" />
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${item.progress * 100}%` }]} />
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.videoTitle} numberOfLines={1}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  listContent: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  card: {
    width: 200,
    marginRight: 12,
  },
  thumbnailContainer: {
    width: '100%',
    height: 112,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f1f5f9',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ef4444',
  },
  info: {
    marginTop: 8,
  },
  subject: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3b82f6',
    textTransform: 'uppercase',
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
});

export default ContinueWatching;
