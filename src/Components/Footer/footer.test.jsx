import { render, screen } from "@testing-library/react";
import Footer from "./footer";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });

  it("renders footer container", () => {
    const footerElement = screen.getByTestId("footer-container");
    expect(footerElement).toBeInTheDocument();
  });
});
