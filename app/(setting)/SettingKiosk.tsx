import { KioskSettingUI } from '@/features/kiosk/components/KioskSettingUI'
import { useKioskSettingScreen } from '@/features/kiosk/hooks/useKioskSettingScreen'
import React from 'react'

export default function SettingKiosk() {
  const {
    kioskOptions,
    selectedKioskId,
    handleClose,
    handleSave,
    handleOptionSelect,
  } = useKioskSettingScreen()

  return (
    <KioskSettingUI
      options={kioskOptions}
      selectedOptionId={selectedKioskId}
      onClose={handleClose}
      onSave={handleSave}
      onOptionSelect={handleOptionSelect}
    />
  )
}