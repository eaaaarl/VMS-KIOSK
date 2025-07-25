import React from 'react';
import { Text, TextInput, View } from 'react-native';

type Props = {
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

export default function VisitorRegistrationForm({
  formData,
  errors,
  handleInputChange,
  handleBlur,
}: Props) {
  return (
    <View className="gap-6">
      {/* First Row - Last Name and First Name */}
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Text className="mb-2 text-base font-semibold text-gray-700">
            Last Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className={`rounded-lg border bg-gray-50 px-4 py-4 text-lg uppercase ${errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
            placeholder="Last Name"
            placeholderTextColor="gray"
            value={formData.lastName}
            onChangeText={value => handleInputChange('lastName', value)}
            onBlur={() => handleBlur('lastName')}
          />
          {errors.lastName && <Text className="mt-1 text-sm text-red-500">{errors.lastName}</Text>}
        </View>

        <View className="flex-1">
          <Text className="mb-2 text-base font-semibold text-gray-700">
            First Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className={`rounded-lg border bg-gray-50 px-4 py-4 text-lg uppercase ${errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
            placeholder="First Name"
            placeholderTextColor="gray"
            value={formData.firstName}
            onChangeText={value => handleInputChange('firstName', value)}
            onBlur={() => handleBlur('firstName')}
          />
          {errors.firstName && (
            <Text className="mt-1 text-sm text-red-500">{errors.firstName}</Text>
          )}
        </View>
      </View>

      {/* Second Row - Middle Name */}
      <View>
        <Text className="mb-2 text-base font-semibold text-gray-700">
          Middle Name <Text className="text-gray-400">(optional)</Text>
        </Text>
        <TextInput
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 text-lg uppercase"
          placeholder="Middle Name"
          placeholderTextColor="gray"
          value={formData.middleName}
          onChangeText={value => handleInputChange('middleName', value)}
        />
      </View>

      {/* Third Row - Mobile Number */}
      <View>
        <Text className="mb-2 text-base font-semibold text-gray-700">
          Mobile Number <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          className={`rounded-lg border bg-gray-50 px-4 py-4 text-lg ${errors.mobileNumber ? 'border-red-500' : 'border-gray-200'}`}
          placeholder="Mobile Number"
          placeholderTextColor="gray"
          value={formData.mobileNumber}
          onChangeText={value => handleInputChange('mobileNumber', value)}
          onBlur={() => handleBlur('mobileNumber')}
          keyboardType="phone-pad"
        />
        {errors.mobileNumber ? (
          <Text className="mt-1 text-sm text-red-500">{errors.mobileNumber}</Text>
        ) : (
          <Text className="mt-1 text-sm text-gray-500">
            (Ex. 639123456789, 09123456789, +639123456789)
          </Text>
        )}
      </View>
    </View>
  );
}
