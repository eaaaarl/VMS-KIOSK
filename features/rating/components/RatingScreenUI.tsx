import { RatingScreenContainer } from './RatingScreen/RatingScreenContainer';

interface RatingScreenUIProps {
  name: string;
  messageFeedback?: string;
  message?: string;
  onOfficeRating: () => void;
  onDepartmentRating: () => void;
}

export function RatingScreenUI({
  name,
  messageFeedback,
  message,
  onOfficeRating,
  onDepartmentRating,
}: RatingScreenUIProps) {
  return (
    <RatingScreenContainer
      name={name}
      messageFeedback={messageFeedback}
      message={message}
      onOfficeRating={onOfficeRating}
      onDepartmentRating={onDepartmentRating}
    />
  );
}
