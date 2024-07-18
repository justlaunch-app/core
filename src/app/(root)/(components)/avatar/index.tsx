import { Text, View } from 'react-native';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/core/avatar';

export default function AvatarExample() {
  return (
    <View className="items-center">
      <Avatar alt="NativeWindUI Avatar">
        <AvatarImage
          source={{
            uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        />
        <AvatarFallback>
          <Text className="text-foreground">NUI</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
}
