import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export interface BatchItem {
  id: string;
  title: string;
  thumbnail: string;
  faculty: string[];
  price: number;
  originalPrice: number;
  discountBadge?: string;
}

interface RecommendedBatchCardProps {
  batch: BatchItem;
  onPress?: () => void;
}

const RecommendedBatchCard: React.FC<RecommendedBatchCardProps> = ({ batch, onPress }) => {
  const discount = Math.round(((batch.originalPrice - batch.price) / batch.originalPrice) * 100);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: batch.thumbnail }} style={styles.thumbnail} />
        {batch.discountBadge && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{batch.discountBadge}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{batch.title}</Text>
        <Text style={styles.faculty} numberOfLines={1}>
          By: {batch.faculty.join(', ')}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{batch.price}</Text>
            <Text style={styles.originalPrice}>₹{batch.originalPrice}</Text>
            <Text style={styles.percentOff}>{discount}% OFF</Text>
          </View>
          
          <TouchableOpacity style={styles.ctaButton} onPress={onPress}>
            <Text style={styles.ctaText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  thumbnailContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f5f9',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
    height: 40,
  },
  faculty: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e3a8a',
  },
  originalPrice: {
    fontSize: 12,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  percentOff: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '700',
  },
  ctaButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e3a8a',
  },
});

export default RecommendedBatchCard;
