import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';

const TabBadge = ({ color = "#FFD700", text = "New" }) => (
  <View style={{
    position: 'absolute',
    top: -5,
    right: -15,
    backgroundColor: color,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    zIndex: 10,
  }}>
    <Text style={{ fontSize: 8, fontWeight: '900', color: '#000' }}>{text}</Text>
  </View>
);

const TabIcon = ({ name, color, size, focused, badge, badgeColor }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
    <View>
      <Ionicons name={name} size={22} color={color} />
      {badge && <TabBadge color={badgeColor} />}
    </View>
    {focused && (
      <View style={{
        position: 'absolute',
        bottom: -28,
        width: 30,
        height: 3,
        backgroundColor: '#000',
        borderRadius: 2,
      }} />
    )}
  </View>
);

const MaterialTabIcon = ({ name, color, size, focused, badge, badgeColor }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
    <View>
      <MaterialCommunityIcons name={name} size={24} color={color} />
      {badge && <TabBadge color={badgeColor} />}
    </View>
    {focused && (
      <View style={{
        position: 'absolute',
        bottom: -28,
        width: 30,
        height: 3,
        backgroundColor: '#000',
        borderRadius: 2,
      }} />
    )}
  </View>
);

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#ffffff');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);

  const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 70 + insets.bottom : 75 + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          backgroundColor: '#ffffff',
          height: TAB_BAR_HEIGHT,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 5 : 15,
          paddingTop: 12,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '800',
          marginTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Study",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="clipboard-outline" color={color} focused={focused} badge={true} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "Offline",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="cloud-offline-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="batches"
        options={{
          tabBarLabel: "Batches",
          tabBarIcon: ({ color, focused }) => (
            <MaterialTabIcon name="layers-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          tabBarLabel: "Power B...",
          tabBarIcon: ({ color, focused }) => (
            <MaterialTabIcon name="lightning-bolt-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          tabBarLabel: "Pi",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="radio-outline" color={color} focused={focused} badge={true} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "PW Store",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="cart-outline" color={color} focused={focused} />
          ),
        }}
      />
      {/* Hide other tabs if they exist but aren't in the 6-tab list */}
      <Tabs.Screen name="doubts" options={{ href: null }} />
      <Tabs.Screen name="resources" options={{ href: null }} />
    </Tabs>
  );
};

export default TabLayout;
