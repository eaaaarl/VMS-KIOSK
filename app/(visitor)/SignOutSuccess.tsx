import {
  SignOutActionButtons,
  SignOutSuccessHeader,
  SignOutThankYouMessage,
  SignOutTicketDisplay,
  SignOutVisitorNameDisplay,
  useSignOutSuccess
} from '@/features/visitors';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

export default function SignOutSuccess() {
  const { ticketNumber, name, handleDone, handleRateUs } = useSignOutSuccess();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center px-8">
        <SignOutSuccessHeader />
        <SignOutThankYouMessage />
        <SignOutTicketDisplay ticketNumber={ticketNumber} />
        <SignOutVisitorNameDisplay name={name} />
        <SignOutActionButtons onDone={handleDone} onRateUs={handleRateUs} />
      </View>
    </SafeAreaView>
  );
}