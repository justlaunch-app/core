// components/core/checkbox.tsx

import React from 'react';
import { View, ColorValue } from 'react-native';
import { Controller, Control, FieldValues, Path, PathValue } from 'react-hook-form';

/** Components */
import { Icon } from '@/components/core/icon';
import { Text, textVariants } from '@/components/core/text';
import { TouchableOpacity } from '@/components/core/button';
import { cn } from '@/lib/cn';

type CheckboxProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  labelVariant?: keyof typeof textVariants;
  labelClassName?: string;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  iconSize?: number;
  iconColor?: ColorValue;
  className?: string;
};

const Checkbox = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  labelVariant = 'heading' as keyof typeof textVariants,
  labelClassName,
  defaultValue = false as PathValue<TFieldValues, Path<TFieldValues>>,
  iconSize = 16,
  iconColor = 'white',
  className,
}: CheckboxProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <TouchableOpacity
          className={cn('flex-row items-center my-2', className)}
          onPress={() => onChange(!value)}
        >
          <View
            className={cn(
              'w-6 h-6 rounded border-2 flex items-center justify-center',
              value ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'
            )}
          >
            {value && <Icon name="check" size={iconSize} color={iconColor} />}
          </View>
          {label && (
            <Text variant={labelVariant} className={cn('ml-2 text-gray-700', labelClassName)}>
              {label}
            </Text>
          )}
        </TouchableOpacity>
      )}
    />
  );
};

export { Checkbox };
