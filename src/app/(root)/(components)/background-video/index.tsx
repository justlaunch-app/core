import { View } from 'react-native';
import { BackgroundVideo } from '@/components/core/background';
import { Text } from '@/components/core/text';

export default function BackgroundVideoExample() {
  return (
    <View className="flex-1 items-center justify-center relative">
      <BackgroundVideo src={require('../../../../../public/video.mp4')}>
        <Text>Lorem</Text>
      </BackgroundVideo>
    </View>
  );
}
