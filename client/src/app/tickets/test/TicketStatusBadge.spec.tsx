import { render, screen } from "@testing-library/react";
import { TicketStatusBadge } from "../components/TicketStatusBadge";

describe("TicketStatusBadge", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Completed status", () => {
    render(<TicketStatusBadge status={true} />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "check-circle" })
    ).toBeInTheDocument();
  });

  it("should render In progress status", () => {
    render(<TicketStatusBadge status={false} />);
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });
});
