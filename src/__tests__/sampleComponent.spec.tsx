import App from "../App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("should render title", () => {
    render(<App />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});