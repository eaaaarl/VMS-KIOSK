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

  return {
    getIdCount,

    configLoading,
    configError,
  };
};
