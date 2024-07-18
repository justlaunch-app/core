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
        <Link href="/sso">
          <Text className="text-blue-500">SSO-buttons</Text>
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
      </View>
    </SafeAreaView>
  );
}
