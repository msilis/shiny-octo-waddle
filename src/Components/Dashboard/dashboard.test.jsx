import { render, screen } from "@testing-library/react";
import Dashboard from "./dashboard";

describe("Dashboard component", () => {
  test("renders SecondaryNavigation component", () => {
    render(<Dashboard />);
    const secondaryNavElement = screen.getByTestId("secondary-nav");
    expect(secondaryNavElement).toBeInTheDocument();
  });

  test("renders DashboardMain component", () => {
    render(<Dashboard />);
    const dashboardMainElement = screen.getByTestId("dashboard-main");
    expect(dashboardMainElement).toBeInTheDocument();
  });

  test("renders AddGame component when mainDisplay is PAGE_NAVIGATION.addGame", () => {
    render(<Dashboard mainDisplay="PAGE_NAVIGATION.addGame" />);
    const addGameElement = screen.getByTestId("add-game");
    expect(addGameElement).toBeInTheDocument();
  });

  test("renders MyGames component when mainDisplay is PAGE_NAVIGATION.myGames", () => {
    render(<Dashboard mainDisplay="PAGE_NAVIGATION.myGames" />);
    const myGamesElement = screen.getByTestId("my-games");
    expect(myGamesElement).toBeInTheDocument();
  });

  test("renders Vote component when mainDisplay is PAGE_NAVIGATION.vote", () => {
    render(<Dashboard mainDisplay="PAGE_NAVIGATION.vote" />);
    const voteElement = screen.getByTestId("vote");
    expect(voteElement).toBeInTheDocument();
  });

  test("renders BrowseGames component when mainDisplay is PAGE_NAVIGATION.browse", () => {
    render(<Dashboard mainDisplay="PAGE_NAVIGATION.browse" />);
    const browseGamesElement = screen.getByTestId("browse-games");
    expect(browseGamesElement).toBeInTheDocument();
  });

  test("renders Profile component when mainDisplay is PAGE_NAVIGATION.profile", () => {
    render(<Dashboard mainDisplay="PAGE_NAVIGATION.profile" />);
    const profileElement = screen.getByTestId("profile");
    expect(profileElement).toBeInTheDocument();
  });
});
