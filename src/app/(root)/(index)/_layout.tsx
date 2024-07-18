import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { TabBarIcon } from '@/components/core/icon';
import { ThemeToggle } from '@/components/core/toggle';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: iconColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <TabBarIcon name="code" pathnames={['/', '/feed']} />,
          headerRight: () => (
            <View className="mr-2">
              <ThemeToggle />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <TabBarIcon name="cog" pathnames={['/settings']} />,
        }}
      />
    </Tabs>
  );
}
