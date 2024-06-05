import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PokemonCard from "./PokemonCard";

jest.mock("next/navigation");
jest.mock("next/image");

describe("PokemonCard", () => {
  it("Renders title and input", () => {
    render(<PokemonCard id="1" name="Pokemon 1" />);

    const title = screen.getByText("Pokemon 1");
    const link = screen.getByRole("link");

    expect(title).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/pokemon/1");
  });
});
