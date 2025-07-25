import { useLazyGetLabelConfigQuery } from '@/features/label/api/labelApi';
import {
  SignInDoneButton,
  SignInStatusMessage,
  SignInSuccessHeader,
  TicketNumberDisplay,
  useSignInSuccess,
  VisitorNameDisplay,
} from '@/features/visitors';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function SignInSuccess() {
  const { ticketNumber, visitorName, isPrinting, handleDone, getStatusMessage, getStatusColor } =
    useSignInSuccess();

  const [getLabelConfig, { data: labelConfig }] = useLazyGetLabelConfigQuery();

  useEffect(() => {
    getLabelConfig();
  }, [getLabelConfig]);

  const message = labelConfig?.find(
    config => config.SectionName === 'Kiosk' && config.KeyName === 'Signed In Title'
  )?.Value;

  return (
    <View className="flex-1 items-center justify-center bg-white px-6 py-12">
      <SignInSuccessHeader message={message} />

      <SignInStatusMessage message={getStatusMessage()} color={getStatusColor()} />

      <TicketNumberDisplay ticketNumber={ticketNumber} />

      <VisitorNameDisplay visitorName={visitorName} />

      <SignInDoneButton onPress={handleDone} isPrinting={isPrinting} />
    </View>
  );
}
