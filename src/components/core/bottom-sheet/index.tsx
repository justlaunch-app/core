/**
 *
 * BottomSheet component
 * Inspired by NativewindUI
 * @see https://nativewindui.com/component/bottom-sheet
 *
 * and
 * @see https://github.com/gorhom/react-native-bottom-sheet
 * @see https://ui.gorhom.dev/components/bottom-sheet/
 */

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import * as React from 'react';
import { useColorScheme } from 'nativewind';
import { NAV_THEME, COLORS } from '@/theme';

const BottomSheet = React.forwardRef<
  BottomSheetModal,
  React.ComponentPropsWithoutRef<typeof BottomSheetModal>
>(({ backgroundStyle, style, handleIndicatorStyle, ...props }, ref) => {
  const { colorScheme } = useColorScheme();

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    []
  );
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      backgroundStyle={
        backgroundStyle ?? {
          backgroundColor: NAV_THEME[colorScheme].colors.card,
        }
      }
      style={
        style ?? {
          borderWidth: 1,
          borderColor: COLORS[colorScheme].grey5,
          borderTopStartRadius: 16,
          borderTopEndRadius: 16,
        }
      }
      handleIndicatorStyle={
        handleIndicatorStyle ?? {
          backgroundColor: COLORS[colorScheme].grey4,
        }
      }
      backdropComponent={renderBackdrop}
      {...props}
    />
  );
});

function useSheetRef() {
  return React.useRef<BottomSheetModal>(null);
}

export { BottomSheet, useSheetRef };
