import React from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { TouchableOpacity } from '@/components/core/button';
import { Text, textVariants } from '@/components/core/text';

const ActionSheetMenu = ({
  buttonTitle = 'Action Sheet',
  options,
  cancelButtonIndex,
  destructiveButtonIndex,
  onOptionSelect,
  className,
  buttonClassName,
  textVariant = 'heading' as keyof typeof textVariants,
}: {
  buttonTitle?: string;
  options: string[];
  cancelButtonIndex: number;
  destructiveButtonIndex: number;
  onOptionSelect: (selectedIndex: number) => void;
  className?: string;
  buttonClassName?: string;
  textVariant?: keyof typeof textVariants;
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

  return (
    <TouchableOpacity className={className} onPress={onPress}>
      <Text variant={textVariant} className={buttonClassName}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export { ActionSheetMenu };
