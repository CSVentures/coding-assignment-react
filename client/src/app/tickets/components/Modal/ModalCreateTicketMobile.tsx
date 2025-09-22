import { Form, Modal, Button } from "antd";
import styles from "../../tickets.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { FooterModal } from "./FooterModal";
import { TicketForm } from "../TicketForm";
import { Header } from "client/src/app/component/Header";
import { showSuccessNotification } from "client/src/app/component/messages";

export function ModalCreateTicketMobile({
  open,
  onClose,
  onSubmit,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, successCallback: () => void) => void;
  isLoading: boolean;
}) {
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
      width="100vw"
      style={{
        top: 0,
        paddingBottom: 0,
        maxWidth: "100vw",
        margin: 0,
      }}
      styles={{
        body: {
          padding: "16px",
          height: "calc(100vh - 60px)",
          overflow: "auto",
          paddingBottom: "100px", // Space for fixed footer
        },
        header: {
          borderBottom: "1px solid #f0f0f0",
        },
      }}
      className={styles["mobileModal"]}
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
