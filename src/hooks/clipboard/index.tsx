import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

export const useClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>('');

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedText(text);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return {
    copiedText,
    copyToClipboard,
    fetchCopiedText,
  };
};
