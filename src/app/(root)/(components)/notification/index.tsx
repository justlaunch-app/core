import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNotifications } from '@/hooks/permissions/notification';

export default function NotificationExample() {
  const { expoPushToken, notification, checkNotificationStatus, scheduleNotification } =
    useNotifications();

  const handleScheduleNotification = async () => {
    const status = await checkNotificationStatus();
    console.log('Notification status:', status);
    if (status) {
      await scheduleNotification(
        {
          title: 'Scheduled Notification',
          body: 'This is a test notification',
        },
        { seconds: 5 }
      );
    } else {
      alert('Notifications are not enabled!');
    }
  };

  return (
    <View>
      <Text>Expo Push Token: {expoPushToken}</Text>
      {notification && <Text>New Notification: {notification.request.content.body}</Text>}
      <Button title="Schedule Notification" onPress={handleScheduleNotification} />
    </View>
  );
}
