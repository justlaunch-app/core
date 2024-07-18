import { StyleSheet, StyleProp, TextStyle, DimensionValue } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { cn } from '@/lib/cn';
import { useColorScheme } from 'nativewind';
import { NAV_THEME } from '@/theme';

/** Components */
import { Text, textVariants } from '@/components/core/text';

const CustomPicker = ({
  label,
  selectedValue,
  onValueChange,
  items,
  labelClassName,
  labelVariant = 'heading' as keyof typeof textVariants,
  style,
}: {
  label?: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  items: { label: string; value: string }[];
  className?: string;
  labelClassName?: string;
  labelVariant?: keyof typeof textVariants;
  style?: StyleProp<TextStyle>;
}) => {
  const { colorScheme } = useColorScheme();
  const color = NAV_THEME[colorScheme].colors.primary;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    !items.every((item) => typeof item === 'object' && 'label' in item && 'value' in item)
  ) {
    console.error('Items must be an array of objects with a label and value key!');
    return null;
  }

  const combinedStyle = StyleSheet.flatten([
    {
      width: '100%' as DimensionValue | undefined,
      marginTop: -20,
    },
    style,
  ]);

  return (
    <>
      {label && (
        <Text variant={labelVariant} className={cn('mb-2', labelClassName)}>
          {label}
        </Text>
      )}

      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={combinedStyle}
      >
        {items.map((item) => (
          <Picker.Item {...item} color={color} key={item.value} />
        ))}
      </Picker>
    </>
  );
};

export { CustomPicker as Picker };
