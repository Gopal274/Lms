import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { BotMessageSquare } from 'lucide-react-native';

interface FloatingDoubtBotProps {
  onPress?: () => void;
}

const FloatingDoubtBot: React.FC<FloatingDoubtBotProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <BotMessageSquare color="#ffffff" size={32} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 9999,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
});

export default FloatingDoubtBot;
