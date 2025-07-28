import { useLazyGetLabelConfigQuery } from '@/features/label/api/labelApi';
import { router } from 'expo-router';
import { useEffect } from 'react';

interface UseRatingScreenProps {
  ticketNumber: string;
  name: string;
  logIn: string;
  visitorId: string;
}

export function useRatingScreen({ ticketNumber, name, logIn, visitorId }: UseRatingScreenProps) {
  const [getLabelConfig, { data: labelConfig }] = useLazyGetLabelConfigQuery();

  useEffect(() => {
    getLabelConfig();
  }, [getLabelConfig]);

  const message = labelConfig?.find(
    config => config.SectionName === 'Rating' && config.KeyName === 'Welcome Subtitle'
  )?.Value;

  const messageFeedback = labelConfig?.find(
    config => config.SectionName === 'Rating' && config.KeyName === 'Welcome Title'
  )?.Value;

  const handleOfficeRating = () => {
    router.push({
      pathname: '/(rating)/OfficeRatingScreen',
      params: {
        ticketNumber,
        name,
        logIn,
        visitorId,
      },
    });
  };

  const handleDepartmentRating = () => {
    router.push({
      pathname: '/(rating)/DepartmentRatingScreen',
      params: {
        ticketNumber,
        name,
        logIn,
        visitorId,
      },
    });
  };

  return {
    message,
    messageFeedback,
    handleOfficeRating,
    handleDepartmentRating,
  };
}
