import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import RecommendedBatchCard, { BatchItem } from './RecommendedBatchCard';

interface RecommendedBatchCarouselProps {
  batches: BatchItem[];
}

const RecommendedBatchCarousel: React.FC<RecommendedBatchCarouselProps> = ({ batches }) => {
  if (batches.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Batches For You</Text>
      </View>
      
      <FlatList
        data={batches}
        renderItem={({ item }) => <RecommendedBatchCard batch={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={296} // 280 (card width) + 16 (margin)
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
  },
  listContent: {
    paddingLeft: 20,
    paddingRight: 4,
  },
});

export default RecommendedBatchCarousel;
