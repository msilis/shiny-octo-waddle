import { render } from "@testing-library/react";
import Header from "./header";

test("renders header component without crashing", () => {
  render(<Header />);
});
