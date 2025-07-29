import { useGetAllKioskSettingQuery, useGetKioskSettingQuery } from '@/features/kiosk/api/kioskApi';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setKioskSettingId } from '@/lib/redux/state/kioskSlice';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useKioskSettingScreen = () => {
  const dispatch = useAppDispatch();
  const { kioskSettingId } = useAppSelector(state => state.kiosk);
  const router = useRouter();
  const { data } = useGetAllKioskSettingQuery();
  const kioskOptions = data?.results || [];
  const [selectedKioskId, setSelectedKioskId] = useState<number | null>(kioskSettingId || null);

  const { data: kioskSetting } = useGetKioskSettingQuery(
    { id: selectedKioskId as number },
    { skip: !selectedKioskId }
  );

  // Change this into an '/' route later
  const handleClose = () => {
    router.replace('/(main)/SelectScreen');
  };

  const handleSave = () => {
    if (selectedKioskId) {
      dispatch(setKioskSettingId({ kioskSettingId: selectedKioskId }));
      router.replace('/(main)/SelectScreen');
    } else {
      alert('Please select a kiosk setting before saving.');
    }
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedKioskId(optionId);
  };

  const isOptionSelected = (optionId: number) => {
    return kioskSetting && kioskSetting.id === optionId;
  };

  return {
    kioskOptions,
    kioskSetting,
    selectedKioskId,
    handleClose,
    handleSave,
    handleOptionSelect,
    isOptionSelected,
  };
};
