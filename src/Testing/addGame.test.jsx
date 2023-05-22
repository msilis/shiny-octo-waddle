import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, it, expect, describe } from "vitest";
import AddGame from "../Components/Dashboard/AddGame/addGame";
import React from "react";

describe("AddGame", () => {
  //Clean up
  afterEach(cleanup);

  //This is for react-select. It was throwing errors without this mocking
  vi.mock("react-select", () => ({
    __esModule: true,
    default: vi.fn(),
  }));

  it("should show modal when add game button is clicked", () => {
    render(<AddGame />);
    //Buttons to show modal
    const addButton = screen.getByTestId("addGameButton");
    const modal = screen.getByTestId("modal");

    userEvent.click(addButton);

    //Modal buttons

    expect(modal).toBeTruthy();
  });

  it("should hide modal wen cancel button is clicked", async () => {
    render(
      <>
        <AddGame />
      </>
    );

    //Buttons to show modal
    const addButton = screen.getByTestId("addGameButton");

    userEvent.click(addButton);
    //Cancel button

    await waitFor(() => {
      const cancelButton = screen.getByTestId("cancelButton");

      expect(cancelButton).toBeTruthy();
    });
  });
});
