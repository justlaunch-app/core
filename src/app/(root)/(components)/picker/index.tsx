import { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@/components/core/picker';

export default function PickerExample() {
  const [selectedValue, setSelectedValue] = useState<string>('java');

  const programmingLanguages = [
    { label: 'Java', value: 'java' },
    { label: 'JavaScript', value: 'js' },
    { label: 'Python', value: 'py' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Swift', value: 'swift' },
  ];

  return (
    <View className="flex items-center mt-10">
      <Picker
        label="Select a programming language"
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        items={programmingLanguages}
      />
    </View>
  );
}
