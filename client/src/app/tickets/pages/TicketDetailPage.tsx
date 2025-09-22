import { CloseOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { TicketsContext } from "../context";
import { useContext, useEffect } from "react";
import { Button, Form, Input, Select, Spin, Switch } from "antd";
import AppContext from "../../contexts";
import {
  showErrotNotification,
  showSuccessNotification,
} from "../../component/messages";
import { useMobile } from "../../utils";
import { Header } from "../../component/Header";

export function TicketDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    ticketDetail,
    isLoadingDetail,
    fetchTicketDetail,
    assignTicket,
    unassignTicket,
    completeTicket,
    incompleteTicket,
    isLoadingUpdate,
    fetchTickets,
  } = useContext(TicketsContext);

  const { users } = useContext(AppContext);
  const { isMobile } = useMobile();

  useEffect(() => {
    if (id) {
      fetchTicketDetail(Number(id));
    }
  }, [id]);

  const currentAssignee = ticketDetail?.assigneeId
    ? users.find((user) => user.id === ticketDetail.assigneeId)
    : null;

  const handleSubmit = async (values: any) => {
    if (!id || !ticketDetail) return;

    try {
      const operations: Promise<void>[] = [];

      const newAssigneeId = values.assignee;
      const currentAssigneeId = ticketDetail.assigneeId;

      if (newAssigneeId !== currentAssigneeId) {
        if (newAssigneeId === null || newAssigneeId === undefined) {
          // unssign ticket if already exist ticket's assignee
          operations.push(
            new Promise<void>((resolve, reject) => {
              unassignTicket(Number(id), () => {
                resolve();
              }).catch(reject);
            })
          );
        } else if (
          currentAssigneeId === null ||
          currentAssigneeId === undefined
        ) {
          // assign ticket if not exist ticket's assignee
          operations.push(
            new Promise<void>((resolve, reject) => {
              assignTicket(Number(id), newAssigneeId.toString(), () => {
                resolve();
              }).catch(reject);
            })
          );
        } else {
          // unassign and assign ticket if exist ticket's assignee
          operations.push(
            new Promise<void>(async (resolve, reject) => {
              try {
                await new Promise<void>((resolveUnassign, rejectUnassign) => {
                  unassignTicket(Number(id), () => {
                    resolveUnassign();
                  }).catch(rejectUnassign);
                });

                await new Promise<void>((resolveAssign, rejectAssign) => {
                  assignTicket(Number(id), newAssigneeId.toString(), () => {
                    resolveAssign();
                  }).catch(rejectAssign);
                });

                resolve();
              } catch (error) {
                reject(error);
              }
            })
          );
        }
      }

      const newStatus = values.status;
      const currentStatus = ticketDetail.completed;

      if (newStatus !== currentStatus) {
        if (newStatus === true) {
          operations.push(
            new Promise<void>((resolve, reject) => {
              completeTicket(Number(id), () => {
                resolve();
              }).catch(reject);
            })
          );
        } else {
          operations.push(
            new Promise<void>((resolve, reject) => {
              incompleteTicket(Number(id), () => {
                resolve();
              }).catch(reject);
            })
          );
        }
      }

      if (operations.length > 0) {
        await Promise.all(operations);

        showSuccessNotification("Ticket updated successfully");

        await fetchTickets();
        navigate("/");
      }
    } catch (error) {
      showErrotNotification("Error updating ticket");
    }
  };

  if (isLoadingDetail) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center gap-2">
          <Spin spinning={isLoadingDetail} />
          <p>Ticket detail {id} is loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full min-h-screen relative bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header
        title={
          isMobile ? (
            <span className="text-md font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Ticket #{ticketDetail?.id}
            </span>
          ) : (
            <span className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Ticket #{ticketDetail?.id}
            </span>
          )
        }
        onClick={() => navigate("/")}
        icon={<CloseOutlined className="text-gray-600" />}
        children={
          currentAssignee &&
          !isMobile && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full w-fit">
              <p className="text-sm text-gray-600">
                Assigned to{" "}
                <span className="font-semibold text-blue-700">
                  {currentAssignee.name}
                </span>
              </p>
            </div>
          )
        }
      />

      {/* Content */}
      <div className="flex-1 p-6">
        <Form
          initialValues={{
            assignee: ticketDetail?.assigneeId,
            status: ticketDetail?.completed,
            description: ticketDetail?.description,
          }}
          key={ticketDetail?.id}
          onFinish={handleSubmit}
          className="flex-1 flex flex-col h-full"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="space-y-6">
              <div className={`flex gap-6 ${isMobile ? "flex-col" : ""}`}>
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      Assignee
                    </span>
                  }
                  name="assignee"
                  className={`${isMobile ? "" : "flex-1"}`}
                >
                  <Select
                    options={users.map((user) => ({
                      label: user.name,
                      value: user.id,
                    }))}
                    placeholder="Select assignee"
                    allowClear
                    disabled={isLoadingUpdate}
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      Completed
                    </span>
                  }
                  name="status"
                  valuePropName="checked"
                  className={`${isMobile ? "" : "flex-1"}`}
                >
                  <Switch disabled={isLoadingUpdate} size="default" />
                </Form.Item>
              </div>

              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">
                    Description
                  </span>
                }
                name="description"
              >
                <Input.TextArea
                  placeholder=""
                  rows={8}
                  className="w-full resize-none"
                  disabled={true}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-1"></div>

          <div className="bg-white border-t border-gray-200 shadow-lg rounded-lg">
            <div className="p-6">
              <div
                className={`flex gap-4 ${
                  isMobile ? "max-w-md mx-auto" : "justify-end"
                }`}
              >
                <Button
                  size="large"
                  className={`h-12 font-semibold px-8 ${
                    isMobile ? "flex-1" : ""
                  } 
                    bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300
                    hover:scale-105 transition-all duration-200`}
                  onClick={() => navigate("/")}
                  disabled={isLoadingUpdate}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={`h-12 font-semibold px-8 ${
                    isMobile ? "flex-1" : ""
                  }
                    bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                    border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
                  loading={isLoadingUpdate}
                  disabled={isLoadingUpdate}
                >
                  Update Ticket
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
