import { useLazyGetLabelConfigQuery } from '@/features/label/api/labelApi';
import {
  SignOutActionButtons,
  SignOutSuccessHeader,
  SignOutThankYouMessage,
  SignOutTicketDisplay,
  SignOutVisitorNameDisplay,
  useSignOutSuccess,
} from '@/features/visitors';
import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';

export default function SignOutSuccess() {
  const { ticketNumber, name, handleDone, handleRateUs } = useSignOutSuccess();

  const [getLabelConfig, { data: labelConfig }] = useLazyGetLabelConfigQuery();

  useEffect(() => {
    getLabelConfig();
  }, [getLabelConfig]);

  const message = labelConfig?.find(
    config => config.SectionName === 'Kiosk' && config.KeyName === 'Signed Out Title'
  )?.Value;

  const messageThankYou = labelConfig?.find(
    config => config.SectionName === 'Kiosk' && config.KeyName === 'Signed Out Subtitle'
  )?.Value;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center px-8">
        <SignOutSuccessHeader message={message} />
        <SignOutThankYouMessage message={messageThankYou} />
        <SignOutTicketDisplay ticketNumber={ticketNumber} />
        <SignOutVisitorNameDisplay name={name} />
        <SignOutActionButtons onDone={handleDone} onRateUs={handleRateUs} />
      </View>
    </SafeAreaView>
  );
}
