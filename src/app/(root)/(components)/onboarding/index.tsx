import { View, Text } from 'react-native';

import { Onboarding } from '@/components/core/onboarding-scroll';

export default function OnboardingScreen() {
  const pages = [
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}
    >
      <Text>Page 1</Text>
    </View>,
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page 2</Text>
    </View>,
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page 3</Text>
    </View>,
  ];

  const handleFinish = () => {
    console.log('Onboarding complete');
    // Navigate to another screen or perform any action on finish
  };

  return <Onboarding pages={pages} onFinish={handleFinish} />;
}
