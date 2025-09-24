import React, { useState } from "react";
import { Button, message, Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Ticket, User } from "@acme/shared-models";
import UpdateTicketModal from "./update-ticket-modal";
import { Link } from "react-router-dom";

export interface TicketsTableProps {
  tickets: Ticket[];
  users: User[];
  isLoading: boolean;
}

const TicketsTable: React.FC<TicketsTableProps> = ({
  tickets,
  users,
  isLoading,
}) => {
  const [openUpdateModal, setOpenUpdateModal] = useState<
    "assignee" | "status" | null
  >(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const handleOpenUpdateModal = (type: "assignee" | "status") => {
    setOpenUpdateModal(type);
    setTicket(ticket);
  };

  const columns: TableProps<Ticket>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => <Link to={`/${record.id}`}>{text}</Link>,
    },
    {
      title: "Assignee",
      key: "assignee",
      dataIndex: "assigneeId",
      render: (_, record) => {
        const assignee = users.find((user) => user.id === record.assigneeId);
        return assignee ? assignee.name : "-";
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { completed }) => (
        <>
          <Tag color={completed ? "green" : "red"}>
            {completed ? "COMPLETED" : "INCOMPLETED"}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleOpenUpdateModal("assignee")}>
            {record.assigneeId ? "Unassign" : "Assign"}
          </Button>
          <Button onClick={() => handleOpenUpdateModal("status")}>
            Mark as {record.completed ? "incomplete" : "complete"}
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table<Ticket>
        columns={columns}
        dataSource={tickets}
        loading={isLoading}
        rowKey="id"
      />

      <UpdateTicketModal
        open={openUpdateModal !== null}
        onCancel={() => setOpenUpdateModal(null)}
        type={openUpdateModal as "assignee" | "status"}
        ticket={ticket}
      />
    </>
  );
};
export default TicketsTable;
