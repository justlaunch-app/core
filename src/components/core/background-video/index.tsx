import * as React from 'react';
import { View } from 'react-native';
import { Video, ResizeMode, VideoProps } from 'expo-av';

import { cn } from '@/lib/cn';

const BackgroundVideo = ({
  videoSource,
  rate = 1.0,
  volume = 0,
  isMuted = true,
  resizeMode = 'cover' as ResizeMode,
  shouldPlay = true,
  isLooping = true,
  children,
  videoClassName = '',
  contentClassName = '',
}: {
  videoSource: VideoProps['source'];
  rate?: number;
  volume?: number;
  isMuted?: boolean;
  resizeMode?: ResizeMode;
  shouldPlay?: boolean;
  isLooping?: boolean;
  children?: React.ReactNode;
  videoClassName?: string;
  contentClassName?: string;
}) => {
  const video = React.useRef(null);

  return (
    <>
      <Video
        ref={video}
        source={videoSource}
        rate={rate}
        volume={volume}
        isMuted={isMuted}
        resizeMode={resizeMode}
        shouldPlay={shouldPlay}
        isLooping={isLooping}
        className={cn('absolute top-0 bottom-0 left-0 right-0', { videoClassName })}
      />
      {children && (
        <View className={cn('flex-1 w-full justify-center', { contentClassName })}>{children}</View>
      )}
    </>
  );
};

export { BackgroundVideo };
