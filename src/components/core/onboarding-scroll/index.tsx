import React, { useState, useRef } from 'react';
import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Pressable } from 'react-native';

import { Text } from '@/components/core/text';
import { SCREEN_WIDTH } from '@/lib/device-size';

const Onboarding = ({ pages, onFinish }: { pages: React.ReactNode[]; onFinish: () => void }) => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPageIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActivePageIndex(newPageIndex);
  };

  const handleNextPress = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: SCREEN_WIDTH * (activePageIndex + 1),
        animated: true,
      });
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {pages.map((page, index) => (
          <View key={index} style={{ width: SCREEN_WIDTH }}>
            {page}
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={{
              height: 10,
              width: 10,
              marginHorizontal: 5,
              borderRadius: 5,
              backgroundColor: index === activePageIndex ? 'red' : 'gray',
            }}
          />
        ))}
      </View>
      <View style={{ padding: 20 }}>
        {activePageIndex < pages.length - 1 ? (
          <Pressable
            style={{ backgroundColor: 'red', padding: 15, borderRadius: 5 }}
            onPress={handleNextPress}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Next</Text>
          </Pressable>
        ) : (
          <Pressable
            style={{ backgroundColor: 'red', padding: 15, borderRadius: 5 }}
            onPress={onFinish}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Done</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

export { Onboarding };
