import { Ticket, User } from "@acme/shared-models";
import { MappingTicketUser } from "../../utils/user";
import { TicketStatusBadge } from "./TicketStatusBadge";
import { useNavigate } from "react-router-dom";
import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

export function TicketItemMobile({
  ticket,
  users,
}: {
  ticket: Ticket;
  users: User[];
}) {
  const navigate = useNavigate();

  const returnAssignee = () => {
    const assignedUser = MappingTicketUser(ticket, users);
    return assignedUser ? (
      <div className="flex items-center gap-3">
        <Avatar
          size="small"
          icon={<UserOutlined />}
          className="bg-gradient-to-r from-blue-500 to-purple-500"
        />
        <span className="text-gray-700 font-semibold">{assignedUser.name}</span>
      </div>
    ) : (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
          <UserOutlined className="text-gray-400" />
        </div>
        <span className="text-gray-500 italic">Unassigned</span>
      </div>
    );
  };
  return (
    <div
      key={ticket.id}
      className="group relative px-6 py-5 bg-gradient-to-br from-white via-white to-blue-50/30 border border-gray-200/60 shadow-md hover:shadow-xl rounded-xl mb-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-200"
      onClick={() => navigate(`/${ticket.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">#</span>
          </div>
          <span className="text-blue-600 font-bold text-lg">{ticket.id}</span>
        </div>
        <TicketStatusBadge status={ticket.completed} />
      </div>

      <div className="mb-4">
        <p className="text-gray-600 font-medium text-sm mb-2 uppercase tracking-wide">
          Description
        </p>
        <Tooltip title={ticket.description} placement="topLeft">
          <p className="text-gray-800 leading-relaxed mb-0 line-clamp-2 text-base font-medium">
            {ticket.description || "--"}
          </p>
        </Tooltip>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <p className="text-gray-600 font-medium text-sm mb-2 uppercase tracking-wide">
          Assigned to
        </p>
        {returnAssignee()}
      </div>

      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
