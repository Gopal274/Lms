import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BookOpen, FileText, HelpCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface ActionItem {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  onPress: () => void;
}

const QuickActions: React.FC = () => {
  const router = useRouter();
  const actions: ActionItem[] = [
    { 
      id: 'classes', 
      title: 'All Classes', 
      icon: BookOpen, 
      color: '#3b82f6', 
      onPress: () => router.push('/all-classes') 
    },
    { 
      id: 'tests', 
      title: 'All Tests', 
      icon: FileText, 
      color: '#8b5cf6', 
      onPress: () => console.log('All Tests') 
    },
    { 
      id: 'doubts', 
      title: 'My Doubts', 
      icon: HelpCircle, 
      color: '#f59e0b', 
      onPress: () => router.push('/doubts') 
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity 
          key={action.id} 
          style={styles.actionCard} 
          onPress={action.onPress}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: `${action.color}15` }]}>
            <action.icon size={24} color={action.color} />
          </View>
          <Text style={styles.actionTitle}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
  },
});

export default QuickActions;
