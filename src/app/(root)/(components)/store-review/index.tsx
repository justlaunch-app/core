import { View } from 'react-native';

import { TouchableOpacity } from '@/components/core/button';
import { Text } from '@/components/core/text';
import { useStoreReviewRequest, useStoreReviewRequestOnPress } from '@/hooks/store-review';

export default function StoreReviewExample() {
  /** simply call it on a page */
  useStoreReviewRequest({ delay: 500 });

  /** use it on a button with onpress func */
  const triggerStoreReviewRequest = useStoreReviewRequestOnPress();

  return (
    <View className="mt-10">
      <Text variant="title2" className="text-center">
        Store Review Request will be triggered after 500
      </Text>

      <TouchableOpacity onPress={triggerStoreReviewRequest} className="mt-4">
        <Text className="text-center text-blue-500">Trigger Store Review Request</Text>
      </TouchableOpacity>
    </View>
  );
}
