import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Office {
  id: number;
  name: string;
}

interface SignInFormFieldsProps {
  formData: {
    visitorName: string;
    mobileNumber: string;
    officeToVisitId: number;
    reasonForVisit: string;
    otherReason: string | null | undefined;
  };
  availableOffices: Office[];
  onVisitorNamePress: () => void;
  onMobileNumberChange: (value: string) => void;
  onOfficePress: () => void;
  onServicePress: () => void;
  onOtherReasonChange: (value: string) => void;
}

export const SignInFormFields: React.FC<SignInFormFieldsProps> = ({
  formData,
  availableOffices,
  onVisitorNamePress,
  onMobileNumberChange,
  onOfficePress,
  onServicePress,
  onOtherReasonChange,
}) => {
  const selectedOffice = availableOffices.find(office => office.id === formData.officeToVisitId);

  return (
    <View className="gap-6">
      {/* Visitor Name with Modal */}
      <View className="relative z-40">
        <Text className="mb-2 text-base font-semibold text-gray-700">
          Visitor&apos;s Name <Text className="text-red-500">*</Text>
        </Text>
        <TouchableOpacity
          onPress={onVisitorNamePress}
          className="rounded-lg border border-blue-300 bg-white px-4 py-4 text-lg"
        >
          <Text className={`text-lg ${formData.visitorName ? 'text-gray-900' : 'text-gray-400'}`}>
            {formData.visitorName || 'Search visitor'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mobile Number */}
      <View>
        <Text className="mb-2 text-base font-semibold text-gray-700">Mobile Number</Text>
        <TextInput
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 text-lg"
          placeholder="Mobile Number"
          placeholderTextColor="gray"
          value={formData.mobileNumber}
          onChangeText={onMobileNumberChange}
          keyboardType="phone-pad"
          returnKeyType="next"
        />
      </View>

      {/* Office to Visit with Modal */}
      <View className="relative z-30">
        <Text className="mb-2 text-base font-semibold text-gray-700">
          Office to visit <Text className="text-red-500">*</Text>
        </Text>
        <TouchableOpacity
          onPress={onOfficePress}
          className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-4"
        >
          <Text
            className={`text-lg ${formData.officeToVisitId ? 'text-gray-900' : 'text-gray-400'}`}
          >
            {formData.officeToVisitId ? selectedOffice?.name : 'Select office'}
          </Text>
          <View className="h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
        </TouchableOpacity>
      </View>

      {/* Reason for Visit with Modal */}
      <View className="relative z-20">
        <Text className="mb-2 text-base font-semibold text-gray-700">
          Reason for visit <Text className="text-red-500">*</Text>
        </Text>
        <TouchableOpacity
          onPress={onServicePress}
          className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-4"
        >
          <Text
            className={`text-lg ${formData.reasonForVisit ? 'text-gray-900' : 'text-gray-400'}`}
          >
            {formData.reasonForVisit || 'Select reason'}
          </Text>
          <View className="h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
        </TouchableOpacity>

        {formData.reasonForVisit === 'Other' && (
          <View className="mt-4">
            <Text className="mb-2 text-base font-semibold text-gray-700">
              Please specify <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="rounded-lg border border-gray-200 bg-white px-4 py-4 text-lg"
              placeholder="Please specify your reason"
              value={formData.otherReason ?? ''}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={onOtherReasonChange}
            />
          </View>
        )}
      </View>
    </View>
  );
};
