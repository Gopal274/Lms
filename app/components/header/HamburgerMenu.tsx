import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface HamburgerMenuProps {
  onPress?: () => void;
  color?: string;
  size?: number;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ 
  onPress, 
  color = "#1e3a8a", 
  size = 28 
}) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.openDrawer();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={0.7} 
      style={styles.container}
      accessibilityLabel="Open navigation drawer"
    >
      <Menu color={color} size={size} strokeWidth={2.5} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginLeft: -8,
  },
});

export default HamburgerMenu;
