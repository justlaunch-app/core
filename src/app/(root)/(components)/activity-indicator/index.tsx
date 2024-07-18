import { ActivityIndicator } from '@/components/core/activity-indicator';
import { useColorScheme } from 'nativewind';
import { NAV_THEME } from '@/theme';

export default function ActivityIndicatorExample() {
  const { colorScheme } = useColorScheme();
  return (
    <ActivityIndicator
      className="flex-1 items-center -mt-20"
      animating={true}
      size="large"
      color={NAV_THEME[colorScheme].colors.primary}
    />
  );
}
