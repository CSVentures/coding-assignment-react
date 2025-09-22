import { fireEvent, render, screen } from "@testing-library/react";
import { ModalCreateTicket } from "../components/Modal/ModalCreateTicket";

jest.mock("../components/TicketForm", () => ({
  TicketForm: ({ form, handleSubmit, footer }: any) => (
    <div data-testid="ticket-form">
      <input
        data-testid="description-input"
        onChange={(e) => form.setFieldsValue({ description: e.target.value })}
      />
      <button
        data-testid="submit-button"
        onClick={() => handleSubmit({ description: "Test ticket" })}
      >
        Submit
      </button>
      {footer}
    </div>
  ),
}));

jest.mock("../components/Modal/FooterModal", () => ({
  FooterModal: ({ onClose, allowCreate, isLoading }: any) => (
    <div data-testid="footer-modal">
      <button data-testid="close-footer-button" onClick={onClose}>
        Close
      </button>
      <span data-testid="allow-create">{allowCreate ? "true" : "false"}</span>
      <span data-testid="is-loading">{isLoading ? "true" : "false"}</span>
    </div>
  ),
}));

describe("ModalCreateTicket", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    isLoading: false,
  };

  it("should render successfully", () => {
    const { baseElement } = render(
      <ModalCreateTicket
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        isLoading={false}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it("render modal create ticket", () => {
    const { getByText } = render(<ModalCreateTicket {...defaultProps} />);
    expect(getByText("Create New Ticket")).toBeInTheDocument();
  });

  it("render ticket when open is false", () => {
    const { queryByText } = render(
      <ModalCreateTicket {...defaultProps} open={false} />
    );
    expect(queryByText("Create New Ticket")).not.toBeInTheDocument();
  });

  it("submit form", () => {
    render(<ModalCreateTicket {...defaultProps} />);

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(defaultProps.onSubmit).toHaveBeenCalledWith(
      { description: "Test ticket" },
      expect.any(Function)
    );
  });

  it("should close modal when create sussessfully", async () => {
    const mockOnSubmit = jest.fn((values, successCallback) => {
      successCallback();
    });

    render(<ModalCreateTicket {...defaultProps} onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(mockOnSubmit).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
