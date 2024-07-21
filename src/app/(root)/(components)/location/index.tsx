import { View } from 'react-native';

import { Text } from '@/components/core/text';
import { useLocation } from '@/hooks/permissions/location';

export default function LocationPermissionExample() {
  const { location, error } = useLocation();

  let text = 'Waiting..';
  if (error) {
    text = error;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text selectable variant="title2">
        {text}
      </Text>
    </View>
  );
}
