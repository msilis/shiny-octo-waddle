import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { vi, it, expect, describe } from "vitest";
import AddGameModal from "../Components/Dashboard/AddGame/addGameModal/addGameModal";

describe("AddGameModal", () => {
  afterEach(cleanup);

  it("should call handleCancelClick function when cancel button is clicked", () => {
    //Mock cancel function
    const mockHandleCancelClick = vi.fn();
    mockHandleCancelClick(false);
    mockHandleCancelClick.mock.calls[1] === false;

    //Mock yes function
    const mockHandleYesClick = vi.fn();
    mockHandleCancelClick(true);
    mockHandleYesClick.mock.calls[1] === true;

    //Mock no function
    const mockHandleNoClick = vi.fn();
    mockHandleNoClick(true);
    mockHandleNoClick.mock.calls[1] === true;

    //Render Modal
    render(
      <AddGameModal
        showAddGameModal={true}
        setShowAddGameModal={vi.fn()}
        handleYesClick={mockHandleYesClick}
        handleNoClick={vi.fn()}
        handleCancelClick={mockHandleCancelClick}
      />
    );

    //Get cancel button
    const cancelButton = screen.getByTestId("cancelButton");

    //Click button cancel
    fireEvent.click(cancelButton);

    expect(mockHandleCancelClick).toHaveBeenCalledWith(false);

    //Click yes
    const yesButton = screen.getByTestId("yesButton");

    fireEvent.click(yesButton);
    expect(mockHandleYesClick).toHaveBeenCalledWith(true);

    //Click no
    const noButton = screen.getByTestId("noButton")
    fireEvent.click(noButton);
    expect(mockHandleNoClick).toHaveBeenCalledWith(true);
  });
});
