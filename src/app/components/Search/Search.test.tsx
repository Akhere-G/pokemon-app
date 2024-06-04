import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

const mockedPush = jest.fn(() => {});
const mockedEntries = jest.fn(() => []);

const router = { push: mockedPush };
const searchParams = { entries: mockedEntries };

jest.mock("next/navigation", () => ({
  useRouter: () => router,
  useSearchParams: () => searchParams,
}));

describe("Search", () => {
  it("renders", () => {
    render(<Search />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("changes search params", () => {
    render(<Search />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toBeInTheDocument();
    expect(mockedEntries.mock.calls).toHaveLength(1); //toHaveBeenCalledWith("/?search=abc");
    expect(mockedPush).toHaveBeenCalledWith("/?search=abc"); //toHaveBeenCalledWith("/?search=abc");
  });
});
