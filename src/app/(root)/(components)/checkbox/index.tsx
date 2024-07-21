// components/MyForm.tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/core/checkbox';

interface FormData {
  agreeTerms: boolean;
}
export default function CheckBoxExample() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      agreeTerms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <View className="p-4">
      <Checkbox
        className="bg-red-500"
        control={control}
        name="agreeTerms"
        label="I agree to the terms and conditions"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
