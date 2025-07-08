import UserConfirmationForm from '@/features/user/components/UserConfirmationForm'
import { useUserConfirmation } from '@/features/user/hooks/useUserConfirmation'
import React from 'react'

export default function UserConfirmationScreen() {
  const {
    username,
    password,
    isLoading,
    setUsername,
    setPassword,
    handleConfirm,
    handleBack,
  } = useUserConfirmation()

  return (
    <UserConfirmationForm
      username={username}
      password={password}
      isLoading={isLoading}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onConfirm={handleConfirm}
      onBack={handleBack}
    />
  )
}