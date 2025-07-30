import { useSelectScreen } from '@/features/main';
import SelectScreenUI from '@/features/main/components/SelectScreenUI';
import { useVisitorsReturnedModal } from '@/features/visitors/hooks/useVisitorsReturned';
import React from 'react';

export default function SelectScreen() {
  const {
    countReturned,
    handleClose,
    handleSetKioskFunction,
    handlePrinterManagement,
    handleIpPortConfiguration,
    handleReturnIds,
    isModalVisible,
    setIsModalVisible,
    unreturnedIds,
  } = useSelectScreen();

  const { handleReturnAllVisitors, isSigningOutAllVisitors } = useVisitorsReturnedModal()

  return (
    <SelectScreenUI
      countReturned={countReturned}
      onClose={handleClose}
      onSetKioskFunction={handleSetKioskFunction}
      onPrinterManagement={handlePrinterManagement}
      onIpPortConfiguration={handleIpPortConfiguration}
      onReturnIds={handleReturnIds}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      unreturnedIds={unreturnedIds}
      confirmReturnAllIds={handleReturnAllVisitors}
      isSigningOutAllVisitors={isSigningOutAllVisitors}
    />
  );
}
