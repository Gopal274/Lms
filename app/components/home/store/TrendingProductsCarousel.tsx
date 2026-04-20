import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ProductCard, { ProductItem } from './ProductCard';

interface TrendingProductsCarouselProps {
  products: ProductItem[];
}

const TrendingProductsCarousel: React.FC<TrendingProductsCarouselProps> = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trending in Store</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  listContent: {
    paddingLeft: 20,
    paddingRight: 8,
  },
});

export default TrendingProductsCarousel;
