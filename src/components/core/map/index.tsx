import React, { useState, useEffect, useRef, useCallback } from 'react';
import MapView, { MapViewProps, Region } from 'react-native-maps';
import { View, ViewStyle, StyleProp } from 'react-native';
import supercluster from 'supercluster';
import { cn } from '@/lib/cn';
import { CustomMarker, NativeMarker, ClusterMarker } from './marker';

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

interface GeoJsonProperties extends MarkerProps {
  cluster: boolean;
  markerId: number;
  point_count?: number;
  point_count_abbreviated?: number;
}

interface GeoJsonFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: GeoJsonProperties;
}

type Cluster = GeoJsonFeature & {
  properties: GeoJsonProperties & { cluster: true; point_count: number };
};

const Map = ({
  containerClasses,
  mapStyle,
  mapProps,
  isCustomMarker = false,
  markers = [],
}: MapProps) => {
  const initialRegion: Region = {
    latitude: 48.2082,
    longitude: 16.3738,
    latitudeDelta: 0.035,
    longitudeDelta: 0.035,
  };

  const [clusters, setClusters] = useState<(GeoJsonFeature | Cluster)[]>([]);
  const [region, setRegion] = useState<Region>(initialRegion);
  const mapRef = useRef<MapView>(null);

  const getGeoJsonMarkers = useCallback((markers: MarkerProps[]) => {
    return markers.map((marker, index) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [marker.coordinate.longitude, marker.coordinate.latitude],
      },
      properties: {
        cluster: false,
        markerId: index,
        ...marker,
      },
    }));
  }, []);

  const clusterMarkers = useCallback(() => {
    const geoJsonMarkers = getGeoJsonMarkers(markers);
    const cluster = new supercluster<GeoJsonProperties>({
      radius: 40,
      maxZoom: 16,
    });
    cluster.load(geoJsonMarkers);

    const bbox = [
      region.longitude - region.longitudeDelta / 2,
      region.latitude - region.latitudeDelta / 2,
      region.longitude + region.longitudeDelta / 2,
      region.latitude + region.latitudeDelta / 2,
    ];

    const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    const clusters = cluster.getClusters(bbox as [number, number, number, number], zoom) as (
      | GeoJsonFeature
      | Cluster
    )[];
    setClusters(clusters);
  }, [getGeoJsonMarkers, markers, region]);

  useEffect(() => {
    clusterMarkers();
  }, [clusterMarkers]);

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    clusterMarkers();
  };

  return (
    <View className={cn('flex-1', containerClasses)}>
      <MapView
        ref={mapRef}
        onMapLoaded={() => console.log('Map loaded')}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChangeComplete}
        style={[{ width: '100%', height: '100%' }, mapStyle]}
        {...mapProps}
      >
        {clusters.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } = cluster.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                coordinate={{ latitude, longitude }}
                onPress={() => {
                  const region = {
                    latitude,
                    longitude,
                    latitudeDelta: initialRegion.latitudeDelta / 2,
                    longitudeDelta: initialRegion.longitudeDelta / 2,
                  };
                  mapRef.current?.animateToRegion(region, 500);
                }}
                key={`cluster-${index}`}
                pointCount={pointCount}
              />
            );
          }

          const markerProps = markers[cluster.properties.markerId];

          return isCustomMarker ? (
            <CustomMarker
              key={index}
              coordinate={markerProps.coordinate}
              title={markerProps.title}
              description={markerProps.description}
              onPress={markerProps.onPress}
              imgSrc={markerProps.imgSrc}
              iconName={markerProps.iconName}
            />
          ) : (
            <NativeMarker
              key={index}
              coordinate={markerProps.coordinate}
              title={markerProps.title}
              description={markerProps.description}
              onPress={markerProps.onPress}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export { Map, MarkerProps, MapProps };
