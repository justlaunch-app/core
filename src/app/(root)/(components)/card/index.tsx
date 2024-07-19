import { View } from 'react-native';

/** Components */
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/core/card';
import { Text } from '@/components/core/text';

export default function CardExample() {
  return (
    <View className="mt-10">
      <Card onPress={() => console.log('csiiiiiii')} className="bg-card h-auto w-[96%] mx-auto">
        <CardHeader>
          <CardTitle className="mx-auto">
            <Text>Card</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Text className="">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Nam temporibus odit facilis magnam dolor pariatur, iure
              rem quo, tenetur quidem, voluptatibus sed dolorum autem quisquam culpa reprehenderit
              veritatis repellendus ipsam!
            </Text>
          </CardDescription>
        </CardContent>
        <CardFooter className="mx-auto">
          <Text>Footer</Text>
        </CardFooter>
      </Card>
    </View>
  );
}
