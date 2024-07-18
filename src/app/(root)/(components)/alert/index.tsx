import { View } from 'react-native';

import { Text } from '@/components/core/text';
import { TouchableOpacity } from '@/components/core/button';
import { Alert } from '@/components/core/alert';

export default function AlertExample() {
  Alert.alert('Alert');

  const alertOnPress = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  return (
    <View className="mt-10">
      <Text variant="title2" className="mx-auto pb-10">
        This is an example of Alert
      </Text>

      <TouchableOpacity onPress={() => alertOnPress()} className="mt-4">
        <Text className="text-center text-blue-500">Show Alert</Text>
      </TouchableOpacity>
    </View>
  );
}
