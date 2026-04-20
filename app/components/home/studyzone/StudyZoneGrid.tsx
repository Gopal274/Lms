import React from 'react';
import { View, StyleSheet } from 'react-native';
import StudyZoneCard from './StudyZoneCard';
import { Layers, Download, LayoutDashboard, Library, History, Bookmark } from 'lucide-react-native';

const StudyZoneGrid: React.FC = () => {
  const items = [
    { label: 'My Batches', icon: Layers, color: '#3b82f6', onPress: () => console.log('My Batches') },
    { label: 'Downloads', icon: Download, color: '#10b981', onPress: () => console.log('Downloads') },
    { label: 'Dashboard', icon: LayoutDashboard, color: '#f59e0b', onPress: () => console.log('Dashboard') },
    { label: 'Library', icon: Library, color: '#8b5cf6', onPress: () => console.log('Library') },
    { label: 'History', icon: History, color: '#ef4444', onPress: () => console.log('History') },
    { label: 'Bookmarks', icon: Bookmark, color: '#06b6d4', onPress: () => console.log('Bookmarks') },
  ];

  return (
    <View style={styles.gridContainer}>
      <View style={styles.row}>
        {items.slice(0, 3).map((item, index) => (
          <StudyZoneCard key={index} {...item} />
        ))}
      </View>
      <View style={styles.row}>
        {items.slice(3, 6).map((item, index) => (
          <StudyZoneCard key={index} {...item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

export default StudyZoneGrid;
