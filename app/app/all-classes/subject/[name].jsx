import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { 
  ChevronLeft, 
  Shield, 
  ChevronRight 
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';

const CHAPTERS = [
  { id: '1', name: 'Relations and Functions', lectures: '0/3', ch: '01' },
  { id: '2', name: 'Inverse Trigonometric Functions', lectures: '0/3', ch: '02' },
  { id: '3', name: 'Matrices', lectures: '0/3', ch: '03' },
  { id: '4', name: 'Determinants', lectures: '0/3', ch: '04' },
  { id: '5', name: 'Continuity and Differentiability', lectures: '0/3', ch: '05' },
  { id: '6', name: 'Application of Derivatives', lectures: '0/3', ch: '06' },
];

const HeaderXPBadge = ({ xp = 240 }) => (
  <View style={styles.xpBadge}>
    <Shield size={14} color="#1e3a8a" fill="#1e3a8a" />
    <Text style={styles.xpText}>{xp}</Text>
  </View>
);

export default function SubjectChapters() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Chapters');

  const renderChapter = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push({
        pathname: `/all-classes/chapter/${item.id}`,
        params: { chapterName: `Ch - ${item.ch} : ${item.name}` }
      })}
    >
      <View style={styles.cardLeft}>
        <View style={styles.chBadge}>
          <Text style={styles.chText}>CH - {item.ch}</Text>
        </View>
        <Text style={styles.chapterName}>{item.name}</Text>
        <Text style={styles.lecturesText}>Lectures : {item.lectures}</Text>
      </View>
      <ChevronRight size={20} color="#94a3b8" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen 
        options={{
          title: name || 'Subject',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold', color: '#1e3a8a' },
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
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Chapters' && styles.activeTab]}
            onPress={() => setActiveTab('Chapters')}
          >
            <Text style={[styles.tabText, activeTab === 'Chapters' && styles.activeTabText]}>Chapters</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Study Material' && styles.activeTab]}
            onPress={() => setActiveTab('Study Material')}
          >
            <Text style={[styles.tabText, activeTab === 'Study Material' && styles.activeTabText]}>Study Material</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={CHAPTERS}
          renderItem={renderChapter}
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1e3a8a',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  activeTabText: {
    color: '#1e3a8a',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardLeft: {
    flex: 1,
  },
  chBadge: {
    backgroundColor: '#eff6ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  chText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  chapterName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  lecturesText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
});
