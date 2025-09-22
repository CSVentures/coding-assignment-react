import { Button } from "antd";
import { useMobile } from "client/src/app/utils";

export function FooterModal({
  onClose,
  allowCreate,
  isLoading,
}: {
  onClose: () => void;
  allowCreate: boolean;
  isLoading: boolean;
}) {
  const { isMobile } = useMobile();
  return (
    <div
      className={`bg-white pt-4 mt-6 ${
        isMobile
          ? "fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 px-4 pb-4"
          : "sticky bottom-0"
      }`}
    >
      <div className={`flex gap-3 ${isMobile ? "" : "justify-end"}`}>
        <Button
          size="large"
          className={` h-12 ${isMobile ? "flex-1" : "fixed-content"}`}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          loading={isLoading}
          disabled={!allowCreate}
          type="primary"
          htmlType="submit"
          size="large"
          className={`h-12 ${isMobile ? "flex-1" : "fixed-content"}`}
        >
          Create Ticket
        </Button>
      </div>
    </div>
  );
}
