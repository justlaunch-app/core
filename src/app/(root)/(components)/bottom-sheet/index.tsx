import { View } from 'react-native';

import { Button } from '@/components/core/button';
import { Text } from '@/components/core/text';
import { BottomSheet, useSheetRef } from '@/components/core/bottom-sheet';

export default function BottomSheetExample() {
  const bottomSheetModalRef = useSheetRef();

  return (
    <View className="items-center mt-10">
      <Button title="Open Bottom Sheet" onPress={() => bottomSheetModalRef.current?.present()} />
      <BottomSheet ref={bottomSheetModalRef} snapPoints={[200]}>
        <View className="flex-1 items-center justify-center pb-8">
          <Text className="text-foreground">@gorhom/bottom-sheet 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
}
