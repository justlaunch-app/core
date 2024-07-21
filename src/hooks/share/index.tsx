import { useState } from 'react';
import * as Sharing from 'expo-sharing';

const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareFile = async ({
    uri,
    mimeType = 'text/plain',
    dialogTitle,
    UTI,
  }: {
    uri: string;
    mimeType?: string;
    dialogTitle?: string;
    UTI?: string;
  }) => {
    setIsSharing(true);
    setError(null);

    try {
      if (!(await Sharing.isAvailableAsync())) {
        setError('Sharing is not available on this device');
        setIsSharing(false);
        return;
      }

      await Sharing.shareAsync(uri, { mimeType, dialogTitle, UTI });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSharing(false);
    }
  };

  return { isSharing, error, shareFile };
};

export { useShare };
