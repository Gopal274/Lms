import { Stack } from 'expo-router';

export default function AllClassesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#1e3a8a',
        },
        headerTintColor: '#1e3a8a',
        headerBackTitleVisible: false,
      }}
    />
  );
}
