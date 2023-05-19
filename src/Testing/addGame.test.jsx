import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { vi, it, expect, describe } from "vitest";
import AddGame from "../Components/Dashboard/AddGame/addGame";
import renderer from "react-test-renderer";


describe("AddGame", () => {
  it("should show console message that the inputs are empty", () => {
    render(<AddGame
            setAddGame={true}
            userId={"1234"}
            username={"testName"}
        />);
    //Inputs
    const gameNameInput = screen.getByLabelText("Game Name");
    const gameTextInput = screen.getByLabelText("Game Description");
    const addPieces = screen.getByTestId("pieceOptionInput");
    const addFocus = screen.getByTestId("gameOptionInput")
    const addButton = screen.getByTestId("addGameButton");
    const consoleLogSpy = vi.spyOn(console, "log");
    //Action
    userEvent.click(addButton);

    //Assert
    expect(consoleLogSpy).toHaveBeenCalledWith("You need to check your inputs.");

    //Clear

    consoleLogSpy.mockRestore();
  });
});
