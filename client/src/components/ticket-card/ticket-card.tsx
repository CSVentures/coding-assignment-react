import { NavLink } from "react-router-dom";
import { Flex, Text, Box, Avatar, Tooltip } from "@radix-ui/themes";

import { Ticket } from "@acme/shared-models";

import styles from "./ticket-card.module.css";
import StatusBadge from "../status-badge/status-badge";

export interface TicketCardProps extends Ticket {
  assigneeName?: string;
}
/* eslint-disable-next-line */
const TicketCard = (props: TicketCardProps): React.ReactElement => {
  const { id, description, completed, assigneeName } = props;
  return (
    <NavLink
      to={`/${id}`}
      className={styles["card-link"]}
      data-testid="ticket-list-item"
    >
      <Box className={styles["card-box"]} width="260px" p="3">
        <Flex direction="column">
          <Text>{description}</Text>
          <StatusBadge isComplete={completed} />
          <Flex align="center" justify="between" mt="3">
            <Text className={styles["ticket-id"]}>TICKET-{props.id}</Text>
            <Avatar
              size="2"
              src=""
              radius="full"
              fallback={assigneeName?.charAt(0) || "U"}
            />
          </Flex>
        </Flex>
      </Box>
    </NavLink>
  );
};

export default TicketCard;
