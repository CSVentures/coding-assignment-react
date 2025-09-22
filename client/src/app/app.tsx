import { Routes, Route } from "react-router-dom";

import styles from "./app.module.css";
import Tickets from "./tickets/tickets";
import { TicketDetailPage } from "./tickets/pages/TicketDetailPage";
import TicketsProvider from "./tickets/providers";

const App = () => {
  return (
    <div className={styles["app"]}>
      <Routes>
        <Route
          path="/"
          element={
            <TicketsProvider>
              <Tickets />
            </TicketsProvider>
          }
        />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route
          path="/:id"
          element={
            <TicketsProvider>
              <TicketDetailPage />
            </TicketsProvider>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
