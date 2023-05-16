import { it, vi, expect, describe } from "vitest";

describe("Dashboard-Main", ()=>{
    it("Should return 201 error if game is saved sucessfully", async ()=>{
        const gameData = {
            "gameName": "Test Game",
            "gameText": "Test text",
            "saveUser": "982j989d987d876"
        };

        const gameResponse = await fetch("http://localhost:8080/saveGame", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(gameData)
        }).then((response) => {
            expect(response.status).toBe(201)
        })
    })
})