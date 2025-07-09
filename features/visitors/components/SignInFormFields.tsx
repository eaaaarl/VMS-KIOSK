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
  const selectedOffice = availableOffices.find((office) => office.id === formData.officeToVisitId);

  return (
    <View className="gap-6">
      {/* Visitor Name with Modal */}
      <View className="relative z-40">
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Visitor&apos;s Name <Text className="text-red-500">*</Text>
        </Text>
        <TouchableOpacity
          onPress={onVisitorNamePress}
          className="bg-white border border-blue-300 rounded-lg px-4 py-4 text-lg"
        >
          <Text className={`text-lg ${formData.visitorName ? 'text-gray-900' : 'text-gray-400'}`}>
            {formData.visitorName || 'Search visitor'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mobile Number */}
      <View>
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Mobile Number
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-lg"
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
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Office to visit <Text className="text-red-500">*</Text>
        </Text>
        <TouchableOpacity
          onPress={onOfficePress}
          className="bg-white border border-gray-200 rounded-lg px-4 py-4 flex-row justify-between items-center"
        >
          <Text className={`text-lg ${formData.officeToVisitId ? 'text-gray-900' : 'text-gray-400'}`}>
            {formData.officeToVisitId ? selectedOffice?.name : 'Select office'}
          </Text>
          <View className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
        </TouchableOpacity>
      </View>

      {/* Reason for Visit with Modal */}
      <View className="relative z-20">
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Reason for visit <Text className="text-red-500">*</Text>
        </Text>
        <TouchableOpacity
          onPress={onServicePress}
          className="bg-white border border-gray-200 rounded-lg px-4 py-4 flex-row justify-between items-center"
        >
          <Text className={`text-lg ${formData.reasonForVisit ? 'text-gray-900' : 'text-gray-400'}`}>
            {formData.reasonForVisit || 'Select reason'}
          </Text>
          <View className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500" />
        </TouchableOpacity>

        {formData.reasonForVisit === 'Other' && (
          <View className="mt-4">
            <Text className="text-base font-semibold text-gray-700 mb-2">
              Please specify <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-4 text-lg"
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