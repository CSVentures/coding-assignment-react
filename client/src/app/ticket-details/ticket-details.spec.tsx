import { render, screen, waitFor } from "@testing-library/react";

import TicketDetails from "./ticket-details";

const mockDetail = {
  id: 1,
  description: "test description",
  assigneeId: 1,
  completed: true,
};
const mockUser = {
  id: 1,
  name: "Alice",
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

describe("TicketDetails", () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url === "/api/tickets/1") {
        return Promise.resolve({
          json: () => Promise.resolve(mockDetail),
        });
      }
      if (url === "/api/users/1") {
        return Promise.resolve({
          json: () => Promise.resolve(mockUser),
        });
      }
      return Promise.reject(new Error("Unknown API"));
    }) as jest.Mock;
  });

  it("should render successfully with correct detail", async () => {
    render(<TicketDetails />);
    await waitFor(() =>
      expect(screen.getByTestId("ticket-description")).toHaveTextContent(
        "test description"
      )
    );
  });
});
