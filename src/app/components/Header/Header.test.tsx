import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

jest.mock("next/navigation");

describe("Header", () => {
  it("Renders title and input", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", { level: 1 });
    const input = screen.getByRole("textbox");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Pokemon App");
    expect(input).toBeInTheDocument();
  });
});
