import { TicketProvider } from './context/TicketContext';
import Tickets from './tickets/tickets';

const App = () => {
  return (
    <TicketProvider>
      <Tickets />
    </TicketProvider>
  );
};

export default App;
