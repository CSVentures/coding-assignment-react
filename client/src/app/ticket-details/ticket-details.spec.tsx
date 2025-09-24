import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useTicket } from "../hooks/useTickets";
import { useUsers } from "../hooks/useUsers";
import { TicketDetails } from "./ticket-details";

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

const mockUseTicket = useTicket as jest.MockedFunction<typeof useTicket>;
const mockUseUsers = useUsers as jest.MockedFunction<typeof useUsers>;

// Mock data
const mockTicket = {
  id: 1,
  description: "Test ticket 1",
  assigneeId: 1,
  completed: false,
};

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
    mockUseTicket.mockReturnValue({
      data: mockTicket,
      isLoading: false,
      error: null,
    } as any);

    mockUseUsers.mockReturnValue({
      data: mockUsers,
      isLoading: false,
      error: null,
    } as any);
  });

  it("should render successfully", () => {
    render(<TicketDetails />, { wrapper: createWrapper() });
    expect(screen.getByText("Back to Tickets")).toBeInTheDocument();
  });

  it("should display ticket details", () => {
    render(<TicketDetails />, { wrapper: createWrapper() });

    // Check that the ticket details are displayed
    expect(screen.getByText("Test ticket 1")).toBeInTheDocument();
  });
});
