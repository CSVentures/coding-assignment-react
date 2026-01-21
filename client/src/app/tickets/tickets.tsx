import { Route, Routes } from 'react-router-dom';
import { TicketDetails } from './components/TicketDetails';
import { TicketList } from './components/TicketList';

export function Tickets() {
  return (
    <Routes>
      <Route path='/' element={<TicketList />} />
      <Route path='/ticket/:id' element={<TicketDetails />} />
    </Routes>
  );
}

export default Tickets;
