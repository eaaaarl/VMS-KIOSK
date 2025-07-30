import { useGetVisitorsReturnedQuery } from '@/features/visitors/api/visitorApi';
import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useSelectScreen = () => {
  const router = useRouter();
  const todaysDate = formattedDate(new Date());
  const { data: visitorsReturned } = useGetVisitorsReturnedQuery({ date: todaysDate });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const countReturned = visitorsReturned?.results?.length || 0;

  const unreturnedIds =
    visitorsReturned?.results
      ?.filter(item => item.strId)
      .map(item => ({ id: item.strId, remarks: 'Return for reuse' })) || [];

  const handleClose = () => {
    router.back();
  };

  const handleSetKioskFunction = () => {
    router.push('/(setting)/SettingKiosk');
  };

  const handlePrinterManagement = () => {
    router.push('/(developer)/printer');
  };

  const handleIpPortConfiguration = () => {
    router.push('/(developer)/setting');
  };

  const handleReturnIds = () => {
    setIsModalVisible(true);
  };

  return {
    countReturned,
    handleClose,
    handleSetKioskFunction,
    handlePrinterManagement,
    handleIpPortConfiguration,
    handleReturnIds,
    isModalVisible,
    setIsModalVisible,
    unreturnedIds,
  };
};
