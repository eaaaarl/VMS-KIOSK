import { RatingScreenUI } from '@/features/rating/components/RatingScreenUI';
import { useRatingScreen } from '@/features/rating/hooks/useRatingScreen';
import { useLocalSearchParams } from 'expo-router';

export default function Rating() {
  const { ticketNumber, name, logIn, visitorId } = useLocalSearchParams();

  const {
    message,
    messageFeedback,
    handleOfficeRating,
    handleDepartmentRating
  } = useRatingScreen({
    ticketNumber: ticketNumber as string,
    name: name as string,
    logIn: logIn as string,
    visitorId: visitorId as string,
  });

  return (
    <RatingScreenUI
      name={name as string}
      message={message}
      messageFeedback={messageFeedback}
      onOfficeRating={handleOfficeRating}
      onDepartmentRating={handleDepartmentRating}
    />
  );
}
