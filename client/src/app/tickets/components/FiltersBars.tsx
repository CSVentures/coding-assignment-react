import { useState, useMemo } from "react";
import { DrawerFilter } from "./DrawerFilter";
import { useMobile } from "../../utils";
import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useQueries from "../../hooks/useQueries";
import { ButtonStyles } from "../../component/ButtonStyles";

interface FiltersBarsProps {
  onFilterChange: (values: { [key: string]: any }) => void;
}

export function FiltersBars({ onFilterChange }: FiltersBarsProps) {
  const { isMobile } = useMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const { query } = useQueries();

  const initialValues = useMemo(() => {
    return {
      status: query?.["status"] === "true",
    };
  }, [query?.["status"]]);

  if (isMobile) {
    return (
      <>
        {isDrawerOpen ? (
          <DrawerFilter
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            onSubmit={onFilterChange}
            initialValues={initialValues}
          />
        ) : (
          <ButtonStyles
            icon={<FilterOutlined />}
            onClick={openDrawer}
            size="middle"
            text="Filters"
            type="default"
          />
        )}
      </>
    );
  }

  return <></>;
}
