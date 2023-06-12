import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, it, expect, describe } from "vitest";
import AddGame from "../Components/Dashboard/AddGame/addGame";
import React from "react";
import { ToastContainer } from "react-toastify";

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

  it("should show toast when there are missing inputs", async () => {
    render(
      <>
        <AddGame />
        <ToastContainer />
      </>
    );
    //get button from screen
    const addButton = screen.getByTestId("addGameButton");
    //fire click event
    userEvent.click(addButton);

    const toastMatcher = (content, element) => {
      return element.innerHTML.includes(content);
    };

    expect(
      await screen.findByText(
        "Make sure you have filled in all the fields!",
        {},
        { matcher: toastMatcher }
      )
    ).toBeTruthy();
  });
});
