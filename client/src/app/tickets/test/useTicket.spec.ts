import { act, renderHook, waitFor } from "@testing-library/react";
import { useTickets } from "../hooks/useTickets";

jest.mock("../services", () => ({
  fetchTickets: jest.fn(),
  assignTicket: jest.fn(),
}));

jest.mock("../../component/messages", () => ({
  showErrotNotification: jest.fn(),
}));

import { assignTicket, fetchTickets } from "../services";
import { showErrotNotification } from "../../component/messages";

const mockTickets = [
  { id: 1, description: "Test ticket 1", assigneeId: 1, completed: false },
  { id: 2, description: "Test ticket 2", assigneeId: 2, completed: true },
];

describe("useTicket", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handleFetchTickets", async () => {
    (fetchTickets as jest.Mock).mockResolvedValue(mockTickets);
    const { result } = renderHook(() => useTickets());

    const { handleFetchTickets } = result.current;

    // Initially loading should be false
    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await handleFetchTickets();
    });

    expect(result.current.tickets).toEqual(mockTickets);
    expect(result.current.isLoading).toBe(false);
    expect(fetchTickets).toHaveBeenCalledTimes(1);
  });

  it("handleAssignTicket return successCallbacl", async () => {
    (assignTicket as jest.Mock).mockResolvedValue(true);
    const successCallback = jest.fn();

    const { result } = renderHook(() => useTickets());

    const { handleAssignTicket } = result.current;

    // Initially loading should be false
    expect(result.current.isLoadingUpdate).toBe(false);

    await act(async () => {
      await handleAssignTicket(1, 2, successCallback);
    });

    await waitFor(() => {
      expect(successCallback).toHaveBeenCalled();
      expect(result.current.isLoadingUpdate).toBe(false);
    });

    expect(assignTicket).toHaveBeenCalledWith(1, 2);
  });

  it("handleAssignTicket return error", async () => {
    (assignTicket as jest.Mock).mockRejectedValue(
      new Error("Assign ticket failed")
    );
    const successCallback = jest.fn();

    const { result } = renderHook(() => useTickets());

    const { handleAssignTicket } = result.current;

    // Initially loading should be false
    expect(result.current.isLoadingUpdate).toBe(false);

    await act(async () => {
      await handleAssignTicket(1, 2, successCallback);
    });

    expect(showErrotNotification).toHaveBeenCalledWith("Assign ticket failed");
    expect(successCallback).not.toHaveBeenCalled();
    expect(result.current.isLoadingUpdate).toBe(false);
  });
});
