import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';

interface XPPointsProps {
  xp?: number | string;
  onPress?: () => void;
  color?: string;
  size?: number;
}

const XPPoints: React.FC<XPPointsProps> = ({ 
  xp = "0", 
  onPress, 
  color = "#8b5cf6", // Purple
  size = 18 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7} 
      style={styles.container}
      accessibilityLabel={`Current XP: ${xp}`}
    >
      <Sparkles color={color} size={size} fill={color} />
      <Text style={styles.xpText}>{xp}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f3ff', // Light purple
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ede9fe',
    marginHorizontal: 4,
  },
  xpText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '800',
    color: '#5b21b6', // Darker purple
    lineHeight: 18,
  },
});

export default XPPoints;
