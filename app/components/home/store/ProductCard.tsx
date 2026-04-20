import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export interface ProductItem {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  category: string;
}

interface ProductCardProps {
  product: ProductItem;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price}</Text>
          <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
        </View>
        <Text style={styles.discountText}>{discount}% OFF</Text>
        
        <TouchableOpacity style={styles.buyButton} onPress={onPress}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    padding: 8,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: '80%',
    height: '80%',
  },
  content: {
    paddingHorizontal: 4,
  },
  category: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    height: 36,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1e3a8a',
  },
  originalPrice: {
    fontSize: 10,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '700',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
});

export default ProductCard;
