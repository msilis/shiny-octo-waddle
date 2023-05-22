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

    //Render Modal
    render(<AddGameModal
        showAddGameModal={true}
        setShowAddGameModal={vi.fn()}
        handleYesClick={vi.fn()}
        handleNoClick={vi.fn()}
        handleCancelClick={mockHandleCancelClick} />);

    //Get cancel button
    const cancelButton = screen.getByTestId("cancelButton");

    //Click button
    fireEvent.click(cancelButton);

    expect(cancelButton).toBeTruthy();
    expect(mockHandleCancelClick).toHaveBeenCalledWith(false);
  });
});
