import { useMemo } from "react";
import useQueries from "../../hooks/useQueries";

export function useFilter() {
  const { query, replaceQuery } = useQueries();

  const hasFiFilter = useMemo(() => {
    return "status" in query;
  }, [query?.["status"]]);

  const onClearAll = () => {
    replaceQuery({
      status: undefined,
    });
  };

  return { onClearAll, hasFiFilter, query };
}
