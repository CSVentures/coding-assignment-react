export const Header = ({
  title,
  children,
  onClick,
  icon,
}: {
  title: React.ReactNode;
  children?: any;
  onClick?: any;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="bg-white shadow-lg border-b border-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="relative flex items-center justify-between gap-4 p-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">{title}</div>
          {children}
        </div>
        <button
          onClick={onClick}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
        >
          {icon}
        </button>
      </div>
    </div>
  );
};
