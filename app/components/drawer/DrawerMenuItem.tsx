import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Switch } from 'react-native';
import { LucideIcon, ChevronRight } from 'lucide-react-native';

export interface DrawerMenuItemProps {
  label: string;
  icon: LucideIcon;
  type?: 'link' | 'toggle';
  badge?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
  color?: string;
}

const DrawerMenuItem: React.FC<DrawerMenuItemProps> = ({ 
  label, 
  icon: Icon, 
  type = 'link', 
  badge, 
  value, 
  onValueChange, 
  onPress,
  color = "#475569"
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
          <Icon color={color} size={22} strokeWidth={2} />
        </View>
        <Text style={styles.label}>{label}</Text>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      {type === 'toggle' ? (
        <Switch 
          value={value} 
          onValueChange={onValueChange} 
          trackColor={{ false: '#cbd5e1', true: '#1e3a8a' }}
          thumbColor={'#ffffff'}
        />
      ) : (
        <ChevronRight color="#cbd5e1" size={18} />
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
  badge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
});

export default DrawerMenuItem;
