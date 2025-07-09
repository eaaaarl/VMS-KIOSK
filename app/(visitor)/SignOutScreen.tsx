import { LoadingOverlay } from '@/features/main/components/LoadingOverlay';
import { SignOutForm } from '@/features/visitors/components/SignOutForm';
import { useSignOutVisitor } from '@/features/visitors/hooks/useSignOutVisitor';
import { router } from 'expo-router';
import React from 'react';

export default function SignOutScreen() {
  const signOutProps = useSignOutVisitor();

  const handleBack = () => {
    router.push('/(main)');
  };

  return (
    <>
      <SignOutForm {...signOutProps} handleBack={handleBack} />
      <LoadingOverlay isLoading={signOutProps.isSigningOut} />
    </>
  );
}