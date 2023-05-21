import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, it, expect, describe } from "vitest";
import AddGame from "../Components/Dashboard/AddGame/addGame";

describe("AddGame", () => {
  it("should show console message that the inputs are empty", () => {
    render(<AddGame />);
    //Inputs
  /*   const gameNameInput = screen.getByLabelText("Game Name");
    const gameTextInput = screen.getByLabelText("Game Description");
    const addPieces = screen.getByTestId("pieceOptionInput");
    const addFocus = screen.getByTestId("gameOptionInput"); */
    const addButton = screen.getByTestId("addGameButton");
    const consoleLogSpy = vi.spyOn(console, "log");
    //Click Add button
    userEvent.click(addButton);
    //Modal buttons
    const yesButton = screen.getByText("Yes");
    const noButton = screen.getByText("No");
    //Action
    //Click yes button
    userEvent.click(yesButton);

    setTimeout(() => {
      //Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "You need to check your inputs."
      );

      //Clear

      consoleLogSpy.mockRestore();

      done();
    });
  });
});
