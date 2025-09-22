import { notification } from "antd";

export const showErrotNotification = (error: string | React.ReactNode) => {
  notification.error({
    message: error || "Có lỗi xảy ra, vui lòng thử lại!",
  });
};

export const showSuccessNotification = (message: string | React.ReactNode) => {
  notification.success({
    message: message || "Thành công!",
  });
};
