/**
 * Separator component
 * @param text - optional text to display in the middle of the separator
 * @param className - optional class name
 * @param borderColor - optional border color
 *
 * @example
 * <Separator text="or SSO" />
 * <Separator text="or SSO" className="px-10 py-5" />
 *
 * @returns React.ReactNode
 */

import { View } from 'react-native';
import { Text, textVariants } from '@/components/core/text';
import { cn } from '@/lib/cn';

const Separator = ({
  text,
  textVariant = 'caption2' as keyof typeof textVariants,
  className,
  borderTailwindClass,
  borderColor,
}: {
  text?: string;
  textVariant?: keyof typeof textVariants;
  className?: string;
  borderTailwindClass?: string;
  borderColor?: string;
}) => {
  return (
    <View className={cn('flex flex-row items-center', className)}>
      <View
        className={cn(
          'flex-1 border-t',
          borderTailwindClass ? `${borderTailwindClass}` : 'border-border'
        )}
        style={{ borderColor: borderColor }}
      />
      {text && (
        <Text variant={textVariant} className="mx-2">
          {text}
        </Text>
      )}
      <View
        className={cn(
          'flex-1 border-t',
          borderTailwindClass ? `${borderTailwindClass}` : 'border-border'
        )}
        style={{ borderColor: borderColor }}
      />
    </View>
  );
};

export { Separator };
