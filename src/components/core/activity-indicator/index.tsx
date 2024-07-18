import * as React from 'react';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';

interface ActivityIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof RNActivityIndicator> {
  color: string;
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ color, ...props }) => {
  return <RNActivityIndicator color={color} {...props} />;
};

export { ActivityIndicator };
