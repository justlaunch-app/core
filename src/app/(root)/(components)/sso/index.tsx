import { useColorScheme } from 'nativewind';

/** Components */
import { View } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/core/text';
import { SafeAreaView } from '@/components/core/safe-area-view';

export default function SSO() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView>
      <View className="flex items-center justify-between">
        <Text variant="largeTitle" color="primary">
          SSO
        </Text>
        <Text variant="footnote" color="quarternary" className="text-lg">
          Current theme is {colorScheme}
        </Text>
      </View>

      <View className="pt-10">
        <Link href="/sso">
          <Text className="text-blue-500">SSO-buttons</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
