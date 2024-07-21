import { useColorScheme } from 'nativewind';

/** Components */
import { View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/core/text';
import { SafeAreaView } from '@/components/core/safe-area-view';

export default function Index() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView>
      <View className="flex items-center justify-between">
        <Text variant="largeTitle" color="primary">
          Hello World
        </Text>
        <Text variant="footnote" color="quarternary" className="text-lg">
          Current theme is {colorScheme}
        </Text>
      </View>

      <ScrollView
        className="pt-10 flex flex-col gap-3"
        contentContainerStyle={{ flexGrow: 1, paddingTop: 10, paddingBottom: 100 }}
      >
        <Link href="/avatar">
          <Text className="text-blue-500">Avatar</Text>
        </Link>

        <Link href="/alert">
          <Text className="text-blue-500">Alert</Text>
        </Link>

        <Link href="/store-review">
          <Text className="text-blue-500">Store Review</Text>
        </Link>

        <Link href="/action-sheet">
          <Text className="text-blue-500">Action Sheet Menu</Text>
        </Link>

        <Link href="/bottom-sheet">
          <Text className="text-blue-500">Bottom Sheet</Text>
        </Link>

        <Link href="/calendar">
          <Text className="text-blue-500">Calendar</Text>
        </Link>

        <Link href="/sso">
          <Text className="text-blue-500">SSO Button</Text>
        </Link>

        <Link href="/map">
          <Text className="text-blue-500">Map</Text>
        </Link>

        <Link href="/card">
          <Text className="text-blue-500">Card</Text>
        </Link>

        <Link href="/background-video">
          <Text className="text-blue-500">Video Background</Text>
        </Link>

        <Link href="/linear-gradient">
          <Text className="text-blue-500">Linear Gradient Background</Text>
        </Link>

        <Link href="/clipboard">
          <Text className="text-blue-500">Clipboard</Text>
        </Link>

        <Link href="/mail-composer">
          <Text className="text-blue-500">Mail Composer</Text>
        </Link>

        <Link href="/activity-indicator">
          <Text className="text-blue-500">Activity Indicator</Text>
        </Link>

        <Link href="/date-picker">
          <Text className="text-blue-500">Date Picker</Text>
        </Link>

        <Link href="/separator">
          <Text className="text-blue-500">Separator</Text>
        </Link>

        <Link href="/device-info">
          <Text className="text-blue-500">Device Info</Text>
        </Link>

        <Link href="/picker">
          <Text className="text-blue-500">Picker</Text>
        </Link>

        <Link href="/slider">
          <Text className="text-blue-500">Slider</Text>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
