import { Stack } from 'expo-router';

export default function ComponentsLayout() {
  return (
    <Stack>
      <Stack.Screen name="sso/index" options={{ headerShown: false }} />
    </Stack>
  );
}
