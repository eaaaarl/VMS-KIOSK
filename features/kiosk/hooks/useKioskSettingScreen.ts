import { useGetAllKioskSettingQuery, useGetKioskSettingQuery } from '@/features/kiosk/api/kioskApi'
import { useAppSelector } from '@/lib/redux/hook'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export const useKioskSettingScreen = () => {
  const { kioskSettingId } = useAppSelector((state) => state.kiosk)
  const router = useRouter()
  const { data } = useGetAllKioskSettingQuery()
  const kioskOptions = data?.results || []
  const [selectedKioskId, setSelectedKioskId] = useState<number | null>(kioskSettingId || null)

  const { data: kioskSetting } = useGetKioskSettingQuery(
    { id: selectedKioskId as number },
    { skip: !selectedKioskId }
  )

  const handleClose = () => {
    router.replace('/')
  }

  const handleSave = () => {
    if (selectedKioskId) {
      router.replace({
        pathname: '/(user)/UserConfirmationScreen',
        params: {
          kioskSettingId: selectedKioskId.toString()
        }
      })
    } else {
      alert('Please select a kiosk setting before saving.')
    }
  }

  const handleOptionSelect = (optionId: number) => {
    setSelectedKioskId(optionId)
  }

  const isOptionSelected = (optionId: number) => {
    return kioskSetting && kioskSetting.id === optionId
  }

  return {
    kioskOptions,
    kioskSetting,
    selectedKioskId,
    handleClose,
    handleSave,
    handleOptionSelect,
    isOptionSelected
  }
} 