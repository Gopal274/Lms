import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Flame } from 'lucide-react-native';

interface FlamePointsProps {
  points?: number | string;
  onPress?: () => void;
  color?: string;
  size?: number;
}

const FlamePoints: React.FC<FlamePointsProps> = ({ 
  points = "0", 
  onPress, 
  color = "#f97316", 
  size = 18 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7} 
      style={styles.container}
      accessibilityLabel={`Current streak: ${points}`}
    >
      <Flame color={color} size={size} fill={color} />
      <Text style={styles.pointsText}>{points}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7ed', // Light orange
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffedd5',
    marginHorizontal: 4,
  },
  pointsText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '800',
    color: '#9a3412', // Darker orange for text
    lineHeight: 18,
  },
});

export default FlamePoints;
