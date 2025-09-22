import { Ticket } from "@acme/shared-models";
import { Button, Empty, Space, Spin, Table } from "antd";
import AppContext from "../../contexts";
import { useContext } from "react";
import { TicketItemMobile } from "./TicketItemMobile";

interface TableTableListProps {
  tickets: Ticket[];
  isLoading: boolean;
}
export function TicketListMobile({ tickets, isLoading }: TableTableListProps) {
  const { users } = useContext(AppContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spin spinning={isLoading} />
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Empty description="No tickets found" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex items-center justify-between px-8 py-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            Tickets
          </h2>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            {tickets.length} total tickets
          </p>
        </div>
      </div>
      <Space direction="vertical" size="middle" className="w-full">
        {tickets.map((ticket) => (
          <TicketItemMobile key={ticket.id} ticket={ticket} users={users} />
        ))}
      </Space>
    </div>
  );
}
