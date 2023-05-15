import { describe, expect, test, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";

import Vote from "./vote";

describe("Vote", () => {
  it("should have title on page in an H2 tag", () => {
    render(<Vote />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Vote/i })
    ).toBeInTheDocument();
  });
});
