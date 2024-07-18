/**
 * Installation: npx expo install expo-av
 * 
 * This is an example of a video background in Expo. The video is muted and set to loop. The video is played in the background and the content is displayed on top of it.
 * 1. For full screen video, you need to remove the header for the screen. You can do it by adding headerShown: false to the Stack Screen.
 * 2. You need to change metro config to use mp4 format. You can do this by adding the following code to the metro.config.js file or check out the metro config for this repository.
    - resolver: assetExts
    - assetExts: [...assetExts, 'mp4'], 
*/

import * as React from 'react';
import { View } from 'react-native';
import { Video, ResizeMode, VideoProps } from 'expo-av';

import { cn } from '@/lib/cn';

const BackgroundVideo = ({
  src,
  rate = 1.0,
  volume = 0,
  isMuted = true,
  resizeMode = 'cover' as ResizeMode,
  shouldPlay = true,
  isLooping = true,
  children,
  contentClassName = '',
}: {
  src: VideoProps['source'];
  rate?: number;
  volume?: number;
  isMuted?: boolean;
  resizeMode?: ResizeMode;
  shouldPlay?: boolean;
  isLooping?: boolean;
  children?: React.ReactNode;
  contentClassName?: string;
}) => {
  const video = React.useRef<Video>(null);

  return (
    <>
      <Video
        ref={video}
        source={src}
        rate={rate}
        volume={volume}
        isMuted={isMuted}
        resizeMode={resizeMode}
        shouldPlay={shouldPlay}
        isLooping={isLooping}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      {children && (
        <View className={cn('flex-1 w-full items-center justify-center', contentClassName)}>
          {children}
        </View>
      )}
    </>
  );
};

export { BackgroundVideo };
