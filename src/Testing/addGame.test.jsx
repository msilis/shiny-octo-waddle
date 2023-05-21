import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, it, expect, describe } from "vitest";
import AddGame from "../Components/Dashboard/AddGame/addGame";
import React from "react"

describe("AddGame", () => {
//Clean up 
afterEach(cleanup);

//This is for react-select. It was throwing errors without this mocking
  vi.mock("react-select", () => ({
    __esModule: true,
    default: vi.fn(),
  }));

  it("should show modal when add game button is clicked", () => {
    render(<AddGame setAddGame={()=>{}} userId="123" username="test"/>);
    const addButton = screen.getByTestId("addGameButton");

    userEvent.click(addButton);

    const modal = screen.getByTestId("modal")
    expect(modal).toBeTruthy();
  });
});
