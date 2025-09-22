import { createTicket, fetchTicketDetail, fetchTickets } from "../services";

describe("Ticket Services", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch tickets list", async () => {
    const mockTickets = [
      { id: 1, description: "Test ticket 1", assigneeId: 1, completed: false },
      { id: 2, description: "Test ticket 2", assigneeId: 2, completed: true },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockTickets),
    });

    const tickets = await fetchTickets();

    expect(tickets).toEqual(mockTickets);
    expect(fetch).toHaveBeenCalledWith("/api/tickets");
  });

  it("should fetch ticket detail", async () => {
    const mockTicket = {
      id: 1,
      description: "Test ticket 1",
      assigneeId: 1,
      completed: false,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockTicket),
    });

    const ticketDetail = await fetchTicketDetail(1);
    expect(ticketDetail).toEqual(mockTicket);
    expect(fetch).toHaveBeenCalledWith("/api/tickets/1");
  });

  it("should create ticket", async () => {
    const newTicket = {
      description: "Test ticket 3",
      id: 3,
      assigneeId: null,
      completed: false,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(newTicket),
    });

    const result = await createTicket(newTicket);
    expect(result).toEqual(newTicket);
    expect(fetch).toHaveBeenCalledWith("/api/tickets", {
      method: "POST",
      body: JSON.stringify(newTicket),
    });
  });
});
