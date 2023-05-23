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
  it("should update mainDisplay to 'browse' when 'browse' button is clicked", ()=>{
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
    expect(mainDisplay).toBe("browse")
  });

  //Register
  it("should update mainDisplay to 'register' when 'register' button is clicked",()=>{
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
    expect(mainDisplay).toBe("vote")
  });

  //MyGames
  it("should update mainDisplay to 'myGames' when 'my games' button is clicked",()=>{
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
    expect(mainDisplay).toBe("myGames")
  });

  //Add Game 
  it("should update mainDisplay to 'addGame' when 'add game' button is clicked",()=>{
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
    expect(mainDisplay).toBe("addGame")
  });

  //Profile 

  it("should update mainDisplay to 'seeProfile' when 'profile' button is clicked",()=>{
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
    expect(mainDisplay).toBe("seeProfile")
  });

});
