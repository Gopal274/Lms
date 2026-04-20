import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ShoppingBag, ChevronRight } from 'lucide-react-native';

interface MyPurchasesCardProps {
  onPress?: () => void;
}

const MyPurchasesCard: React.FC<MyPurchasesCardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconCircle}>
          <ShoppingBag color="#1e3a8a" size={20} strokeWidth={2.5} />
        </View>
        <Text style={styles.title}>My Purchases</Text>
      </View>
      <ChevronRight color="#94a3b8" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
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
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
  },
});

export default MyPurchasesCard;
