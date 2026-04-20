import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DrawerMenuItem, { DrawerMenuItemProps } from './DrawerMenuItem';
import { 
  Moon, 
  WifiOff, 
  GraduationCap, 
  FileText, 
  ClipboardList, 
  Store, 
  Zap, 
  BookOpen, 
  FastForward, 
  UserRound, 
  Compass, 
  School,
  LogOut
} from 'lucide-react-native';

interface DrawerMenuListProps {
  onLogout?: () => void;
  onNavigate?: (route: string) => void;
}

const DrawerMenuList: React.FC<DrawerMenuListProps> = ({ onLogout, onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems: DrawerMenuItemProps[] = [
    { label: 'Dark Mode', icon: Moon, type: 'toggle', value: isDarkMode, onValueChange: setIsDarkMode },
    { label: 'Offline Downloads', icon: WifiOff, onPress: () => onNavigate?.('downloads') },
    { label: 'Scholarship', icon: GraduationCap, onPress: () => onNavigate?.('scholarship') },
    { label: 'Test Series', icon: FileText, onPress: () => onNavigate?.('tests') },
    { label: 'My Test', icon: ClipboardList, onPress: () => onNavigate?.('my-tests') },
    { label: 'PW Store', icon: Store, onPress: () => onNavigate?.('store') },
    { label: 'Power Batch', icon: Zap, onPress: () => onNavigate?.('power-batch') },
    { label: 'PW Books', icon: BookOpen, badge: 'New', onPress: () => onNavigate?.('books') },
    { label: 'Fastrack', icon: FastForward, onPress: () => onNavigate?.('fastrack') },
    { label: 'Saarthi', icon: UserRound, onPress: () => onNavigate?.('saarthi') },
    { label: 'DISHA', icon: Compass, onPress: () => onNavigate?.('disha') },
    { label: 'Online Degree', icon: School, onPress: () => onNavigate?.('degree') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {menuItems.map((item, index) => (
          <DrawerMenuItem key={index} {...item} />
        ))}
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.section}>
        <DrawerMenuItem 
          label="Logout" 
          icon={LogOut} 
          color="#ef4444" 
          onPress={onLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  section: {
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default DrawerMenuList;
