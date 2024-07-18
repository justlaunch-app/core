import { SafeAreaView } from '@/components/core/safe-area-view';
import { Text } from '@/components/core/text';
import { useDeviceInfo } from '@/hooks/device-info';

export default function DeviceInfoExample() {
  const deviceInfo = useDeviceInfo();

  return (
    <SafeAreaView>
      <Text variant="title2">{deviceInfo.deviceName}</Text>
      <Text variant="title2">{deviceInfo.deviceBrand}</Text>
      <Text variant="title2">
        {deviceInfo.deviceOS} {deviceInfo.deviceOSVersion}
      </Text>
      <Text variant="title2">{deviceInfo.deviceSupportedCpuArchitectures}</Text>
      <Text variant="title2">{deviceInfo.deviceTotalMemory}</Text>
      <Text variant="title2">{deviceInfo.deviceType}</Text>
      <Text variant="title2">{deviceInfo.deviceYearClass}</Text>
    </SafeAreaView>
  );
}
