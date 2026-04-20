import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, MoreVertical } from 'lucide-react-native';

interface HeroBatchSectionProps {
  batchName: string;
  onPress?: () => void;
  onMenuPress?: () => void;
}

const HeroBatchSection: React.FC<HeroBatchSectionProps> = ({ 
  batchName, 
  onPress, 
  onMenuPress 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={onPress} 
        activeOpacity={0.8}
      >
        <View style={styles.infoSection}>
          <Text style={styles.label}>YOUR BATCH</Text>
          <View style={styles.nameRow}>
            <Text style={styles.batchName} numberOfLines={1}>{batchName}</Text>
            <ChevronDown size={20} color="#64748b" style={styles.chevron} />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={onMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MoreVertical size={20} color="#64748b" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  infoSection: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batchName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e3a8a',
    maxWidth: '85%',
  },
  chevron: {
    marginLeft: 4,
  },
  menuButton: {
    padding: 4,
  },
});

export default HeroBatchSection;
