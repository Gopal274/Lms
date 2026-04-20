import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StudyZoneGrid from './StudyZoneGrid';

const StudyZoneSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Study Zone</Text>
      <StudyZoneGrid />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 12,
    paddingLeft: 4,
  },
});

export default StudyZoneSection;
