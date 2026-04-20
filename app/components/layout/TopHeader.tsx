import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Import sub-components
import HamburgerMenu from '../header/HamburgerMenu';
import RewardIcon from '../header/RewardIcon';
import FlamePoints from '../header/FlamePoints';
import XPPoints from '../header/XPPoints';
import NotificationBell from '../header/NotificationBell';

interface TopHeaderProps {
  onMenuPress?: () => void;
  onRewardPress?: () => void;
  onFlamePress?: () => void;
  onXPPress?: () => void;
  onNotificationPress?: () => void;
  flamePoints?: number | string;
  xpPoints?: number | string;
  notificationCount?: number;
}

/**
 * TopHeader Component - Built to replicate PhysicsWallah Home Header
 * Includes Hamburger Menu, Rewards, Flame/Streak, XP, and Notifications.
 */
const TopHeader: React.FC<TopHeaderProps> = ({
  onMenuPress,
  onRewardPress,
  onFlamePress,
  onXPPress,
  onNotificationPress,
  flamePoints = "0",
  xpPoints = "0",
  notificationCount = 0,
}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.headerContainer}>
        {/* Left Section: Drawer Menu */}
        <View style={styles.leftSection}>
          <HamburgerMenu onPress={onMenuPress} />
        </View>

        {/* Right Section: Stats and Actions */}
        <View style={styles.rightSection}>
          <RewardIcon onPress={onRewardPress} />
          <FlamePoints points={flamePoints} onPress={onFlamePress} />
          <XPPoints xp={xpPoints} onPress={onXPPress} />
          <NotificationBell count={notificationCount} onPress={onNotificationPress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    zIndex: 1000,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  },
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // Using gap if supported, otherwise handled by individual component margins
  },
});

export default TopHeader;
