import { useGetVisitorsReturnedQuery } from '@/features/visitors/api/visitorApi';
import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import { useRouter } from 'expo-router';
import { SelectScreenHookReturn } from '../types/selectScreenTypes';

export const useSelectScreen = (): SelectScreenHookReturn => {
  const router = useRouter();
  const todaysDate = formattedDate(new Date());
  const { data: visitorsReturned } = useGetVisitorsReturnedQuery({ date: todaysDate });

  const countReturned = visitorsReturned?.results?.length || 0;

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

  return {
    countReturned,
    handleClose,
    handleSetKioskFunction,
    handlePrinterManagement,
    handleIpPortConfiguration,
  };
};
