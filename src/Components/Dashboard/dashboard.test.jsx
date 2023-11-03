import { render, screen } from "@testing-library/react";
import Dashboard from "./dashboard";
import { PAGE_NAVIGATION } from "../../Utilities/Config/navigation";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Dashboard", () => {
  it("renders AddGame when mainDisplay is addGame", () => {
    render(
      <Router>
        <Dashboard mainDisplay={PAGE_NAVIGATION.addGame} />
      </Router>
    );
    expect(screen.getByTestId("add-game")).toBeInTheDocument();
  });

  it("renders MyGames when mainDisplay is myGames", () => {
    render(
      <Router>
        <Dashboard mainDisplay={PAGE_NAVIGATION.myGames} />
      </Router>
    );
    expect(screen.getByTestId("my-games")).toBeInTheDocument();
  });

  it("renders Vote when mainDisplay is vote", () => {
    render(
      <Router>
        <Dashboard mainDisplay={PAGE_NAVIGATION.vote} />
      </Router>
    );
    expect(screen.getByTestId("vote-container")).toBeInTheDocument();
  });

  it("renders DashboardMain when mainDisplay is dashboard", () => {
    render(
      <Router>
        <Dashboard mainDisplay={PAGE_NAVIGATION.dashboard} />
      </Router>
    );
    expect(screen.getByTestId("dashboard-main-container")).toBeInTheDocument();
  });

  it("renders browseGames when mainDisplay is browseGames", () => {
    render(
      <Router>
        <Dashboard mainDisplay={PAGE_NAVIGATION.browseGames} />
      </Router>
    );
    expect(screen.getByTestId("browse-games-container")).toBeInTheDocument();
  });
});
