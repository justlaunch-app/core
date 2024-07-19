/**
 *
 * Map Component
 *
 * You can pass a custom marker with an image or icon to the map.
 *
 */

import { Map, MarkerProps, MapProps } from '@/components/core/map';

export default function MapExample() {
  return (<Map isCustomMarker markers={markers} />) as MapProps;
}

const markers = [
  {
    coordinate: { latitude: 37.78825, longitude: -122.4324 },
    title: 'Marker 1',
    description: 'This is marker 1',
    onPress: () => console.log('Marker 1 pressed'),
  },
  {
    coordinate: { latitude: 37.78825, longitude: -121.4324 },
    title: 'Marker 2',
    description: 'This is marker 2',
  },
  {
    coordinate: { latitude: 48.2082, longitude: 16.3738 },
    title: 'Vienna Marker 1',
    description: 'This is Vienna marker 1',
    onPress: () => console.log('Marker 1 pressed'),
  },
  {
    coordinate: { latitude: 48.21, longitude: 16.37 },
    title: 'Vienna Marker 2',
    description: 'This is Vienna marker 2',
  },
  {
    coordinate: { latitude: 48.22, longitude: 16.38 },
    title: 'Vienna Marker 3',
    description: 'This is Vienna marker 3',
  },
  {
    coordinate: { latitude: 48.23, longitude: 16.39 },
    title: 'Vienna Marker 4',
    description: 'This is Vienna marker 4',
  },
  {
    coordinate: { latitude: 48.24, longitude: 16.4 },
    title: 'Vienna Marker 5',
    description: 'This is Vienna marker 5',
  },
] as MarkerProps[];
