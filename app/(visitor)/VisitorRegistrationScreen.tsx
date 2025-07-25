import VisitorRegistrationActionButtons from '@/features/visitors/components/VisitorRegistrationActionButtons';
import VisitorRegistrationFormContent from '@/features/visitors/components/VisitorRegistrationFormContent';
import VisitorRegistrationLayout from '@/features/visitors/components/VisitorRegistrationLayout';
import { useVisitorRegistrationScreen } from '@/features/visitors/hooks/useVisitorRegistrationScreen';
import React from 'react';

export default function VisitorRegistration() {
  const {
    formData,
    errors,
    handleInputChange,
    handleBlur,
    handleRegister,
    handleSkip,
    handleBack,
    isRegisterButtonDisabled,
    registerButtonText,
  } = useVisitorRegistrationScreen();

  return (
    <VisitorRegistrationLayout>
      {/* Left Side - Form Content */}
      <VisitorRegistrationFormContent
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
      />

      {/* Right Side - Action Buttons */}
      <VisitorRegistrationActionButtons
        onBack={handleBack}
        onSkip={handleSkip}
        onRegister={handleRegister}
        isRegisterButtonDisabled={isRegisterButtonDisabled}
        registerButtonText={registerButtonText}
      />
    </VisitorRegistrationLayout>
  );
}
