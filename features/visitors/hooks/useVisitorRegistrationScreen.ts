import { ICreateVisitorPayload } from '@/features/visitors/api/interface';
import { useCreateVisitorMutation } from '@/features/visitors/api/visitorApi';
import { useVisitorRegistrationForm } from '@/features/visitors/hooks/useVisitorRegistrationForm';
import { router } from 'expo-router';
import { useMemo } from 'react';
import Toast from 'react-native-toast-message';

export function useVisitorRegistrationScreen() {
  const { formData, handleInputChange, handleBlur, errors, isFormValid } =
    useVisitorRegistrationForm();

  const [createVisitor, { isLoading }] = useCreateVisitorMutation();

  const handleRegister = async () => {
    if (!isFormValid) return;

    try {
      const payload: ICreateVisitorPayload = {
        firstname: formData.firstName.toUpperCase(),
        lastname: formData.lastName.toUpperCase(),
        middlename: formData.middleName ? formData.middleName.toUpperCase() : '',
        contactNo1: formData.mobileNumber,
      };

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
    router.push('/(main)');
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
