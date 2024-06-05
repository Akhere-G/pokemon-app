import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PokemonDetails } from "./PokemonDetails";
import data from "./testData.json";

jest.mock("next/image");

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: 1 }),
}));

jest.mock("../../../../services/queries.ts", () => ({
  useFetchPokemon: () => ({ isLoading: false, data }),
}));

describe("Pokemon Details", () => {
  it("Displays the correct data", () => {
    render(<PokemonDetails />);

    const name = screen.getByText("Mewtwo");
    expect(name).toBeInTheDocument();

    const genera = screen.getByText("Genetic Pokémon");
    expect(genera).toBeInTheDocument();

    const type = screen.getByText("psychic");
    expect(type).toBeInTheDocument();

    const ability1 = screen.getByText("pressure");
    expect(ability1).toBeInTheDocument();

    const ability2 = screen.getByText("unnerve");
    expect(ability2).toBeInTheDocument();

    const baseHappiness = screen.getByText("0");
    expect(baseHappiness).toBeInTheDocument();

    const captureRate = screen.getByText("3");
    expect(captureRate).toBeInTheDocument();

    const tags = screen.getByText("Lengendary");
    expect(tags).toBeInTheDocument();

    const flavourText1 = screen.getByTestId("flavour-text-list");
    expect(flavourText1).toBeInTheDocument();
  });
});
