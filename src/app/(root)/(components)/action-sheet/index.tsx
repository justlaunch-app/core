import React from 'react';
import { View } from 'react-native';
import { ActionSheetMenu } from '@/components/core/action-sheet-menu';

export default function ActionSheetMenuExample() {
  const handleOptionSelect = (selectedIndex: number) => {
    switch (selectedIndex) {
      case 0:
        // Handle Delete
        console.log('Delete selected');
        break;
      case 1:
        // Handle Save
        console.log('Save selected');
        break;
      case 2:
        // Handle Cancel
        console.log('Cancel selected');
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <ActionSheetMenu
        options={['Option 1', 'Option 2', 'Option 3']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onOptionSelect={handleOptionSelect}
      />
    </View>
  );
}
