import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {
  useAddTicket,
  useAssignTicket,
  useMarkAsComplete,
  useMarkAsIncomplete,
  useTickets,
  useUnassignTicket,
} from "../hooks/useTickets";
import { useUsers } from "../hooks/useUsers";
import Tickets from "./tickets";

// Mock the hooks
jest.mock("../hooks/useTickets");
jest.mock("../hooks/useUsers");
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock the child components to avoid complex dependencies
jest.mock("./table", () => {
  return function MockTicketsTable({ tickets, isLoading }: any) {
    return (
      <div data-testid="tickets-table">
        {isLoading && <div>Loading...</div>}
        {tickets?.map((ticket: any) => (
          <div key={ticket.id} data-testid={`ticket-${ticket.id}`}>
            {ticket.description}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock("./add-ticket-modal", () => {
  return function MockAddTicketModal({
    open,
    onAddTicket,
    onCancel,
    isConfirmLoading,
  }: any) {
    return open ? (
      <div data-testid="add-ticket-modal">
        <button
          onClick={() => onAddTicket("Test description")}
          disabled={isConfirmLoading}
        >
          Add Ticket
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    ) : null;
  };
});

const mockUseTickets = useTickets as jest.MockedFunction<typeof useTickets>;
const mockUseAddTicket = useAddTicket as jest.MockedFunction<
  typeof useAddTicket
>;
const mockUseUsers = useUsers as jest.MockedFunction<typeof useUsers>;
const mockUseAssignTicket = useAssignTicket as jest.MockedFunction<
  typeof useAssignTicket
>;
const mockUseUnassignTicket = useUnassignTicket as jest.MockedFunction<
  typeof useUnassignTicket
>;
const mockUseMarkAsComplete = useMarkAsComplete as jest.MockedFunction<
  typeof useMarkAsComplete
>;
const mockUseMarkAsIncomplete = useMarkAsIncomplete as jest.MockedFunction<
  typeof useMarkAsIncomplete
>;

// Mock data
const mockTickets = [
  { id: 1, description: "Test ticket 1", assigneeId: 1, completed: false },
  { id: 2, description: "Test ticket 2", assigneeId: 2, completed: true },
  { id: 3, description: "Test ticket 3", assigneeId: null, completed: false },
];

const mockUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
};

describe("Tickets", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    mockUseTickets.mockReturnValue({
      data: mockTickets,
      isLoading: false,
      error: null,
    } as any);

    mockUseUsers.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      error: null,
    } as any);

    mockUseAddTicket.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);

    // Mock additional hooks used by child components
    mockUseAssignTicket.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);

    mockUseUnassignTicket.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);

    mockUseMarkAsComplete.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);

    mockUseMarkAsIncomplete.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);
  });

  it("should render successfully", () => {
    render(<Tickets />, { wrapper: createWrapper() });
    expect(screen.getByText("Add Ticket")).toBeInTheDocument();
  });

  it("should display all tickets by default", () => {
    render(<Tickets />, { wrapper: createWrapper() });

    // Check that all tickets are displayed in the mocked table
    expect(screen.getByTestId("ticket-1")).toBeInTheDocument();
    expect(screen.getByTestId("ticket-2")).toBeInTheDocument();
    expect(screen.getByTestId("ticket-3")).toBeInTheDocument();
  });

  it("should show loading state when tickets are loading", () => {
    mockUseTickets.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    render(<Tickets />, { wrapper: createWrapper() });

    // Check that loading state is passed to the table
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Add Ticket")).toBeInTheDocument();
  });

  it("should open add ticket modal when Add Ticket button is clicked", () => {
    render(<Tickets />, { wrapper: createWrapper() });

    const addButton = screen.getByText("Add Ticket");
    fireEvent.click(addButton);

    // The modal should be open
    expect(screen.getByTestId("add-ticket-modal")).toBeInTheDocument();
  });
});
