import { ICreateVisitorPayload } from '@/features/visitors/api/interface';
import { useCreateVisitorMutation } from '@/features/visitors/api/visitorApi';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function VisitorRegistration() {
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    mobileNumber: ''
  });

  const [touched, setTouched] = useState({
    lastName: false,
    firstName: false,
    mobileNumber: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const errors = useMemo(() => {
    const errors: Record<string, string> = {};
    if (touched.lastName && !formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (touched.firstName && !formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (touched.mobileNumber && !formData.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (touched.mobileNumber && !/^(\+?63|0)?[9]\d{9}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber = 'Please enter a valid Philippine mobile number';
    }
    return errors;
  }, [formData, touched]);

  const isFormValid = useMemo(() => {
    return (
      formData.lastName.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.mobileNumber.trim() !== '' &&
      Object.keys(errors).length === 0
    );
  }, [formData, errors]);

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

              {/* Form Fields Grid */}
              <View className="gap-6">
                {/* First Row - Last Name and First Name */}
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-700 mb-2">
                      Last Name <Text className="text-red-500">*</Text>
                    </Text>
                    <TextInput
                      className={`bg-gray-50 uppercase border rounded-lg px-4 py-4 text-lg ${errors.lastName ? 'border-red-500' : 'border-gray-200'
                        }`}
                      placeholder="Last Name"
                      placeholderTextColor="gray"
                      value={formData.lastName}
                      onChangeText={(value) => handleInputChange('lastName', value)}
                      onBlur={() => handleBlur('lastName')}
                    />
                    {errors.lastName && (
                      <Text className="text-red-500 text-sm mt-1">{errors.lastName}</Text>
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-700 mb-2">
                      First Name <Text className="text-red-500">*</Text>
                    </Text>
                    <TextInput
                      className={`bg-gray-50 uppercase border rounded-lg px-4 py-4 text-lg ${errors.firstName ? 'border-red-500' : 'border-gray-200'
                        }`}
                      placeholder="First Name"
                      placeholderTextColor="gray"
                      value={formData.firstName}
                      onChangeText={(value) => handleInputChange('firstName', value)}
                      onBlur={() => handleBlur('firstName')}
                    />
                    {errors.firstName && (
                      <Text className="text-red-500 text-sm mt-1">{errors.firstName}</Text>
                    )}
                  </View>
                </View>

                {/* Second Row - Middle Name */}
                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-2">
                    Middle Name <Text className="text-gray-400">(optional)</Text>
                  </Text>
                  <TextInput
                    className="bg-gray-50 uppercase border border-gray-200 rounded-lg px-4 py-4 text-lg"
                    placeholder="Middle Name"
                    placeholderTextColor="gray"
                    value={formData.middleName}
                    onChangeText={(value) => handleInputChange('middleName', value)}
                  />
                </View>

                {/* Third Row - Mobile Number */}
                <View>
                  <Text className="text-base font-semibold text-gray-700 mb-2">
                    Mobile Number <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    className={`bg-gray-50 border rounded-lg px-4 py-4 text-lg ${errors.mobileNumber ? 'border-red-500' : 'border-gray-200'
                      }`}
                    placeholder="Mobile Number"
                    placeholderTextColor="gray"
                    value={formData.mobileNumber}
                    onChangeText={(value) => handleInputChange('mobileNumber', value)}
                    onBlur={() => handleBlur('mobileNumber')}
                    keyboardType="phone-pad"
                  />
                  {errors.mobileNumber ? (
                    <Text className="text-red-500 text-sm mt-1">{errors.mobileNumber}</Text>
                  ) : (
                    <Text className="text-sm text-gray-500 mt-1">
                      (Ex. 639123456789, 09123456789, +639123456789)
                    </Text>
                  )}
                </View>
              </View>
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
                className={`rounded-lg py-4 ${isFormValid ? 'bg-blue-500' : 'bg-blue-300'
                  }`}
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