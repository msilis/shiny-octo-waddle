import { it, afterEach, expect, describe } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { API_URL } from "../Utilities/Config/api";
import DashboardMain from "../Components/Dashboard/Dashboard-main/dashboard-main";
import { BrowserRouter as Router } from "react-router-dom";
import jest from "jest-mock";

describe("Dashboard-Main", () => {
  //Cleanup
  afterEach(cleanup);

  it("Should return 201 code if game is saved sucessfully", async () => {
    const gameData = {
      gameName: "Test Game",
      gameText: "Test text",
      saveUser: "982j989d987d876",
    };

    const gameResponse = await fetch(API_URL.saveGame, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(gameData),
    });

    expect(gameResponse.status).toBe(201);
  });

  it("Should render DashboardMain component with correct props", () => {
    const firstName = "John";
    const userId = "123";
    const tagArray = [];
    const setTagArray = jest.fn();

    render(
      <Router>
        <DashboardMain
          firstName={firstName}
          userId={userId}
          tagArray={tagArray}
          setTagArray={setTagArray}
        />
      </Router>
    );

    const nameElement = screen.getByText(new RegExp(firstName, "i"));

    expect(nameElement).toBeInTheDocument();
  });
});
