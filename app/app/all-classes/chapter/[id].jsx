import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView
} from 'react-native';
import { 
  ChevronLeft, 
  Shield, 
  Play,
  CheckCircle2,
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';

const FILTERS = ['All', 'Lectures', 'DPPs', 'Notes', 'DPP PDFs'];

const LECTURES = [
  { 
    id: '1', 
    name: '01 : Quadratic Equations | Introduction & Basics of Quadratic...', 
    date: '30 Apr 2025', 
    duration: '1h 20m',
    teacherImg: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=200&auto=format&fit=crop'
  },
  { 
    id: '2', 
    name: '02 : Nature of Roots & Relations Between Roots...', 
    date: '02 May 2025', 
    duration: '1h 45m',
    teacherImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  },
];

const HeaderXPBadge = ({ xp = 240 }) => (
  <View style={styles.xpBadge}>
    <Shield size={14} color="#1e3a8a" fill="#1e3a8a" />
    <Text style={styles.xpText}>{xp}</Text>
  </View>
);

export default function ChapterContent() {
  const router = useRouter();
  const { chapterName } = useLocalSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');

  const renderLecture = ({ item }) => (
    <View style={styles.lectureCard}>
      <View style={styles.cardMain}>
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: item.teacherImg }} style={styles.teacherImg} />
          <View style={styles.playOverlay}>
            <Play size={20} color="#ffffff" fill="#ef4444" />
          </View>
        </View>
        <View style={styles.lectureInfo}>
          <View style={styles.infoTop}>
            <Text style={styles.dateText}>Lecture • {item.date}</Text>
            <CheckCircle2 size={16} color="#10b981" />
          </View>
          <Text style={styles.lectureName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Notes, DPP & more</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn}>
          <Play size={14} color="#ffffff" fill="#ffffff" />
          <Text style={styles.primaryBtnText}>Watch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen 
        options={{
          title: chapterName || 'Chapter Content',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 14, fontWeight: 'bold', color: '#1e3a8a' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <ChevronLeft size={28} color="#1e3a8a" />
            </TouchableOpacity>
          ),
          headerRight: () => <HeaderXPBadge />,
          headerShadowVisible: false,
        }} 
      />
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* Filters */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {FILTERS.map((filter) => (
              <TouchableOpacity 
                key={filter} 
                style={[
                  styles.filterPill, 
                  activeFilter === filter ? styles.activeFilterPill : styles.inactiveFilterPill
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterText, 
                  activeFilter === filter ? styles.activeFilterText : styles.inactiveFilterText
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* List */}
        <FlatList
          data={LECTURES}
          renderItem={renderLecture}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  xpText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  filterContainer: {
    marginVertical: 12,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  activeFilterPill: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  inactiveFilterPill: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  inactiveFilterText: {
    color: '#64748b',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  lectureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardMain: {
    flexDirection: 'row',
    padding: 12,
  },
  thumbnailContainer: {
    width: 100,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#ecfdf5',
    overflow: 'hidden',
    position: 'relative',
  },
  teacherImg: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lectureInfo: {
    flex: 1,
    marginLeft: 12,
  },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  lectureName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    lineHeight: 18,
  },
  durationText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    padding: 8,
    gap: 8,
  },
  secondaryBtn: {
    flex: 1.2,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  primaryBtn: {
    flex: 1,
    height: 36,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  primaryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
});
