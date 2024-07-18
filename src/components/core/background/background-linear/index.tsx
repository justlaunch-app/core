/**
 * Installation: npx expo install expo-linear-gradient
 *
 * Simple example of using linear gradient background in Expo
 * If you would like to change the color - base color is on view (currently bg-red-400)
 * Adjust the contrast by changing the colors of the Linear Gradient
 * You can change the start, end and between colors to get the desired effect -> detailed documentation is available here:
 * https://docs.expo.dev/versions/latest/sdk/linear-gradient/#end
 */

import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LinearGradientBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300 }}
      />
      {children}
    </View>
  );
};

export { LinearGradientBackground };
