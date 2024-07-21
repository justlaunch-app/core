import React from 'react';
import { Button } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

type ActionSheetMenuProps = {
  buttonTitle?: string;
  options: string[];
  cancelButtonIndex: number;
  destructiveButtonIndex: number;
  onOptionSelect: (selectedIndex: number) => void;
};

const ActionSheetMenu: React.FC<ActionSheetMenuProps> = ({
  buttonTitle = 'Menu',
  options,
  cancelButtonIndex,
  destructiveButtonIndex,
  onOptionSelect,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number = cancelButtonIndex) => {
        return onOptionSelect(selectedIndex);
      }
    );
  };

  return <Button title={buttonTitle} onPress={onPress} />;
};

export { ActionSheetMenu };
