import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

export function TicketStatusBadge({ status }: { status: boolean }) {
  const getStatusConfig = (status: boolean) => {
    switch (status) {
      case true:
        return {
          text: "Completed",
          color: "success",
          icon: <CheckCircleOutlined className="text-green-600" />,
          className:
            "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200 shadow-sm",
          dotColor: "bg-green-500",
        };
      case false:
        return {
          text: "In progress",
          color: "warning",
          icon: <ClockCircleOutlined className="text-orange-600" />,
          className:
            "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border-orange-200 shadow-sm",
          dotColor: "bg-orange-500",
        };
    }
    return {
      text: "Unknown",
      color: "default",
      icon: null,
      className:
        "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200 shadow-sm",
      dotColor: "bg-gray-500",
    };
  };

  const { text, icon, className } = getStatusConfig(status);
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border transition-all duration-200 hover:scale-105 hover:shadow-md ${className}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
