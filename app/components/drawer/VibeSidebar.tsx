import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import VibeProfileHeader from './VibeProfileHeader';
import VibeMenuItem, { VibeMenuItemProps } from './VibeMenuItem';
import { useAuth } from '../../context/AuthContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.82;

interface VibeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const VibeSidebar: React.FC<VibeSidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const slideAnim = useSharedValue(-DRAWER_WIDTH);
  const opacityAnim = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      slideAnim.value = withSpring(0, { damping: 20, stiffness: 100 });
      opacityAnim.value = withTiming(1, { duration: 300 });
    } else {
      slideAnim.value = withTiming(-DRAWER_WIDTH, { duration: 300 });
      opacityAnim.value = withTiming(0, { duration: 300 });
    }
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideAnim.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
    display: opacityAnim.value === 0 && !isOpen ? 'none' : 'flex',
  }));

  const menuItems: VibeMenuItemProps[] = [
    { label: 'Dark Mode', icon: 'moon-outline', type: 'toggle', value: false },
    { label: 'Offline', icon: 'cloud-offline-outline' },
    { label: 'Scholarship', icon: 'school-outline' },
    { label: 'Test Series', icon: 'document-text-outline' },
    { label: 'My Test', icon: 'clipboard-outline' },
    { label: 'PW Store', icon: 'storefront-outline' },
    { label: 'Power Batch', icon: 'flash-outline' },
    { label: 'PW Books', icon: 'book-outline', isNew: true },
    { label: 'Fastrack', icon: 'play-forward-outline' },
    { label: 'Saarthi', icon: 'people-outline' },
    { label: 'DISHA', icon: 'compass-outline' },
    { label: 'Online Degree', icon: 'school-outline' },
    { label: 'Pi Lens', icon: 'camera-outline' },
    { label: 'PW LearnOS', icon: 'desktop-outline' },
    { label: 'Library', icon: 'library-outline' },
    { label: 'My Downloads', icon: 'download-outline' },
    { label: 'Refer & Earn', icon: 'gift-outline' },
    { label: 'About Us', icon: 'information-circle-outline' },
    { label: 'Help & Support', icon: 'help-circle-outline' },
    { label: 'App Guide Tour', icon: 'map-outline' },
  ];

  if (!isOpen && opacityAnim.value === 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={isOpen ? 'auto' : 'none'}>
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, overlayStyle]} />
      </TouchableWithoutFeedback>

      {/* Drawer */}
      <Animated.View style={[styles.drawer, animatedStyle]}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <VibeProfileHeader 
              username={user?.name || 'User'} 
              avatarUrl={user?.avatar}
              onProfilePress={() => {}}
              onPurchasesPress={() => {}}
            />

            <View style={styles.menuContainer}>
              {menuItems.map((item, index) => (
                <VibeMenuItem key={index} {...item} />
              ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.divider} />
              <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={() => {
                  onClose();
                  logout();
                }}
              >
                <Ionicons name="log-out-outline" size={22} color="#ef4444" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
              
              <View style={styles.footerInfo}>
                <Text style={styles.versionText}>App Version: 1.0.0</Text>
                <Text style={styles.madeInText}>Made with ❤️ in India</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  menuContainer: {
    paddingVertical: 10,
  },
  footer: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#ef4444',
  },
  footerInfo: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  madeInText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
});

export default VibeSidebar;
