import { render, screen } from "@testing-library/react";

import CustomButton from "./button";


describe("TicketDetails", () => {
 
  it("should render button", () => {
    const { baseElement } = render(<CustomButton name="Test"/>);
    expect(baseElement).toBeTruthy();
  });

  it("should render button with name", () => {
    render(<CustomButton  name="Test" />);
    const status = screen.getByTestId("base-button");
    expect(status).toHaveTextContent("Test");
  });
});
