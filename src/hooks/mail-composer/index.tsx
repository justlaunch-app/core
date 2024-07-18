import * as React from 'react';
import * as MailComposer from 'expo-mail-composer';

interface SendMailOptions {
  recipients?: string[];
  subject?: string;
  body?: string;
  attachments?: string[];
}

interface UseMailComposerReturn {
  sendMail: (options: SendMailOptions) => Promise<void>;
  isAvailable: boolean | null;
  status: MailComposer.MailComposerStatus | null;
  checkAvailability: () => Promise<void>;
}

const useMailComposer = (): UseMailComposerReturn => {
  const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);
  const [status, setStatus] = React.useState<MailComposer.MailComposerStatus | null>(null);

  const checkAvailability = async () => {
    const availability = await MailComposer.isAvailableAsync();
    setIsAvailable(availability);
  };

  const sendMail = async (options: SendMailOptions) => {
    if (isAvailable === null) {
      await checkAvailability();
    }

    if (isAvailable) {
      const result = await MailComposer.composeAsync(options);
      setStatus(result.status);
    } else {
      console.log('Mail composer is not available on this device');
    }
  };

  return { sendMail, isAvailable, status, checkAvailability };
};

export { useMailComposer };
