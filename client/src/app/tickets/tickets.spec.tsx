import { render, screen } from "@testing-library/react";

import Tickets from "./tickets";
import { MemoryRouter } from "react-router-dom";

describe("Tickets", () => {
  it("should render a text when no ticket", () => {
    render(<Tickets tickets={[]} users={[]} />);
    const emptyText = screen.getByTestId("no-ticket");
    expect(emptyText).toHaveTextContent("There is no ticket!");
  });

  it("should render a list of tickets", () => {
    render(
      <MemoryRouter>
        <Tickets
          tickets={[
            {
              id: 1,
              description: "Install a monitor arm",
              assigneeId: 1,
              completed: true,
            },
            {
              id: 2,
              description: "Move the desk to the new location",
              assigneeId: 2,
              completed: false,
            },
          ]}
          users={[]}
        />
      </MemoryRouter>
    );
    const emptyText = screen.getAllByTestId("ticket-list-item");
    expect(emptyText).toHaveLength(2);
  });
});
