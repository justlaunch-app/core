import { View } from 'react-native';
import { Separator } from '@/components/core/separator';
import { useColorScheme } from 'nativewind';
import { NAV_THEME } from '@/theme';

export default function SeparatorExample() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="items-center mt-10">
      <Separator borderColor={NAV_THEME[colorScheme].colors.border} text="or SSO" />
    </View>
  );
}
