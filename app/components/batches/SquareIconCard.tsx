import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface SquareIconCardProps {
  label: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  onPress?: () => void;
}

const SquareIconCard: React.FC<SquareIconCardProps> = ({ label, icon: Icon, iconColor, bgColor, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        {Icon ? (
          <Icon color={iconColor} size={28} strokeWidth={2.5} />
        ) : (
          <View style={{ width: 28, height: 28, backgroundColor: '#cbd5e1', borderRadius: 4 }} />
        )}
      </View>
      <Text style={styles.label} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default SquareIconCard;
