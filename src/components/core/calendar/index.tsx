import { Calendar as FlashCalendar, toDateId } from '@marceloterreiro/flash-calendar';
import { useState } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/core/text';

const today = toDateId(new Date());

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  return (
    <View>
      <Text>Selected date: {selectedDate}</Text>
      <FlashCalendar
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarMonthId={today}
        onCalendarDayPress={setSelectedDate}
      />
    </View>
  );
};

const CalendarList = () => {
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <View style={{ flex: 1 }}>
      <Text>Selected date: {selectedDate}</Text>
      <FlashCalendar.List
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarInitialMonthId={today}
        onCalendarDayPress={setSelectedDate}
      />
    </View>
  );
};

export { Calendar, CalendarList };
