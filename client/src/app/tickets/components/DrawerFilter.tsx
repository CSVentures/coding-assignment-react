import { Button, Drawer, Form, Switch } from "antd";
import { ButtonStyles } from "../../component/ButtonStyles";
import { useFilter } from "../hooks/useFilter";

export type FilterState = {
  status: boolean;
};

interface DrawerFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { [key: string]: string }) => void;
  initialValues: FilterState;
}

export function DrawerFilter({
  isOpen = false,
  onClose = () => {},
  onSubmit,
  initialValues,
}: DrawerFilterProps) {
  const { onClearAll } = useFilter();
  const clearFilters = () => {
    onClose();
    onClearAll();
  };

  const handleFinish = (values: { [key: string]: string }) => {
    onSubmit(values);
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <Drawer
        width={"60%"}
        onClose={onClose}
        open={isOpen}
        title="Filters"
        placement="left"
      >
        <div className="flex flex-col h-full">
          <Form
            initialValues={initialValues}
            onFinish={handleFinish}
            className="flex flex-col h-full"
          >
            <div className="flex-1 overflow-y-auto p-4">
              <Form.Item name="status" valuePropName="checked" className="mb-0">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Status</span>
                  <Switch />
                </div>
              </Form.Item>
            </div>

            <div className="flex gap-4 p-4">
              <div className="flex-1">
                <ButtonStyles
                  type="default"
                  size="large"
                  onClick={clearFilters}
                  text="Clear All"
                />
              </div>

              <Button
                className="flex-1"
                size="large"
                type="primary"
                htmlType="submit"
              >
                Apply
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
    </>
  );
}
