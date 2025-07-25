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
      <SignOutForm
        permission={signOutProps.permission}
        requestPermission={signOutProps.requestPermission}
        ticketNumber={signOutProps.ticketNumber}
        cameraActive={signOutProps.cameraActive}
        error={signOutProps.error}
        animatedValue={signOutProps.animatedValue}
        isSigningOut={signOutProps.isSigningOut}
        handleBarCodeScanned={signOutProps.handleBarCodeScanned}
        toggleCamera={signOutProps.toggleCamera}
        handleTicketNumberChange={signOutProps.handleTicketNumberChange}
        handleSignOut={signOutProps.handleSignOut}
        handleBack={handleBack}
      />
      <LoadingOverlay isLoading={signOutProps.isSigningOut} />
    </>
  );
}
