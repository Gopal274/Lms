import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import PromoBannerCard, { PromoBanner } from './PromoBannerCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface PromoBannerCarouselProps {
  banners: PromoBanner[];
}

const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // Auto-scroll logic
  useEffect(() => {
    if (banners.length <= 1) return;
    
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= banners.length) {
        nextIndex = 0;
      }
      
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 4000); // 4 seconds interval
    
    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideSize);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  if (banners.length === 0) return null;
  
  if (banners.length === 1) {
    return (
      <View style={styles.container}>
        <PromoBannerCard banner={banners[0]} isSingle />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={({ item }) => <PromoBannerCard banner={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
      />
      
      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot, 
              currentIndex === index && styles.activeDot
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16, // Longer active dot
    backgroundColor: '#1e3a8a',
  },
});

export default PromoBannerCarousel;
