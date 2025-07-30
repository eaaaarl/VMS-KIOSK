import UserConfirmationForm from '@/features/user/components/UserConfirmationForm';
import { useUserConfirmation } from '@/features/user/hooks/useUserConfirmation';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export default function UserConfirmationScreen() {
  const { username, password, isLoading, setUsername, setPassword, handleConfirm, handleBack } =
    useUserConfirmation();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <UserConfirmationForm
          username={username}
          password={password}
          isLoading={isLoading}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onConfirm={handleConfirm}
          onBack={handleBack}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
