import React from 'react';
import { Marker } from 'react-native-maps';
import { View, Image } from 'react-native';

import { TouchableOpacity } from '@/components/core/button';
import { Icon, FontawesomeIconType } from '@/components/core/icon';
import { cn } from '@/lib/cn';

interface Coordinate {
  latitude: number;
  longitude: number;
}

const CustomMarker = ({
  coordinate,
  title,
  description,
  imgSrc,
  onPress,
  iconName = 'map-marker',
}: {
  coordinate: Coordinate;
  title?: string;
  description?: string;
  imgSrc?: string;
  onPress?: () => void;
  iconName?: React.ReactNode;
}) => {
  return (
    <Marker coordinate={coordinate} title={title} description={description}>
      <TouchableOpacity onPress={onPress} className={cn('items-center justify-center')}>
        <View className={cn('w-10 h-10')}>
          {imgSrc ? (
            <Image source={{ uri: imgSrc }} className={cn('w-full h-full')} />
          ) : (
            <Icon size={32} name={iconName as FontawesomeIconType} />
          )}
        </View>
      </TouchableOpacity>
    </Marker>
  );
};

const NativeMarker = ({
  coordinate,
  title,
  description,
  onPress,
}: {
  coordinate: Coordinate;
  title?: string;
  description?: string;
  onPress?: () => void;
}) => {
  return (
    <Marker onPress={onPress} coordinate={coordinate} title={title} description={description} />
  );
};

export { NativeMarker, CustomMarker };
