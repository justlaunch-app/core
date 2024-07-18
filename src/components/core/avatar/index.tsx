/**
 *
 * Nativewind Avatar component
 * @see https://nativewindui.com/component/avatar
 */

import * as React from 'react';
import {
  ImageErrorEventData,
  ImageLoadEventData,
  NativeSyntheticEvent,
  Image as RNImage,
  View,
} from 'react-native';
import { cn } from '@/lib/cn';

interface AvatarRootProps {
  alt: string;
}

interface AvatarImageProps {
  children?: React.ReactNode;
  onLoadingStatusChange?: (status: 'error' | 'loaded') => void;
}

type AvatarState = 'loading' | 'error' | 'loaded';

interface IRootContext extends AvatarRootProps {
  status: AvatarState;
  setStatus: (status: AvatarState) => void;
}

const RootContext = React.createContext<IRootContext | null>(null);

const useRootContext = (): IRootContext => {
  const context = React.useContext(RootContext);
  if (!context) {
    throw new Error('Avatar compound components cannot be rendered outside the Avatar component');
  }
  return context;
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & AvatarRootProps
>(({ alt, className, ...viewProps }, ref) => {
  const [status, setStatus] = React.useState<AvatarState>('error');

  return (
    <RootContext.Provider value={{ alt, status, setStatus }}>
      <View
        ref={ref}
        className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
        {...viewProps}
      />
    </RootContext.Provider>
  );
});

Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof RNImage>,
  Omit<React.ComponentPropsWithoutRef<typeof RNImage>, 'alt'> & AvatarImageProps
>(
  (
    { onLoad: onLoadProps, onError: onErrorProps, onLoadingStatusChange, className, ...props },
    ref
  ) => {
    const { alt, setStatus, status } = useRootContext();

    React.useLayoutEffect(() => {
      setStatus('loading');
    }, [setStatus]);

    const onLoad = React.useCallback(
      (e: NativeSyntheticEvent<ImageLoadEventData>) => {
        setStatus('loaded');
        onLoadingStatusChange?.('loaded');
        onLoadProps?.(e);
      },
      [onLoadProps, onLoadingStatusChange, setStatus]
    );

    const onError = React.useCallback(
      (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        setStatus('error');
        onLoadingStatusChange?.('error');
        onErrorProps?.(e);
      },
      [onErrorProps, onLoadingStatusChange, setStatus]
    );

    if (status === 'error') {
      return null;
    }

    return (
      <RNImage
        ref={ref}
        accessibilityLabel={alt}
        onLoad={onLoad}
        onError={onError}
        className={cn('aspect-square h-full w-full', className)}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => {
  const { alt, status } = useRootContext();

  if (status !== 'error') {
    return null;
  }

  return (
    <View
      ref={ref}
      role="img"
      aria-label={alt}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    />
  );
});

AvatarFallback.displayName = 'AvatarFallback';

const AvatarLoading = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(() => {
  const { status } = useRootContext();

  if (status !== 'loading') {
    return null;
  }

  return <AvatarFallback />;
});

AvatarLoading.displayName = 'AvatarLoading';

export { Avatar, AvatarFallback, AvatarImage, AvatarLoading };
