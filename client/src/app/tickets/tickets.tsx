import { useState } from "react";
import { Box, Heading, Text } from "@radix-ui/themes";

import { Ticket, User } from "@acme/shared-models";
import TicketCard from "client/src/components/ticket-card/ticket-card";
import CustomButton from "client/src/components/button/button";

import styles from "./tickets.module.css";

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
}

export function Tickets(props: TicketsProps) {
  const createTicket = () => {
    alert("This feature is under maintenance!")
  };
  return (
    <div className={styles["container"]}>
      <Box className={styles["tickets"]} width="280px" p="2" py="4">
        <Heading as="h5" size="4" color="gray" mb="4">
          To do
        </Heading>
        {props.tickets.length > 0 ? (
          <>
            {props.tickets.map((t) => (
              <TicketCard
                key={t.id}
                id={t.id}
                description={t.description}
                completed={t.completed}
                assigneeId={t.assigneeId}
                assigneeName={
                  props.users.find((i) => i.id === t.assigneeId)?.name
                }
              />
            ))}
          </>
        ) : (
          <Text
            as="div"
            className={styles["no-ticket"]}
            data-testid="no-ticket"
          >
            There is no ticket!
          </Text>
        )}
        <CustomButton
          name="Create ticket"
          iconSrc="../../assets/icons/add.svg"
          onClick={createTicket}
        />
      </Box>
    </div>
  );
}

export default Tickets;
