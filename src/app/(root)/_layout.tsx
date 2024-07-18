import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/core/toggle';

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(index)"
        options={{ headerShown: false, headerRight: () => <ThemeToggle /> }}
      />
      <Stack.Screen name="(components)" options={{ headerRight: () => <ThemeToggle /> }} />
    </Stack>
  );
}
