import { Form, Modal } from "antd";
import { TicketForm } from "../TicketForm";
import { CloseOutlined } from "@ant-design/icons";
import { FooterModal } from "./FooterModal";
import { Header } from "client/src/app/component/Header";
import { showSuccessNotification } from "client/src/app/component/messages";

type ModalCreateTicketProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, successCallback: () => void) => void;
  isLoading: boolean;
};
export function ModalCreateTicket({
  open,
  onClose,
  onSubmit,
  isLoading,
}: ModalCreateTicketProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values, () => {
      showSuccessNotification("Ticket created successfully!");
      form.resetFields();
      onClose();
    });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const ableToSubmit =
    Form.useWatch(["description"], form)?.trim() !== "" || !isLoading;

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      closable={false}
      title={
        <Header
          title={
            <span className="text-md font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Create New Ticket
            </span>
          }
          onClick={handleClose}
          icon={<CloseOutlined />}
        />
      }
      footer={null}
    >
      <TicketForm
        form={form}
        handleSubmit={handleSubmit}
        footer={
          <FooterModal
            onClose={handleClose}
            allowCreate={ableToSubmit}
            isLoading={isLoading}
          />
        }
      />
    </Modal>
  );
}
