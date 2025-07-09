import {
  SignInDoneButton,
  SignInStatusMessage,
  SignInSuccessHeader,
  TicketNumberDisplay,
  useSignInSuccess,
  VisitorNameDisplay
} from '@/features/visitors';
import React from 'react';
import { View } from 'react-native';

export default function SignInSuccess() {
  const {
    ticketNumber,
    visitorName,
    isPrinting,
    handleDone,
    getStatusMessage,
    getStatusColor,
  } = useSignInSuccess();

  return (
    <View className="flex-1 bg-white px-6 py-12 justify-center items-center">
      <SignInSuccessHeader />

      <SignInStatusMessage
        message={getStatusMessage()}
        color={getStatusColor()}
      />

      <TicketNumberDisplay ticketNumber={ticketNumber} />

      <VisitorNameDisplay visitorName={visitorName} />

      <SignInDoneButton
        onPress={handleDone}
        isPrinting={isPrinting}
      />
    </View>
  );
}