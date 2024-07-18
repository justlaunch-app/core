import { View } from 'lucide-react-native';
import { TouchableOpacity } from '@/components/core/button';
import { Text } from '@/components/core/text';
import { useClipboard } from '@/hooks/clipboard';

export default function ClipboardComponent() {
  const { copiedText, copyToClipboard } = useClipboard();

  return (
    <>
      <TouchableOpacity
        onPress={() => copyToClipboard('Hello World')}
        className="w-full flex items-center justify-center mt-5 px-6 bg-card rounded-lg py-4"
      >
        <Text variant="title2">Copy to clipboard: Hello World</Text>
      </TouchableOpacity>
      <Text className="mt-10 text-center font-bold">{copiedText}</Text>
    </>
  );
}
