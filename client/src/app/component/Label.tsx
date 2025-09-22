import { CloseCircleOutlined } from "@ant-design/icons";

interface LabelProps {
  label: string;
  value: string;
  onClear?: () => void;
}

const Label: React.FC<LabelProps> = ({ label, value, onClear = () => {} }) => {
  return (
    <div className="bg-blue-50 border border-[var(--primary-500)] rounded-full px-3 py-1 flex items-center gap-2 w-fit">
      <span className="text-sm text-[var(--primary-500)]">
        {label}
        {": "}
        {value}{" "}
      </span>
      <CloseCircleOutlined
        onClick={onClear}
        style={{ cursor: "pointer", color: "var(--primary-500)" }}
      />
    </div>
  );
};

export default Label;
