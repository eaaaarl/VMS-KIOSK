import { ICreateVisitorPayload } from '@/features/visitors/api/interface';
import { useCreateVisitorMutation } from '@/features/visitors/api/visitorApi';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function VisitorRegistration() {

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
    <SafeAreaView className="flex-1 bg-gradient-to-br bg-white from-blue-400 to-blue-600">
      <ScrollView className="flex-1 px-4 pt-6 pb-4">
        <Text className="text-xl font-bold text-gray-800 mb-6">
          Visitors Registration
        </Text>

        <View className="gap-4">
          <View>
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              Last Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className={`bg-gray-50 uppercase border rounded-lg px-3 py-2.5 text-base ${errors.lastName ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              onBlur={() => handleBlur('lastName')}
            />
            {errors.lastName && (
              <Text className="text-red-500 text-xs mt-1">{errors.lastName}</Text>
            )}
          </View>

          <View>
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              First Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className={`bg-gray-50 uppercase border rounded-lg px-3 py-2.5 text-base ${errors.firstName ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              onBlur={() => handleBlur('firstName')}
            />
            {errors.firstName && (
              <Text className="text-red-500 text-xs mt-1">{errors.firstName}</Text>
            )}
          </View>

          <View>
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              Middle Name <Text className="text-gray-400">(optional)</Text>
            </Text>
            <TextInput
              className="bg-gray-50 uppercase border border-gray-200 rounded-lg px-3 py-2.5 text-base"
              placeholder="Middle Name"
              value={formData.middleName}
              onChangeText={(value) => handleInputChange('middleName', value)}
            />
          </View>

          <View>
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              Mobile Number <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className={`bg-gray-50 border rounded-lg px-3 py-2.5 text-base ${errors.mobileNumber ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChangeText={(value) => handleInputChange('mobileNumber', value)}
              onBlur={() => handleBlur('mobileNumber')}
              keyboardType="phone-pad"
            />
            {errors.mobileNumber ? (
              <Text className="text-red-500 text-xs mt-1">{errors.mobileNumber}</Text>
            ) : (
              <Text className="text-xs text-gray-500 mt-1">
                (Ex. 639123456789, 09123456789, +639123456789)
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="px-4 py-3 mb-4  border-t border-gray-100">
        <TouchableOpacity
          onPress={handleBack}
          className="bg-gray-100 rounded-lg py-3 mb-2 border border-gray-200"
        >
          <Text className="text-gray-700 text-sm font-medium text-center">
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSkip}
          className="bg-gray-200 rounded-lg py-3 mb-2 border border-gray-200"
        >
          <Text className="text-gray-700 text-sm font-medium text-center">
            Skip, I&apos;m already registered
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={!isFormValid || isLoading}
          className={`rounded-lg py-3.5 ${isFormValid ? 'bg-blue-500' : 'bg-blue-300'
            }`}
        >
          <Text className="text-white text-sm font-semibold text-center">
            {isLoading ? 'Registering...' : 'Register and Proceed to Next Step'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}