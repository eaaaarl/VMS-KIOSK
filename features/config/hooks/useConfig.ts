import { useGetConfigQuery } from "../api/configApi";

export const useConfig = () => {
  const {
    data,
    isLoading: configLoading,
    error: configError,
  } = useGetConfigQuery();

  const getIdCount = data?.find(
    (item) => item.SectionName === "ID" && item.KeyName === "Count"
  )?.Value;

  const getPrefixId = data?.find(
    (item) => item.SectionName === "ID" && item.KeyName === "Prefix"
  )?.Value;

  const getSeparatorId = data?.find(
    (item) => item.SectionName === "ID" && item.KeyName === "Separator"
  )?.Value;

  const getIdLength = data?.find(
    (item) => item.SectionName === "ID" && item.KeyName === "Zeros"
  )?.Value;

  return {
    getIdTotalCount: getIdCount,
    getPrefixId,
    getSeparatorId,
    getIdLength,

    configLoading,
    configError,
  };
};
