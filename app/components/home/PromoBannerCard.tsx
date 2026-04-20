import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export interface PromoBanner {
  id: string;
  image?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onPress?: () => void;
  backgroundColor?: string;
}

interface PromoBannerCardProps {
  banner: PromoBanner;
  isSingle?: boolean;
}

const PromoBannerCard: React.FC<PromoBannerCardProps> = ({ banner, isSingle = false }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={banner.onPress}
      style={[
        styles.container, 
        { backgroundColor: banner.backgroundColor || '#1e3a8a' },
        isSingle && styles.singleCard
      ]}
    >
      <View style={styles.textSection}>
        <Text style={styles.title} numberOfLines={2}>{banner.title}</Text>
        {banner.subtitle && <Text style={styles.subtitle}>{banner.subtitle}</Text>}
        
        {banner.ctaText && (
          <View style={styles.ctaButton}>
            <Text style={styles.ctaText}>{banner.ctaText}</Text>
          </View>
        )}
      </View>
      
      {banner.image && (
        <Image 
          source={{ uri: banner.image }} 
          style={styles.image} 
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 150,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 16,
    marginRight: 16,
  },
  singleCard: {
    marginRight: 0,
    width: '100%',
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#e2e8f0',
    fontSize: 14,
    marginBottom: 12,
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#1e3a8a',
    fontSize: 12,
    fontWeight: '700',
  },
  image: {
    width: 100,
    height: '100%',
    position: 'absolute',
    right: 10,
    bottom: 0,
    opacity: 0.9,
  },
});

export default PromoBannerCard;
