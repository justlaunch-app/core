import React from 'react';
import { Button, View, Text } from 'react-native';
import { useShare } from '@/hooks/share';

export default function ShareComponent() {
  const { isSharing, error, shareFile } = useShare();

  const handleShare = async () => {
    await shareFile({
      uri: 'https://pdfobject.com/pdf/sample.pdf',
      mimeType: 'application/pdf',
      dialogTitle: 'Share your PDF',
      UTI: 'com.adobe.pdf',
    });
  };

  return (
    <View>
      <Button onPress={handleShare} title="Share File" disabled={isSharing} />
      {isSharing && <Text>Sharing in progress...</Text>}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
}
