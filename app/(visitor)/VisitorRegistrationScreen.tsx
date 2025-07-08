import { ICreateVisitorPayload } from '@/features/visitors/api/interface';
import { useCreateVisitorMutation } from '@/features/visitors/api/visitorApi';
import VisitorRegistrationForm from '@/features/visitors/components/VisitorRegistrationForm';
import { useVisitorRegistrationForm } from '@/features/visitors/hooks/useVisitorRegistrationForm';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function VisitorRegistration() {
  const insets = useSafeAreaInsets();
  const {
    formData,
    handleInputChange,
    handleBlur,
    errors,
    isFormValid
  } = useVisitorRegistrationForm();

  const [createVisitor, { isLoading }] = useCreateVisitorMutation();

  const handleRegister = async () => {
    if (!isFormValid) return;
    try {
      const payload: ICreateVisitorPayload = {
        firstname: formData.firstName.toUpperCase(),
        lastname: formData.lastName.toUpperCase(),
        middlename: formData.middleName ? formData.middleName.toUpperCase() : '',
        contactNo1: formData.mobileNumber
      }
      await createVisitor(payload);
      Toast.show({
        type: 'success',
        text1: 'Visitor created successfully',
        text2: 'You can now proceed to the sign in screen',
      });
      router.push('/(visitor)/SignInScreen');
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create visitor',
      });
    }
  };

  const handleSkip = () => {
    router.push('/(visitor)/SignInScreen');
  };

  const handleBack = () => {
    router.push('/(main)')
  };

  return (
    <View className="flex-1 bg-gradient-to-br bg-white from-blue-400 to-blue-600">
      <View
        className="flex-1 flex-row"
        style={{
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 20) // Ensure minimum bottom padding
        }}
      >
        {/* Left Side - Form Content */}
        <View className="flex-1">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 px-8 py-6">
              <Text className="text-3xl font-bold text-gray-800 mb-8">
                Visitors Registration
              </Text>
              <VisitorRegistrationForm
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                handleBlur={handleBlur}
              />
            </View>
          </ScrollView>
        </View>

        {/* Right Side - Action Buttons */}
        <View className="w-80 px-6 py-6 bg-gray-50 border-l border-gray-200">
          <View className="flex-1 justify-center">
            <View className="gap-4">
              <TouchableOpacity
                onPress={handleBack}
                className="bg-gray-100 rounded-lg py-4 border border-gray-200"
              >
                <Text className="text-gray-700 text-lg font-medium text-center">
                  Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSkip}
                className="bg-gray-200 rounded-lg py-4 border border-gray-200"
              >
                <Text className="text-gray-700 text-lg font-medium text-center">
                  Skip, I&apos;m already registered
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleRegister}
                disabled={!isFormValid || isLoading}
                className={`rounded-lg py-4 ${isFormValid ? 'bg-blue-500' : 'bg-blue-300'}`}
              >
                <Text className="text-white text-lg font-semibold text-center">
                  {isLoading ? 'Registering...' : 'Register and Proceed'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Optional: Status or Info Section */}
          <View className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Text className="text-blue-800 text-sm font-medium mb-1">
              Registration Info
            </Text>
            <Text className="text-blue-600 text-xs">
              Fill out all required fields to complete your visitor registration.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}