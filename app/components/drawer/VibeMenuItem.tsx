import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface VibeMenuItemProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  type?: 'link' | 'toggle';
  badge?: string;
  isNew?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
}

const VibeMenuItem: React.FC<VibeMenuItemProps> = ({ 
  label, 
  icon, 
  type = 'link', 
  badge, 
  isNew,
  value, 
  onValueChange, 
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={type === 'link' ? onPress : undefined}
      activeOpacity={0.7}
      disabled={type === 'toggle'}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="#475569" />
        </View>
        <Text style={styles.label}>{label}</Text>
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>New</Text>
          </View>
        )}
      </View>

      {type === 'toggle' ? (
        <Switch 
          value={value} 
          onValueChange={onValueChange} 
          trackColor={{ false: '#cbd5e1', true: '#1e3a8a' }}
          thumbColor={'#ffffff'}
          style={styles.switch}
        />
      ) : (
        <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  newBadge: {
    backgroundColor: '#facc15', // Yellow pill
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 10,
  },
  newBadgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Smaller switch for PW style
  },
});

export default VibeMenuItem;
