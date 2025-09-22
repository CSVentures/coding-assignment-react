import { Ticket } from "@acme/shared-models";
import { Button, Empty, Spin, Table, Tooltip, Avatar } from "antd";
import AppContext from "../../contexts";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TicketStatusBadge } from "./TicketStatusBadge";
import { MappingTicketUser } from "../../utils/user";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";

interface TableListProps {
  tickets: Ticket[];
  isLoading: boolean;
}

export function TableList({ tickets, isLoading }: TableListProps) {
  const { users } = useContext(AppContext);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <Spin size="large" />
          <p className="text-gray-600 font-medium text-lg">
            Loading tickets...
          </p>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <Empty
            description={
              <span className="text-gray-600 font-medium text-lg">
                No tickets found
              </span>
            }
          />
        </div>
      </div>
    );
  }

  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "id",
      key: "id",
      width: 150,
      fixed: "left" as const,
      className: "font-medium",
      render: (id: number) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">#</span>
          </div>
          <span className="text-blue-600 font-bold text-lg">{id}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 350,
      render: (_: string, record: Ticket) => {
        return (
          <div className="max-w-[350px]">
            <Tooltip title={record.description} placement="topLeft">
              <p className="text-gray-800 leading-relaxed mb-0 line-clamp-2">
                {record.description || "--"}
              </p>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: 150,
      render: (_: string, record: Ticket) => {
        const assignedUser = MappingTicketUser(record, users);
        return assignedUser ? (
          <div className="flex items-center gap-3">
            <Avatar
              size="small"
              icon={<UserOutlined />}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            />
            <span className="text-gray-700 font-semibold">
              {assignedUser.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <UserOutlined className="text-gray-400" />
            </div>
            <span className="text-gray-500 italic">Unassigned</span>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      width: 200,
      align: "center" as const,
      render: (_: string, record: Ticket) => {
        return <TicketStatusBadge status={record.completed} />;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 120,
      align: "center" as const,
      render: (_: string, record: Ticket) => (
        <Button
          icon={<EyeOutlined />}
          type="text"
          size="small"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-0 font-semibold 
            rounded-lg px-3 py-1 transition-all duration-200 hover:scale-105 hover:shadow-sm"
          onClick={() => {
            navigate(`/${record.id}`);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-24">
      <Table
        title={() => (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
            <div className="relative flex items-center justify-between px-8 py-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  Tickets
                </h2>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  {tickets.length} total tickets
                </p>
              </div>
            </div>
          </div>
        )}
        dataSource={tickets || []}
        columns={columns || []}
        rowKey="id"
        sticky={{ offsetHeader: 0 }}
        scroll={{ y: "calc(100vh - 280px)" }}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} tickets`,
        }}
        rowClassName={(_, index) =>
          `${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`
        }
        className="tickets-table"
      />
    </div>
  );
}
