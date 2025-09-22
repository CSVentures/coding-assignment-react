import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TicketsContext } from "../context";
import { TableList } from "../components/TableList";
import { Ticket } from "@acme/shared-models";
import AppContext from "../../contexts";

const renderListContext = (
  tickets: Ticket[] = [],
  isLoading: boolean = false
) => {
  return render(
    <MemoryRouter>
      <AppContext.Provider
        value={{
          users: [],
          userDetail: null,
          isLoading: false,
          handleFetchUsers: () => Promise.resolve(),
          handleFetchUser: () => Promise.resolve(),
        }}
      >
        <TicketsContext.Provider
          value={{
            tickets: [],
            isLoading: false,
            ticketDetail: null,
            fetchTickets: () => Promise.resolve(),
            fetchTicketDetail: () => Promise.resolve(),
            createTicket: () => Promise.resolve(),
            assignTicket: () => Promise.resolve(),
            unassignTicket: () => Promise.resolve(),
            completeTicket: () => Promise.resolve(),
            incompleteTicket: () => Promise.resolve(),
            isLoadingDetail: false,
            isLoadingCreate: false,
            isLoadingUpdate: false,
            openModalCreateTicket: false,
            setOpenModalCreateTicket: () => {},
          }}
        >
          <TableList tickets={tickets} isLoading={isLoading} />
        </TicketsContext.Provider>
      </AppContext.Provider>
    </MemoryRouter>
  );
};
describe("Render TableList", () => {
  it("should render loading state correctly", () => {
    const { getByText } = renderListContext([], true);
    expect(getByText("Loading tickets...")).toBeInTheDocument();
  });
});
