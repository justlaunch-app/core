import { useColorScheme } from 'nativewind';

/** Components */
import { View } from 'react-native';
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

      <View className="pt-10 flex flex-col gap-3">
        <Link href="/avatar">
          <Text className="text-blue-500">Avatar</Text>
        </Link>

        <Link href="/bottom-sheet">
          <Text className="text-blue-500">Bottom Sheet</Text>
        </Link>

        <Link href="/sso">
          <Text className="text-blue-500">SSO Button</Text>
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
      </View>
    </SafeAreaView>
  );
}
