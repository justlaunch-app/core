import * as Device from 'expo-device';

const useDeviceInfo = () => {
  return {
    deviceBrand: Device.brand,
    deviceModel: Device.modelName,
    deviceOS: Device.osName,
    deviceOSVersion: Device.osVersion,
    deviceType: Device.deviceType,
    deviceYearClass: Device.deviceYearClass,
    deviceTotalMemory: Device.totalMemory,
    deviceSupportedCpuArchitectures: Device.supportedCpuArchitectures,
    deviceIsDevice: Device.isDevice,
    deviceName: Device.deviceName,
  };
};

export { useDeviceInfo };
