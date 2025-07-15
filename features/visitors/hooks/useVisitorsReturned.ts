import {
  useCreatePublicReturnIdMutation,
  useGetVisitorsReturnedQuery,
  useSignOutAllVisitorsMutation,
  visitorApi,
} from '@/features/visitors/api/visitorApi';
import { formattedDate } from '@/features/visitors/utils/FormattedDate';
import { useAppSelector } from '@/lib/redux/hook';
import type { AppDispatch } from '@/lib/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ICreatePublicReturnIdPayload } from '../api/interface';

export function useVisitorsReturnedModal() {
  const { kioskSettingId } = useAppSelector(state => state.kiosk);
  const [componentMounted, setComponentMounted] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const [hasShownVisitorInfo, setHasShownVisitorInfo] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  const todaysDate = formattedDate(new Date());

  const {
    data: visitorsReturned,
    isLoading,
    isSuccess,
  } = useGetVisitorsReturnedQuery(
    { date: todaysDate },
    {
      skip: !kioskSettingId || !componentMounted,
    }
  );

  const countReturned = visitorsReturned?.results?.length || 0;

  useEffect(() => {
    if (
      componentMounted &&
      kioskSettingId &&
      isSuccess &&
      !isLoading &&
      !hasShownVisitorInfo &&
      countReturned > 0
    ) {
      const timeoutId = setTimeout(() => {
        setHasShownVisitorInfo(true);
        setIsInformationModalOpen(true);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [componentMounted, kioskSettingId, isSuccess, isLoading, countReturned, hasShownVisitorInfo]);

  let strId: string[] = [];
  for (let i = 0; i < countReturned; i++) {
    strId.push(visitorsReturned?.results?.[i]?.strId as string);
  }

  const [signOutAllVisitors, { isLoading: isSigningOutAllVisitors }] =
    useSignOutAllVisitorsMutation();
  const [createPublicReturnId, { isLoading: isCreatingPublicReturnId }] =
    useCreatePublicReturnIdMutation();

  async function fetchAllVisitorLogs(strIds: string[]) {
    for (const strId of strIds) {
      const { results } = await dispatch(
        visitorApi.endpoints.getVisitorLogInfo.initiate({ strId })
      ).unwrap();

      const res = await signOutAllVisitors({
        strId: results?.[0]?.strId as string,
        dateNow: results?.[0]?.strLogIn as string,
      });

      const createPublicReturnIdPayload: ICreatePublicReturnIdPayload = {
        vlId: results?.[0]?.id as number,
        vlStrId: results?.[0]?.strId as string,
        vlLogIn: results?.[0]?.strLogIn as string,
        type: 0,
        remarks: 'Return for reuse',
      };

      await createPublicReturnId(createPublicReturnIdPayload);
    }
  }

  const handleReturnAllVisitors = async () => {
    try {
      setIsInformationModalOpen(false);
      await fetchAllVisitorLogs(strId);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isInformationModalOpen,
    setIsInformationModalOpen,
    handleReturnAllVisitors,
    isSigningOutAllVisitors: isSigningOutAllVisitors || isCreatingPublicReturnId,
  };
}
