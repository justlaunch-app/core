/**
 * DateTimePicker is inspired by NativewindUI and react-native-community/datetimepicker
 */

import * as React from 'react';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Pressable, View, Platform } from 'react-native';

/** Components */
import { Text } from '@/components/core/text';

const DatePickerIOS = (
  props: React.ComponentProps<typeof DateTimePicker> & {
    mode: 'date' | 'time' | 'datetime';
  }
) => {
  return <DateTimePicker {...props} />;
};

const DatePickerAndroid = (
  props: React.ComponentProps<typeof DateTimePicker> & {
    mode: 'date' | 'time' | 'datetime';
  }
) => {
  const show = React.useCallback(
    (currentMode: 'time' | 'date') => () => {
      DateTimePickerAndroid.open({
        value: props.value,
        onChange: props.onChange,
        mode: currentMode,
        minimumDate: props.minimumDate,
        maximumDate: props.maximumDate,
      });
    },
    [props.value, props.onChange, props.minimumDate, props.maximumDate]
  );

  return (
    <View className="flex-row gap-2.5">
      {props.mode.includes('date') && (
        <View className="relative pt-1.5">
          <Pressable
            onPress={show('date')}
            className="rounded-md border border-border px-5 py-3 active:opacity-80"
          >
            <Text variant="subhead">
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
              }).format(props.value)}
            </Text>
          </Pressable>
          <View className="absolute left-2 top-0 bg-card px-1">
            <Text variant="caption2" className="text-[10px] opacity-60">
              Date
            </Text>
          </View>
        </View>
      )}
      {props.mode.includes('time') && (
        <View className="relative pt-1.5">
          <Pressable
            onPress={show('time')}
            className="rounded-md border border-border px-5 py-3 active:opacity-80"
          >
            <Text variant="subhead">
              {new Intl.DateTimeFormat('en-US', {
                timeStyle: 'short',
              }).format(props.value)}
            </Text>
          </Pressable>
          <View className="absolute left-2 top-0 bg-card px-1">
            <Text variant="caption2" className="text-[10px] opacity-60">
              Time
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const DatePicker = Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid;

export { DatePicker };
