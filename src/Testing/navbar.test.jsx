import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { vi, it, expect, describe } from "vitest";
import Navbar from "../Components/Navbar/navbar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Navbar", () => {
  afterEach(cleanup);

  //Dashboard
  it("should update mainDisplay to 'dashboard' when 'dashboard' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Dashboard button
    const dashboardButton = screen.getByTestId("dashboardClick");

    //Simulate Dashboard click
    fireEvent.click(dashboardButton);

    //Assert
    expect(mainDisplay).toBe("dashboard");
  });
  //Browse
  it("should update mainDisplay to 'browse' when 'browse' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Browse button
    const browseButton = screen.getByTestId("browseClick");

    //Simulate click
    fireEvent.click(browseButton);

    //Assert
    expect(mainDisplay).toBe("browse");
  });

  //Register
  it("should update mainDisplay to 'register' when 'register' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Browse button
    const voteButton = screen.getByTestId("voteClick");

    //Simulate click
    fireEvent.click(voteButton);

    //Assert
    expect(mainDisplay).toBe("vote");
  });

  //MyGames
  it("should update mainDisplay to 'myGames' when 'my games' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Browse button
    const myGamesButton = screen.getByTestId("myGamesClick");

    //Simulate click
    fireEvent.click(myGamesButton);

    //Assert
    expect(mainDisplay).toBe("myGames");
  });

  //Add Game
  it("should update mainDisplay to 'addGame' when 'add game' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Browse button
    const addGameButton = screen.getByTestId("addGameClick");

    //Simulate click
    fireEvent.click(addGameButton);

    //Assert
    expect(mainDisplay).toBe("addGame");
  });

  //Profile

  it("should update mainDisplay to 'seeProfile' when 'profile' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Browse button
    const profileButton = screen.getByTestId("profileClick");

    //Simulate click
    fireEvent.click(profileButton);

    //Assert
    expect(mainDisplay).toBe("seeProfile");
  });
});
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { vi, it, expect, describe } from "vitest";
import Navbar from "../Components/Navbar/navbar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Navbar", () => {
  afterEach(cleanup);

  //Dashboard
  it("should update mainDisplay to 'dashboard' when 'dashboard' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Dashboard button
    const dashboardButton = screen.getByTestId("dashboardClick");

    //Simulate Dashboard click
    fireEvent.click(dashboardButton);

    //Assert
    expect(mainDisplay).toBe("dashboard");
  });
  //Browse
  it("should update mainDisplay to 'browse' when 'browse' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Browse button
    const browseButton = screen.getByTestId("browseClick");

    //Simulate click
    fireEvent.click(browseButton);

    //Assert
    expect(mainDisplay).toBe("browse");
  });

  //Register
  it("should update mainDisplay to 'register' when 'register' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Register button
    const registerButton = screen.getByTestId("registerClick");

    //Simulate click
    fireEvent.click(registerButton);

    //Assert
    expect(mainDisplay).toBe("register");
  });

  //MyGames
  it("should update mainDisplay to 'myGames' when 'my games' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get My Games button
    const myGamesButton = screen.getByTestId("myGamesClick");

    //Simulate click
    fireEvent.click(myGamesButton);

    //Assert
    expect(mainDisplay).toBe("myGames");
  });

  //Add Game
  it("should update mainDisplay to 'addGame' when 'add game' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Add Game button
    const addGameButton = screen.getByTestId("addGameClick");

    //Simulate click
    fireEvent.click(addGameButton);

    //Assert
    expect(mainDisplay).toBe("addGame");
  });

  //Profile

  it("should update mainDisplay to 'seeProfile' when 'profile' button is clicked", () => {
    let mainDisplay = "";

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={(value) => (mainDisplay = value)}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Profile button
    const profileButton = screen.getByTestId("profileClick");

    //Simulate click
    fireEvent.click(profileButton);

    //Assert
    expect(mainDisplay).toBe("seeProfile");
  });

  //Logout

  it("should log out the user when 'log out' button is clicked", () => {
    let loggedIn = true;

    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={loggedIn}
          setMainDisplay={vi.fn()}
          setLoggedIn={(value) => (loggedIn = value)}
        />
      </Router>
    );

    //Get Logout button
    const logoutButton = screen.getByText("Log Out");

    //Simulate click
    fireEvent.click(logoutButton);

    //Assert
    expect(loggedIn).toBe(false);
  });

  //Hamburger menu

  it("should toggle the hamburger menu when the hamburger icon is clicked", () => {
    //Render Navbar
    render(
      <Router>
        <Navbar
          loggedIn={true}
          setMainDisplay={vi.fn()}
          setLoggedIn={vi.fn()}
        />
      </Router>
    );

    //Get Hamburger icon
    const hamburgerIcon = screen.getByTestId("hamburgerIcon");

    //Get Hamburger menu
    const hamburgerMenu = screen.getByTestId("hamburgerMenu");

    //Assert that the hamburger menu is hidden initially
    expect(hamburgerMenu).toHaveClass("navListHidden");

    //Simulate click on hamburger icon
    fireEvent.click(hamburgerIcon);

    //Assert that the hamburger menu is visible
    expect(hamburgerMenu).toHaveClass("navList");

    //Simulate click on hamburger icon again
    fireEvent.click(hamburgerIcon);

    //Assert that the hamburger menu is hidden again
    expect(hamburgerMenu).toHaveClass("navListHidden");
  });
});
