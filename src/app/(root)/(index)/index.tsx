import { useColorScheme } from 'nativewind';

/** Components */
import { Text } from '@/components/core/text';
import { SafeAreaView } from '@/components/core/safe-area-view';
import { SSOButton } from '@/components/core/button';

export default function Index() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView>
      <Text variant="largeTitle" color="primary">
        Hello World
      </Text>
      <Text variant="title2" color="quarternary">
        This is a Sandbox test environment with Expo Go.
      </Text>

      <Text variant="title2" color="quarternary">
        Current theme is{' '}
        <Text variant="title2" color="secondary">
          {colorScheme}
        </Text>
        .
      </Text>

      <SSOButton socialMethod="microsoft" radius="none" iconFormat="round"></SSOButton>
      <SSOButton
        onPress={() => console.log('hola')}
        className="my-5"
        socialMethod="pinterest"
        radius="full"
        size="compact"
        iconFormat="round"
      ></SSOButton>
      <SSOButton socialMethod="pinterest" size="compact"></SSOButton>
      <SSOButton socialMethod="pinterest" iconFormat="plain" size="compact"></SSOButton>
    </SafeAreaView>
  );
}
