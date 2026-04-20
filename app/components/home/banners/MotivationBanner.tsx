import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface MotivationBannerProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  onPress?: () => void;
}

const MotivationBanner: React.FC<MotivationBannerProps> = ({ 
  title, 
  subtitle, 
  image, 
  ctaText, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: image }} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        
        <View style={styles.ctaButton}>
          <Text style={styles.ctaText}>{ctaText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 180,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1e293b',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 58, 138, 0.4)', // Deep blue overlay
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 16,
    maxWidth: '80%',
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#1e3a8a',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default MotivationBanner;
