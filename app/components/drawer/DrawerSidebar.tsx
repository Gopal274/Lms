import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import VibeProfileHeader from './VibeProfileHeader';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const DrawerSidebar: React.FC<DrawerContentComponentProps> = (props) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleNavigate = (path: string) => {
    props.navigation.closeDrawer();
    router.push(path as any);
  };

  const menuItems = [
    { label: 'Dark Mode', icon: 'moon-outline', type: 'toggle', value: isDarkMode, onValueChange: setIsDarkMode },
    { label: 'Offline', icon: 'cloud-offline-outline', onPress: () => handleNavigate('/history') },
    { label: 'Scholarship', icon: 'school-outline', onPress: () => handleNavigate('/plans') },
    { label: 'Test Series', icon: 'document-text-outline', onPress: () => handleNavigate('/testing') },
    { label: 'My Test', icon: 'clipboard-outline', onPress: () => handleNavigate('/testing') },
    { label: 'PW Store', icon: 'storefront-outline', onPress: () => handleNavigate('/resources') },
    { label: 'Power Batch', icon: 'flash-outline', onPress: () => handleNavigate('/home') },
    { label: 'PW Books', icon: 'book-outline', isNew: true, onPress: () => handleNavigate('/resources') },
    { label: 'Fastrack', icon: 'play-forward-outline', onPress: () => handleNavigate('/home') },
    { label: 'Saarthi', icon: 'people-outline', onPress: () => handleNavigate('/community') },
    { label: 'DISHA', icon: 'compass-outline', onPress: () => handleNavigate('/home') },
    { label: 'Online Degree', icon: 'school-outline', onPress: () => handleNavigate('/home') },
    { label: 'Library', icon: 'library-outline', onPress: () => handleNavigate('/history') },
    { label: 'Help & Support', icon: 'help-circle-outline', onPress: () => handleNavigate('/doubts') },
  ];

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <VibeProfileHeader 
          username={user?.name || 'User'} 
          avatarUrl={user?.avatar}
          onProfilePress={() => handleNavigate('/profile')}
        />

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => item.type === 'toggle' ? null : (item.onPress ? item.onPress() : props.navigation.closeDrawer())}
              activeOpacity={0.7}
              disabled={item.type === 'toggle'}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={22} color="#475569" />
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New</Text>
                  </View>
                )}
              </View>
              {item.type === 'toggle' ? (
                <Switch 
                  value={item.value} 
                  onValueChange={item.onValueChange}
                  trackColor={{ false: '#cbd5e1', true: '#1e3a8a' }}
                />
              ) : (
                <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.divider} />
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={() => {
              props.navigation.closeDrawer();
              logout();
            }}
          >
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <Text style={styles.footerInfo}>App Version: 1.0.0</Text>
          <Text style={styles.footerInfo}>Made with ❤️ in India</Text>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  menuContainer: { paddingVertical: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  menuLabel: { marginLeft: 12, fontSize: 14, fontWeight: '600', color: '#334155' },
  newBadge: { backgroundColor: '#facc15', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginLeft: 10 },
  newBadgeText: { color: '#000', fontSize: 10, fontWeight: '800' },
  footer: { padding: 20, alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#f1f5f9', width: '100%', marginBottom: 20 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignSelf: 'flex-start' },
  logoutText: { marginLeft: 12, fontSize: 15, fontWeight: '700', color: '#ef4444' },
  footerInfo: { fontSize: 12, color: '#94a3b8', marginBottom: 4 },
});

export default DrawerSidebar;
