import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { 
  ChevronLeft, 
  Search, 
  Shield, 
  X, 
  ChevronRight 
} from 'lucide-react-native';
import { useRouter, Stack } from 'expo-router';

const SUBJECTS = [
  { id: '1', name: 'Physics', abbr: 'PH', progress: 45 },
  { id: '2', name: 'Maths', abbr: 'MA', progress: 60 },
  { id: '3', name: 'Physical Chemistry', abbr: 'PC', progress: 30 },
  { id: '4', name: 'Organic Chemistry', abbr: 'OC', progress: 15 },
  { id: '5', name: 'Inorganic Chemistry', abbr: 'IC', progress: 50 },
];

const HeaderXPBadge = ({ xp = 240 }) => (
  <View style={styles.xpBadge}>
    <Shield size={14} color="#1e3a8a" fill="#1e3a8a" />
    <Text style={styles.xpText}>{xp}</Text>
  </View>
);

export default function AllClasses() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Subjects');
  const [showBanner, setShowBanner] = useState(true);

  const renderSubject = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/all-classes/subject/${item.name}`)}
    >
      <View style={styles.cardLeft}>
        <View style={styles.abbrContainer}>
          <Text style={styles.abbrText}>{item.abbr}</Text>
        </View>
        <Text style={styles.subjectName}>{item.name}</Text>
      </View>
      <View style={styles.cardRight}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{item.progress}%</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${item.progress}%` }]} />
          </View>
        </View>
        <ChevronRight size={20} color="#94a3b8" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen 
        options={{
          title: 'All Classes',
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
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#94a3b8" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search for DPPs" 
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Subjects' && styles.activeTab]}
            onPress={() => setActiveTab('Subjects')}
          >
            <Text style={[styles.tabText, activeTab === 'Subjects' && styles.activeTabText]}>Subjects</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Resources' && styles.activeTab]}
            onPress={() => setActiveTab('Resources')}
          >
            <Text style={[styles.tabText, activeTab === 'Resources' && styles.activeTabText]}>Resources</Text>
          </TouchableOpacity>
        </View>

        {/* Info Banner */}
        {showBanner && (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              Completion % depends on lecture and DPP progress!
            </Text>
            <TouchableOpacity onPress={() => setShowBanner(false)}>
              <X size={16} color="#854d0e" />
            </TouchableOpacity>
          </View>
        )}

        {/* List */}
        <FlatList
          data={SUBJECTS}
          renderItem={renderSubject}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fefce8',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fef08a',
    marginBottom: 16,
  },
  bannerText: {
    flex: 1,
    fontSize: 12,
    color: '#854d0e',
    fontWeight: '500',
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  abbrContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  abbrText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 4,
  },
  progressBarBg: {
    width: 60,
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
});
