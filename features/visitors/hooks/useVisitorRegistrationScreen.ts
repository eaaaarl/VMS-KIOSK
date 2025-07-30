import { ICreateVisitorPayload } from '@/features/visitors/api/interface';
import { useCreateVisitorMutation, visitorApi } from '@/features/visitors/api/visitorApi';
import { useVisitorRegistrationForm } from '@/features/visitors/hooks/useVisitorRegistrationForm';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

export function useVisitorRegistrationScreen() {
  const { formData, handleInputChange, handleBlur, errors, isFormValid } =
    useVisitorRegistrationForm();

  const refreshDataForAvailableID = () => {
    visitorApi.util.invalidateTags(['AllAvailableVisitors']);
    visitorApi.util.invalidateTags(['VisitorsReturned']);
    visitorApi.util.invalidateTags(['VisitorsTodays']);
  };

  const [createVisitor, { isLoading }] = useCreateVisitorMutation();

  const handleRegister = async () => {
    if (!isFormValid) return;

    Alert.alert(
      'Confirm Registration',
      `Please confirm the following details:\n\nFirst Name: ${formData.firstName.toUpperCase()}\nLast Name: ${formData.lastName.toUpperCase()}\nMiddle Name: ${formData.middleName ? formData.middleName.toUpperCase() : 'N/A'}\nMobile Number: ${formData.mobileNumber}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const payload: ICreateVisitorPayload = {
                firstname: formData.firstName.toUpperCase(),
                lastname: formData.lastName.toUpperCase(),
                middlename: formData.middleName ? formData.middleName.toUpperCase() : '',
                contactNo1: formData.mobileNumber,
              };

              const response = await createVisitor(payload);

              if (response.data?.ghError === 2002) {
                Toast.show({
                  type: 'error',
                  text1: 'The name is already taken',
                });
                return;
              }

              Toast.show({
                type: 'success',
                text1: 'Visitor created successfully',
                text2: 'You can now proceed to the sign in screen',
              });

              refreshDataForAvailableID();

              router.push('/(visitor)/SignInScreen');
            } catch (error) {
              console.log(error);
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to create visitor',
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSkip = () => {
    refreshDataForAvailableID();
    router.push('/(visitor)/SignInScreen');
  };

  const handleBack = () => {
    if (formData.firstName || formData.lastName || formData.middleName || formData.mobileNumber) {
      Alert.alert(
        'Confirm Navigation',
        'Are you sure you want to go back? Your registration data will be lost.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Go Back',
            onPress: () => router.replace('/(main)'),
          },
        ],
        { cancelable: false }
      );

      return;
    }
    router.replace('/(main)');
  };

  const isRegisterButtonDisabled = useMemo(() => {
    return !isFormValid || isLoading;
  }, [isFormValid, isLoading]);

  const registerButtonText = useMemo(() => {
    return isLoading ? 'Registering...' : 'Register and Proceed';
  }, [isLoading]);

  return {
    formData,
    errors,
    handleInputChange,
    handleBlur,
    handleRegister,
    handleSkip,
    handleBack,
    isRegisterButtonDisabled,
    registerButtonText,
    loading: isLoading,
  };
}
