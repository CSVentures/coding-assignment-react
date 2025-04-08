import { Text } from "@radix-ui/themes";

import styles from "./status-badge.module.css";

/* eslint-disable-next-line */
export function StatusBadge({ isComplete }: { isComplete: boolean }) {
  return (
    <Text
      as="p"
      className={`${styles["status"]} ${isComplete ? styles["completed"] : ""}`}
      data-testid="card-status"
    >
      {isComplete ? "Completed" : "Not completed"}
    </Text>
  );
}

export default StatusBadge;
