import { Button } from "antd";
import type { ButtonProps } from "antd";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "link";

interface CommonButtonProps extends Omit<ButtonProps, "variant"> {
  text?: string;
  intent?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-none",
  secondary: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50",
  danger:
    "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-none",
  ghost: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
  link: "bg-transparent text-blue-600 hover:text-blue-700 shadow-none",
};

export const ButtonStyles = ({
  icon,
  onClick,
  text,
  size = "large",
  type = "primary",
  intent = "primary",
  className = "",
  children,
  block = true,
  ...rest
}: CommonButtonProps) => {
  const baseClasses =
    "w-full border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold px-6";
  const computedClassName =
    `${baseClasses} ${variantClasses[intent]} ${className}`.trim();

  return (
    <Button
      size={size}
      type={type}
      icon={icon}
      onClick={onClick}
      className={computedClassName}
      block={block}
      {...rest}
    >
      {children ?? text}
    </Button>
  );
};
