import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Gift } from 'lucide-react-native';

interface RewardIconProps {
  onPress?: () => void;
  color?: string;
  size?: number;
}

const RewardIcon: React.FC<RewardIconProps> = ({ 
  onPress, 
  color = "#1e3a8a", 
  size = 24 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.6} 
      style={styles.container}
      accessibilityLabel="View rewards"
    >
      <Gift color={color} size={size} strokeWidth={2} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    marginHorizontal: 2,
  },
});

export default RewardIcon;
