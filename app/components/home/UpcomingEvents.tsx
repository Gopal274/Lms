import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CalendarDays } from 'lucide-react-native';

interface UpcomingEventsProps {
  events?: any[];
  onSchedulePress?: () => void;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  events = [], 
  onSchedulePress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Events</Text>
        <TouchableOpacity onPress={onSchedulePress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {events.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyContent}>
            <View style={styles.iconCircle}>
              <CalendarDays size={32} color="#94a3b8" />
            </View>
            <Text style={styles.emptyTitle}>No events scheduled</Text>
            <Text style={styles.emptySubtitle}>Your upcoming classes and tests will appear here.</Text>
            
            <TouchableOpacity 
              style={styles.scheduleButton} 
              onPress={onSchedulePress}
              activeOpacity={0.8}
            >
              <Text style={styles.scheduleButtonText}>Weekly Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          {/* Real events would be rendered here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  emptyContent: {
    alignItems: 'center',
    textAlign: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scheduleButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  scheduleButtonText: {
    color: '#1e3a8a',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default UpcomingEvents;
