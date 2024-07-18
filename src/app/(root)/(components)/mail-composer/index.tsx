/**
 * This is not working on Expo Go.
 * In order to make it work, you need to ensure some extra steps.
 *
 * Here are the steps to follow:
 *
 * 1. Download the mail app if you don't have it installed from the App Store.
 *    - You can find it by searching for "Mail" in the App Store.
 *
 * 2. Log in using your favorite mail provider.
 *    - For example, if you use Gmail, enter your Gmail credentials.
 *    - Note: If you have two-factor authentication enabled, you may need to try logging in multiple times.
 *
 * 3. Open the mail composer in your app.
 *    - At this point, the fields may not be filled in properly.
 *
 * 4. Go to Settings -> Mail -> Accounts -> Gmail on your device.
 *
 * 5. Toggle the "Mail" button to enable it.
 *    - This step ensures that the mail app is fully set up and integrated with your device.
 *
 * After following these steps, the mail composer should work properly in Expo Go.
 */

import { useEffect } from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';

import { Text } from '@/components/core/text';
import { Button } from '@/components/core/button';
import { useMailComposer } from '@/hooks/mail-composer';

export default function MailComposerExample() {
  const { sendMail, isAvailable, status, checkAvailability } = useMailComposer();

  useEffect(() => {
    const checkAndLogAvailability = async () => {
      await checkAvailability();
    };

    checkAndLogAvailability();
  }, [checkAvailability]);

  const sendEmail = () => {
    sendMail({
      recipients: ['me@zoltanfodor.dev'],
      subject: 'Hello from Expo',
      body: 'This is a test email.',
      attachments: [],
    });
  };

  return (
    <View>
      <Button title="Send Email" onPress={sendEmail} disabled={!isAvailable} />
      {status && <Text>Email status: {status}</Text>}

      <Link className="mx-auto mt-12" href="https://github.com/expo/expo/issues/24613">
        <Text className="text-blue-500">https://github.com/expo/expo/issues/24613</Text>
      </Link>
    </View>
  );
}
