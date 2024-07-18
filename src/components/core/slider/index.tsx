import RNSlider from '@react-native-community/slider';
import { Platform } from 'react-native';

import { useColorScheme } from 'nativewind';
import { NAV_THEME, COLORS } from '@/theme';

function Slider({
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNSlider>) {
  const { colorScheme } = useColorScheme();
  return (
    <RNSlider
      thumbTintColor={thumbTintColor ?? Platform.OS === 'ios' ? COLORS.white : NAV_THEME[colorScheme].colors.primary}
      minimumTrackTintColor={minimumTrackTintColor ?? NAV_THEME[colorScheme].colors.primary}
      maximumTrackTintColor={
        maximumTrackTintColor ?? Platform.OS === 'android' ? NAV_THEME[colorScheme].colors.primary : undefined
      }
      {...props}
    />
  );
}

export { Slider };
