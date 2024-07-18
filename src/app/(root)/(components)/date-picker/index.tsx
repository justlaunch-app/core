import { useState } from 'react';
import { View } from 'react-native';
import { DatePicker } from '@/components/core/date-picker';

export default function DatePickerExample() {
  const [date, setDate] = useState(new Date());
  return (
    <View className="items-center mt-10">
      <DatePicker
        value={date}
        mode="datetime"
        onChange={(ev) => {
          setDate(new Date(ev.nativeEvent.timestamp));
        }}
      />
    </View>
  );
}
