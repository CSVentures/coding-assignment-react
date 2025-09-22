import Label from "../../component/Label";
import useQueries from "../../hooks/useQueries";
import { useFilter } from "../hooks/useFilter";

export function CurrentFilter() {
  const { replaceQuery, query } = useQueries();
  const { onClearAll, hasFiFilter } = useFilter();

  return hasFiFilter ? (
    <div className="flex items-center gap-2 py-4">
      Filter by:
      <Label
        label="Completed"
        value={query?.["status"] === "true" ? "Completed" : "Incomplete"}
        onClear={() => {
          replaceQuery({ status: undefined });
        }}
      />
      <div
        className="text-[var(--primary-500)] cursor-pointer"
        onClick={onClearAll}
      >
        Clear All
      </div>
    </div>
  ) : null;
}
