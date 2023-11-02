import { render } from "@testing-library/react";
import Footer from "./footer";

test("renders footer component without crashing", () => {
  render(<Footer />);
});

test("renders copyright text", () => {
  const { getByText } = render(<Footer />);
  const copyText = getByText(/copyright/i);
  expect(copyText).toBeInTheDocument();
});
