import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./home";

describe("Home", () => {
  beforeEach(() => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  it("renders home container", () => {
    const homeElement = screen.getByTestId("home-container");
    expect(homeElement).toBeInTheDocument();
  });
  it("renders home paragraph on page", () => {
    const homeParagraph = screen.getByTestId("home-paragraph");
    expect(homeParagraph).toBeInTheDocument();
  });
});
