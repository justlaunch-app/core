import MapView, { MapViewProps } from 'react-native-maps';
import { View, ViewStyle, StyleProp } from 'react-native';
import { cn } from '@/lib/cn';

/** Components **/
import { CustomMarker, NativeMarker as Marker } from './marker';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MarkerProps {
  coordinate: Coordinate;
  title?: string;
  description?: string;
  onPress?: () => void;
  imgSrc?: string;
  iconName?: string;
}

interface MapProps {
  containerClasses?: string;
  mapStyle?: StyleProp<ViewStyle>;
  mapProps?: MapViewProps;
  isCustomMarker?: boolean;
  markers?: MarkerProps[];
}

const Map = ({
  containerClasses,
  mapStyle,
  mapProps,
  isCustomMarker = false,
  markers = [],
}: MapProps) => {
  const initialRegion = {
    latitude: 48.2082,
    longitude: 16.3738,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  };

  return (
    <View className={cn('flex-1', containerClasses)}>
      <MapView
        onMapLoaded={() => console.log('Map loaded')}
        initialRegion={initialRegion}
        style={[{ width: '100%', height: '100%' }, mapStyle]}
        {...mapProps}
      >
        {markers.map((marker, index) =>
          isCustomMarker ? (
            <CustomMarker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={marker.onPress}
              imgSrc={marker.imgSrc}
              iconName={marker.iconName}
            />
          ) : (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={marker.onPress}
            />
          )
        )}
      </MapView>
    </View>
  );
};

export { Map, MarkerProps, MapProps };
