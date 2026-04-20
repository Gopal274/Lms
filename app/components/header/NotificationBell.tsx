import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Bell } from 'lucide-react-native';

interface NotificationBellProps {
  onPress?: () => void;
  count?: number;
  color?: string;
  size?: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ 
  onPress, 
  count = 0,
  color = "#1e3a8a", 
  size = 26 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.6} 
      style={styles.container}
      accessibilityLabel={`View ${count} notifications`}
    >
      <Bell color={color} size={size} strokeWidth={2} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    marginHorizontal: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444', // Red
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 12,
  },
});

export default NotificationBell;
