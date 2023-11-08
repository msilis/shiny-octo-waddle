import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import BrowseGames from "./browseGames";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { it, expect, describe, beforeEach } from "vitest";
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
    const browseHeading = screen.getByText("Browse Games");
    expect(browseHeading).toBeInTheDocument();
  });

  it("renders filter container", () => {
    const filterContainer = screen.getAllByRole("combobox");
    expect(filterContainer).toBeInTheDocument();
  });

  it("renders clear filter button", () => {
    const clearFilterButton = screen.getByRole("button", {
      name: "Clear Filter",
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

  it("displays games after loading", async () => {
    const games = [
      {
        _id: "1",
        gameName: "Game 1",
        gameText: "Game 1 description",
        gameTechnique: ["tag1", "tag2"],
      },
      {
        _id: "2",
        gameName: "Game 2",
        gameText: "Game 2 description",
        gameTechnique: ["tag2", "tag3"],
      },
    ];
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(games),
      })
    );

    render(
      <Router>
        <BrowseGames />
      </Router>
    );

    await waitFor(() => {
      const gameItems = screen.getAllByRole("listitem");
      expect(gameItems).toHaveLength(games.length);
    });

    global.fetch.mockRestore();
  });

  it("filters games by tag", async () => {
    const games = [
      {
        _id: "1",
        gameName: "Game 1",
        gameText: "Game 1 description",
        gameTechnique: ["tag1", "tag2"],
      },
      {
        _id: "2",
        gameName: "Game 2",
        gameText: "Game 2 description",
        gameTechnique: ["tag2", "tag3"],
      },
    ];
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(games),
      })
    );

    render(
      <Router>
        <BrowseGames />
      </Router>
    );

    const tagFilter = screen.getAllByRole("combobox");
    fireEvent.change(tagFilter[0], { target: { value: "tag1" } });

    await waitFor(() => {
      const gameItems = screen.getAllByRole("listitem");
      expect(gameItems).toHaveLength(1);
    });

    global.fetch.mockRestore();
  });

  it("clears filter when clear button is clicked", async () => {
    const games = [
      {
        _id: "1",
        gameName: "Game 1",
        gameText: "Game 1 description",
        gameTechnique: ["tag1", "tag2"],
      },
      {
        _id: "2",
        gameName: "Game 2",
        gameText: "Game 2 description",
        gameTechnique: ["tag2", "tag3"],
      },
    ];
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(games),
      })
    );

    render(
      <Router>
        <BrowseGames />
      </Router>
    );

    const tagFilter = screen.getAllByRole("combobox");
    fireEvent.change(tagFilter[0], { target: { value: "tag1" } });

    const clearFilterButton = screen.getByRole("button", {
      name: "Clear",
    });
    fireEvent.click(clearFilterButton);

    await waitFor(() => {
      const gameItems = screen.getAllByRole("listitem");
      expect(gameItems).toHaveLength(games.length);
    });

    global.fetch.mockRestore();
  });
});
