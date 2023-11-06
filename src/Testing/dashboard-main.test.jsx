import { it, vi, expect, describe } from "vitest";
import { cleanup } from "@testing-library/react";
import { API_URL } from "../Utilities/Config/api";

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
    }).then((response) => {
      expect(response.status).toBe(201);
    });
  });
});
