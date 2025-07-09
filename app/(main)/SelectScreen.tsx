import { useSelectScreen } from '@/features/main';
import SelectScreenUI from '@/features/main/components/SelectScreenUI';
import React from 'react';

export default function SelectScreen() {
  const {
    countReturned,
    handleClose,
    handleSetKioskFunction,
    handlePrinterManagement,
  } = useSelectScreen();

  return (
    <SelectScreenUI
      countReturned={countReturned}
      onClose={handleClose}
      onSetKioskFunction={handleSetKioskFunction}
      onPrinterManagement={handlePrinterManagement}
    />
  );
}