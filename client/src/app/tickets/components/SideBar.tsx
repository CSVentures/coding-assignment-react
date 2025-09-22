import { Button, Form, Space, Switch } from "antd";
import { useMemo, useEffect } from "react";
import useQueries from "../../hooks/useQueries";
import { useFilter } from "../hooks/useFilter";

interface FiltersBarsProps {
  onFilterChange: (values: { [key: string]: any }) => void;
}
export function SideBar({ onFilterChange }: FiltersBarsProps) {
  const [form] = Form.useForm();
  const { query, onClearAll } = useFilter();

  const initialValues = useMemo(() => {
    return {
      status: query?.["status"] === "true",
    };
  }, [query?.["status"]]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleFinish = (values: any) => {
    onFilterChange(values);
  };

  return (
    <div className="h-[calc(100vh-300px)] border border-gray-100 rounded-lg shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-100 bg-gray-30">
        <h3 className="text-lg font-medium">Filters</h3>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={handleFinish}
          className="flex flex-col h-full"
        >
          <div className="flex-1 overflow-y-auto p-4">
            <Form.Item name="status" label="Status" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>

          <div className="flex-shrink-0 border-t border-gray-100 bg-gray-30 p-4">
            <Space className="w-full justify-end">
              <Button size="large" onClick={onClearAll}>
                Clear All
              </Button>
              <Button size="large" type="primary" htmlType="submit">
                Apply
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    </div>
  );
}
