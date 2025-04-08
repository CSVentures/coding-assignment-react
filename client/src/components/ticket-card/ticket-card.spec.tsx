import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import TicketCard from "./ticket-card";

const mockDetail = {
  id: 1,
  description: "test description",
  assigneeId: 1,
  completed: true,
};
describe("TicketDetails", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDetail),
      })
    ) as jest.Mock;
  });
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <TicketCard {...mockDetail} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it("should render successfully with correct detail", () => {
    render(
      <MemoryRouter>
        <TicketCard {...mockDetail} />
      </MemoryRouter>
    );
    const status = screen.getByTestId("card-status");
    expect(status).toHaveTextContent("Completed");
  });
});
