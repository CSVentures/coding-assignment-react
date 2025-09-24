import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import { Ticket } from "@acme/shared-models";
import { useUsers } from "../hooks/useUsers";
import {
  useAssignTicket,
  useMarkAsComplete,
  useMarkAsIncomplete,
  useUnassignTicket,
} from "../hooks/useTickets";

export interface UpdateTicketModalProps {
  open: boolean;
  onCancel: () => void;
  type: "status" | "assignee";
  ticket: Ticket | null;
}

const UpdateTicketModal: React.FC<UpdateTicketModalProps> = ({
  open,
  onCancel,
  type,
  ticket,
}) => {
  const { data: users = [] } = useUsers();

  const { mutateAsync: assignTicket, isPending: isAssignTicketLoading } =
    useAssignTicket();

  const { mutateAsync: unassignTicket, isPending: isUnassignTicketLoading } =
    useUnassignTicket();

  const { mutateAsync: markAsComplete, isPending: isMarkAsCompleteLoading } =
    useMarkAsComplete();

  const {
    mutateAsync: markAsIncomplete,
    isPending: isMarkAsIncompleteLoading,
  } = useMarkAsIncomplete();

  const isChangeAssigneeLoading =
    isAssignTicketLoading || isUnassignTicketLoading;
  const isChangeStatusLoading =
    isMarkAsCompleteLoading || isMarkAsIncompleteLoading;

  const [selectedUser, setSelectedUser] = useState(
    users?.length ? users[0].id : null
  );

  const handleUpdateTicket = async () => {
    if (!ticket) return;
    try {
      if (type === "assignee") {
        if (ticket?.assigneeId) {
          await unassignTicket({ ticketId: ticket.id });
        } else {
          await assignTicket({
            ticketId: ticket.id,
            userId: selectedUser ?? 0,
          });
        }
      } else {
        if (ticket.completed) {
          await markAsIncomplete({ ticketId: ticket.id });
        } else {
          await markAsComplete({ ticketId: ticket.id });
        }
      }
      message.success("Ticket updated successfully");
      onCancel();
    } catch (err) {
      message.error("Failed to update ticket");
    }
  };

  const renderContent = () => {
    if (type === "status") {
      return (
        <div>
          Are you sure you want to mark this ticket as{" "}
          <b>{ticket?.completed ? "incomplete" : "complete"}?</b>
        </div>
      );
    }

    if (ticket?.assigneeId) {
      return <div>Are you sure you want to unassign this ticket?</div>;
    }
    return (
      <Select
        style={{ width: "100%" }}
        options={users.map((user) => ({ label: user.name, value: user.id }))}
        value={selectedUser}
        onChange={(value) => setSelectedUser(value)}
        placeholder="Select a user"
      />
    );
  };
  return (
    <>
      <Modal
        title="Update Ticket"
        open={open}
        onCancel={onCancel}
        width={420}
        onOk={handleUpdateTicket}
        confirmLoading={isChangeAssigneeLoading || isChangeStatusLoading}
        okButtonProps={{
          disabled: type === "assignee" && !ticket ? !selectedUser : false,
        }}
      >
        {renderContent()}
      </Modal>
    </>
  );
};

export default UpdateTicketModal;
