import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAssignTicket,
  useMarkAsComplete,
  useMarkAsIncomplete,
  useTicket,
  useUnassignTicket,
} from "../hooks/useTickets";
import { useUsers as useUsersHook } from "../hooks/useUsers";
import styles from "./ticket-details.module.css";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export interface TicketDetailsProps {}

export function TicketDetails(props: TicketDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ticketId = id ? parseInt(id, 10) : 0;

  const {
    data: ticket,
    isLoading: ticketLoading,
    error: ticketError,
  } = useTicket(ticketId);
  const { data: users = [], isLoading: usersLoading } = useUsersHook();

  const assignTicket = useAssignTicket();
  const unassignTicket = useUnassignTicket();
  const markAsComplete = useMarkAsComplete();
  const markAsIncomplete = useMarkAsIncomplete();

  const handleAssignUser = (userId: number) => {
    if (ticketId) {
      assignTicket.mutate({ ticketId, userId });
    }
  };

  const handleUnassignUser = () => {
    if (ticketId) {
      unassignTicket.mutate({ ticketId });
    }
  };

  const handleToggleComplete = () => {
    if (ticketId && ticket) {
      if (ticket.completed) {
        markAsIncomplete.mutate({ ticketId });
      } else {
        markAsComplete.mutate({ ticketId });
      }
    }
  };

  const getAssigneeName = (assigneeId: number | null) => {
    if (!assigneeId || !users) return "Unassigned";
    const user = users.find((u) => u.id === assigneeId);
    return user ? user.name : "Unknown User";
  };

  if (ticketLoading || usersLoading) {
    return (
      <div className={styles["container"]}>
        <div className={styles["loading"]}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (ticketError || !ticket) {
    return (
      <div className={styles["container"]}>
        <Alert
          message="Error"
          description="Ticket not found or failed to load"
          type="error"
          showIcon
        />
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
          className={styles["backButton"]}
        >
          Back to Tickets
        </Button>
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
          className={styles["backButton"]}
        >
          Back to Tickets
        </Button>
        <Title level={2}>Ticket #{ticket.id}</Title>
      </div>

      <Card className={styles["ticketCard"]}>
        <div className={styles["ticketInfo"]}>
          <div className={styles["statusSection"]}>
            <Text strong>Status:</Text>
            <Tag
              color={ticket.completed ? "green" : "red"}
              icon={
                ticket.completed ? (
                  <CheckCircleOutlined />
                ) : (
                  <CloseCircleOutlined />
                )
              }
              className={styles["statusTag"]}
            >
              {ticket.completed ? "Completed" : "Incomplete"}
            </Tag>
            <Button
              type={ticket.completed ? "default" : "primary"}
              onClick={handleToggleComplete}
              loading={markAsComplete?.isPending || markAsIncomplete?.isPending}
              className={styles["toggleButton"]}
            >
              {ticket.completed ? "Mark as Incomplete" : "Mark as Completed"}
            </Button>
          </div>

          <div className={styles["descriptionSection"]}>
            <Text strong>Description:</Text>
            <Paragraph className={styles["description"]}>
              {ticket.description}
            </Paragraph>
          </div>

          <div className={styles["assigneeSection"]}>
            <Text strong>Assignee:</Text>
            <div className={styles["assigneeControls"]}>
              <Text className={styles["assigneeName"]}>
                <UserOutlined /> {getAssigneeName(ticket.assigneeId)}
              </Text>
              <Space>
                <Select
                  placeholder="Assign to user"
                  style={{ width: 200 }}
                  loading={usersLoading}
                  onSelect={handleAssignUser}
                  disabled={assignTicket?.isPending}
                  value={ticket.assigneeId ?? undefined}
                >
                  {users?.map((user) => (
                    <Option key={user.id} value={user.id}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
                {ticket.assigneeId && (
                  <Button
                    danger
                    onClick={handleUnassignUser}
                    loading={unassignTicket?.isPending}
                  >
                    Unassign
                  </Button>
                )}
              </Space>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TicketDetails;
