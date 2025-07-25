import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import VisitorRegistrationForm from './VisitorRegistrationForm';

type VisitorRegistrationFormContentProps = {
  formData: {
    lastName: string;
    firstName: string;
    middleName: string;
    mobileNumber: string;
  };
  errors: Record<string, string>;
  handleInputChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
};

export default function VisitorRegistrationFormContent({
  formData,
  errors,
  handleInputChange,
  handleBlur,
}: VisitorRegistrationFormContentProps) {
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-8 py-6">
          <Text className="mb-8 text-3xl font-bold text-gray-800">Visitors Registration</Text>
          <VisitorRegistrationForm
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleBlur={handleBlur}
          />
        </View>
      </ScrollView>
    </View>
  );
}
