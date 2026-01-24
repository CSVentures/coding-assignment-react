import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TicketDetails } from './components/TicketDetails';
import { TicketList } from './components/TicketList';

export function Tickets() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='/' element={<TicketList />} />
          <Route path='/ticket/:id' element={<TicketDetails />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Tickets;
