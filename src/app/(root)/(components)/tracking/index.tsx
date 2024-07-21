import { View, Button } from 'react-native';

import { Text } from '@/components/core/text';
import { useTrackingTransparency } from '@/hooks/permissions/tracking-transparency';

export default function TrackingTransparencyExample() {
  const status = useTrackingTransparency({
    onGranted: () => {
      console.log('Tracking permission granted');
    },
    onDenied: () => {
      console.log('Tracking permission denied');
    },
    onUndetermined: () => {
      console.log('Tracking permission undetermined');
    },
  });

  const handleCheckPermission = async () => {
    // The hook will handle the permission status update
    console.log('Current tracking permission status:', status);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-10">Tracking Permission Status: {status}</Text>
      <Button title="Check Tracking Permission" onPress={handleCheckPermission} />
    </View>
  );
}
