import * as React from 'react';
import { View } from 'react-native';

import { Slider } from '@/components/core/slider';

export default function SliderExample() {
  const [sliderValue, setSliderValue] = React.useState(0.5);
  return (
    <View className="mt-10">
      <Slider value={sliderValue} onValueChange={setSliderValue} />
    </View>
  );
}
