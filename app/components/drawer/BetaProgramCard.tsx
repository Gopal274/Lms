import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Beaker } from 'lucide-react-native';

interface BetaProgramCardProps {
  onPress?: () => void;
}

const BetaProgramCard: React.FC<BetaProgramCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Beaker color="#1e3a8a" size={24} strokeWidth={2.5} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Join Beta Program</Text>
        <Text style={styles.subtitle}>Test new features before anyone else</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eff6ff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
});

export default BetaProgramCard;
