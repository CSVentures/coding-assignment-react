import { useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function useQueries() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pathname = location.pathname;

  const getSearchParamsObject = (): Record<string, string> => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const query = useMemo(() => getSearchParamsObject(), [searchParams]);

  const replaceQuery = (newQuery: any) => {
    const updatedQuery = { ...query, ...newQuery };

    const finalQuery = Object.fromEntries(
      Object.entries(updatedQuery).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    );
    setSearchParams(finalQuery as any);
  };

  return {
    query,
    replaceQuery,
    pathname,
  };
}
