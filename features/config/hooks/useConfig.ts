import { useGetConfigQuery } from '../api/configApi';

export const useConfig = () => {
  const { data, isLoading: configLoading, error: configError } = useGetConfigQuery();

  const getIdCount = data?.find(
    item => item.SectionName === 'ID' && item.KeyName === 'Count'
  )?.Value;

  const getPrefixId = data?.find(
    item => item.SectionName === 'ID' && item.KeyName === 'Prefix'
  )?.Value;

  const getSeparatorId = data?.find(
    item => item.SectionName === 'ID' && item.KeyName === 'Separator'
  )?.Value;

  const getIdLength = data?.find(
    item => item.SectionName === 'ID' && item.KeyName === 'Zeros'
  )?.Value;

  const getRequredId = data?.find(
    item => item.SectionName === 'Other' && item.KeyName === 'Require Id'
  )?.Value;

  const getRequiredFace = data?.find(
    item => item.SectionName === 'Other' && item.KeyName === 'Require Face'
  )?.Value;

  const getRequiredName = data?.find(
    item => item.SectionName === 'Other' && item.KeyName === 'Require Name'
  )?.Value;

  const getPrintTicket = data?.find(
    item => item.SectionName === 'Kiosk' && item.KeyName === 'Print Ticket'
  )?.Value;

  const getReturnId = data?.find(
    item => item.SectionName === 'Kiosk' && item.KeyName === 'Return Id'
  )?.Value;

  const getRatingType = data?.find(
    item => item.SectionName === 'Rating' && item.KeyName === 'Rating Type'
  )?.Value;

  const getRatingRequireComment = data?.find(
    item => item.SectionName === 'Rating' && item.KeyName === 'Require Comment'
  )?.Value;

  const getRequireRating = data?.find(
    item => item.SectionName === 'Rating' && item.KeyName === 'Require Rating'
  )?.Value;

  const enabledRequireRating = getRequireRating === '1';
  const enabledRequireComment = getRatingRequireComment === '1';
  const enabledRatingType = getRatingType === '1';

  const enabledRequiredId = getRequredId === '1';
  const enabledRequiredFace = getRequiredFace === '1';
  const enabledRequiredName = getRequiredName === '1';
  const enabledPrintTicket = getPrintTicket === '1';
  const enabledReturnId = getReturnId === '1';

  return {
    getIdTotalCount: getIdCount,
    getPrefixId,
    getSeparatorId,
    getIdLength,
    enabledRequiredId,
    enabledRequiredFace,
    enabledRequiredName,
    enabledPrintTicket,
    enabledReturnId,

    configLoading,
    configError,

    enabledRequireRating,
    enabledRequireComment,
    enabledRatingType,
  };
};
