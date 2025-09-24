import { Button, Form, Input, Modal } from "antd";
import React from "react";

export interface AddTicketModalProps {
  onAddTicket: (description: string) => void;
  open: boolean;
  onCancel: () => void;
  isConfirmLoading: boolean;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({
  onAddTicket,
  open,
  onCancel,
  isConfirmLoading,
}) => {
  return (
    <>
      <Modal
        title="Add Ticket"
        open={open}
        onCancel={onCancel}
        footer={null}
        width={400}
      >
        <Form
          name="basic"
          style={{ maxWidth: 400 }}
          initialValues={{ description: "" }}
          onFinish={onAddTicket}
          onFinishFailed={() => {}}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<{ description: string }>
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={isConfirmLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTicketModal;
