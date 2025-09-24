import { Link, Route, Routes } from "react-router-dom";

import styles from "./app.module.css";
import TicketDetails from "./ticket-details/ticket-details";
import Tickets from "./tickets/tickets";

const App = () => {
  return (
    <div className={styles["app"]}>
      <div>
        <Link to="/">
          <h1>Ticketing App</h1>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Tickets />} />
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;
