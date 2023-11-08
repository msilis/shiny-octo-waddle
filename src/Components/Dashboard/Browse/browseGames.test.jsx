import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
  act,
} from "@testing-library/react";
import BrowseGames from "./browseGames";
import "@testing-library/jest-dom";
import { getAllGames, getTagsForBrowse } from "./browse-utils";
import { BrowserRouter as Router } from "react-router-dom";
import { it, expect, describe, beforeEach, vi } from "vitest";
import jest from "jest-mock";
import { ERROR_MESSAGE } from "../../../Utilities/Config/ui-text";

describe("BrowseGames", () => {
  beforeEach(() => {
    render(
      <Router>
        <BrowseGames />
      </Router>
    );
  });

  it("renders browse games container", () => {
    const browseGamesContainer = screen.getByTestId("browse-games-container");
    expect(browseGamesContainer).toBeInTheDocument();
  });

  it("renders browse heading", () => {
    const browseHeading = screen.getByText("Browse games to play");
    expect(browseHeading).toBeInTheDocument();
  });

  it("renders filter container", () => {
    const filterContainerArray = screen.getAllByRole("combobox");
    const filterContainer = filterContainerArray[0];
    expect(filterContainer).toBeInTheDocument();
  });

  it("renders clear filter button", () => {
    const clearFilterButton = screen.getByRole("button", {
      name: "Clear",
    });
    expect(clearFilterButton).toBeInTheDocument();
  });

  it("renders pagination", () => {
    const pagination = screen.getByTestId("browse-pagination");
    expect(pagination).toBeInTheDocument();
  });

  it("displays loading message while games are loading", () => {
    const loadingMessage = screen.getByText("Loading games...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("displays error message when there is a server error", async () => {
    const errorMessage = ERROR_MESSAGE.serverError;
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.reject(errorMessage),
      })
    );

    render(
      <Router>
        <BrowseGames />
      </Router>
    );

    await waitFor(() => {
      const errorText = screen.getByText(errorMessage);
      expect(errorText).toBeInTheDocument();
    });

    global.fetch.mockRestore();
  });

  afterEach(() => {
    cleanup();
  });
});
