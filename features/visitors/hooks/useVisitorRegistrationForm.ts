import { useMemo, useState } from 'react';

export function useVisitorRegistrationForm() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    mobileNumber: '',
  });

  const [touched, setTouched] = useState({
    lastName: false,
    firstName: false,
    mobileNumber: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
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
    } else if (touched.mobileNumber && !/^(?63|0)?[9]\d{9}$/.test(formData.mobileNumber.trim())) {
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

  return {
    formData,
    setFormData,
    touched,
    setTouched,
    handleInputChange,
    handleBlur,
    errors,
    isFormValid,
  };
}
