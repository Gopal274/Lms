import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

export interface RecommendationItem {
  id: string;
  title: string;
  thumbnail: string;
  subject: string;
}

interface RecommendationsProps {
  title: string;
  items: RecommendationItem[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ title, items }) => {
  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.info}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
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
    width: 180,
    marginRight: 12,
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    marginBottom: 8,
  },
  info: {
    paddingHorizontal: 4,
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

export default Recommendations;
