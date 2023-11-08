import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./header";
import "@testing-library/jest-dom";

describe("Header", () => {
  beforeEach(() => {
    render(
      <Router>
        <Header />
      </Router>
    );
  });

  it("renders header container", () => {
    const headerElement = screen.getByTestId("header-container");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders link to home", () => {
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("renders header image with correct source", () => {
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "/src/assets/SuzukiGroupClass.png"
    );
  });
});
