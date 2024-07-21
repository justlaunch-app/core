import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const useNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
    const [notification, setNotification] = useState<Notifications.Notification | null>(null);
    const notificationListener = useRef<Notifications.Subscription | null>(null);
    const responseListener = useRef<Notifications.Subscription | null>(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    const registerForPushNotificationsAsync = async (): Promise<string | null> => {
        try {
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return null;
            }

            const token = (await Notifications.getExpoPushTokenAsync()).data;
            return token;
        } catch (error) {
            console.error('Error during push notification registration:', error);
            return null;
        }
    };

    const checkNotificationStatus = async () => {
        const settings = await Notifications.getPermissionsAsync();
        return settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
    };

    const scheduleNotification = async (content: Notifications.NotificationContentInput, trigger: Notifications.NotificationTriggerInput) => {
        await Notifications.scheduleNotificationAsync({
            content,
            trigger,
        });
    };

    return { expoPushToken, notification, checkNotificationStatus, scheduleNotification };
};
