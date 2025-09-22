import { Form, FormInstance, Input } from "antd";
type TicketFormProps = {
  form: FormInstance;
  handleSubmit: (values: any) => void;
  footer: React.ReactNode;
};

export function TicketForm({ form, handleSubmit, footer }: TicketFormProps) {
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="h-full flex flex-col gap-6"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <Form.Item
          label={<span className="text-sm font-medium">Description</span>}
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea
            placeholder="Describe the ticket"
            rows={6}
            className="w-full resize-none"
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
        </Form.Item>
      </div>

      {footer}
    </Form>
  );
}
