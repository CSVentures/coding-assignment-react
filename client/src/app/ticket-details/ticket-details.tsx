import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Ticket } from "@acme/shared-models";

import styles from "./ticket-details.module.css";
import { Avatar, Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import StatusBadge from "client/src/components/status-badge/status-badge";
import Loading from "client/src/components/loading/loading";
import { useUsers } from "client/src/context/UserContext"; // adjust path

/* eslint-disable-next-line */
export interface TicketDetailsProps extends Ticket {}

export function TicketDetails() {
  const { id } = useParams();
  const users = useUsers();

  const [ticketDetail, setTicketDetail] = useState<Ticket>({
    id: 1,
    description: "",
    assigneeId: 1,
    completed: false,
  });
  const [assignedUser, setAssignedUser] = useState({ id: 1, name: "" });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchTicketDetail() {
      setIsLoading(true);

      const ticketRes = await fetch(`/api/tickets/${id}`);
      const ticketData = await ticketRes.json();
      setTicketDetail(ticketData);

      const userData = users?.find((user) => user.id === ticketData.assigneeId);
      if (userData) {
        setAssignedUser(userData);
      }
      setIsLoading(false);
    }

    fetchTicketDetail();
  }, [id, users]);

  return (
    <div className={styles["container"]}>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Flex direction="column">
            <Heading
              size="6"
              mb="4"
              className={styles["title"]}
              data-testid="ticket-description"
            >
              {ticketDetail.description}
            </Heading>
            <Grid columns="2" gap="3" rows="repeat(3, auto)" width="240px">
              <Text className={styles[""]}>Status</Text>
              <div>
                <StatusBadge isComplete={ticketDetail.completed} />
              </div>
              <Text className={styles[""]}>Assignee</Text>
              <Flex align="center">
                <Avatar
                  size="2"
                  src=""
                  radius="full"
                  fallback={assignedUser.name?.charAt(0) || "U"}
                  mr="4"
                />
                <Text>{assignedUser.name}</Text>
              </Flex>
            </Grid>
          </Flex>
        </Box>
      )}
    </div>
  );
}

export default TicketDetails;
