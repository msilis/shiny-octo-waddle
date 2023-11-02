import { it, expect, vi } from "vitest";
import { getVoteGames } from "./getVotes";
import jest from "jest-mock";
import { ERROR_MESSAGE } from "../../../Utilities/Config/ui-text";
import { URL_ENDPOINTS } from "../../../Utilities/Config/navigation";

describe("getVoteGames", () => {
  it("should set loadingVote to true when called", () => {
    let loadingVote = false;
    const setLoadingVote = (value) => {
      loadingVote = value;
    };
    getVoteGames(
      () => setLoadingVote(true),
      vi.fn(),
      vi.fn(),
      vi.fn(),
      vi.fn()
    );
    expect(loadingVote).toBe(true);
  });

  it("should fetch games for voting from the server", () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
    global.fetch = mockFetch;

    getVoteGames(vi.fn(), vi.fn(), vi.fn(), vi.fn(), vi.fn(), vi.fn());

    expect(mockFetch).toHaveBeenCalledWith(URL_ENDPOINTS.gamesForVote, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-custom-cookie": "jwt",
      },
      credentials: "include",
    });
  });

  it("should set games for pagination and voting games when games are fetched successfully", async () => {
    const mockResponse = [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );
    global.fetch = mockFetch;

    let gamesForPagination = [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];
    let votingGames = [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];
    const setVotingGames = (games) => {
      votingGames = games;
    };

    await getVoteGames(
      vi.fn(),
      setVotingGames,
      vi.fn(),
      0,
      2,
      (games) => (gamesForPagination = games)
    );

    expect(votingGames).toEqual(mockResponse);
    expect(gamesForPagination).toEqual(mockResponse.slice(0, 2));
  });

  it("should call getOnlyVotes and set loadingVote to false after games are fetched successfully", async () => {
    const mockResponse = [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );
    global.fetch = mockFetch;

    let loadingVote = false;
    let getOnlyVotesCalled = true;

    await getVoteGames(
      () => (loadingVote = true),
      vi.fn(),
      vi.fn(),
      vi.fn(),
      vi.fn(),
      () => (getOnlyVotesCalled = true)
    );

    expect(getOnlyVotesCalled).toBe(true);
    expect(loadingVote).toBe(false);
  });

  it("should catch and log network errors", async () => {
    const mockFetch = jest.fn(() =>
      Promise.reject(new TypeError("Failed to fetch"))
    );
    global.fetch = mockFetch;

    console.log = jest.fn();

    await getVoteGames(vi.fn(), vi.fn(), vi.fn(), vi.fn(), vi.fn(), vi.fn());

    expect(console.log).toHaveBeenCalledWith("Network error: Failed to fetch");
  });

  it("should catch and set loadingVote to false when there are no games to vote on", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
    global.fetch = mockFetch;

    let loadingVote = true;

    await getVoteGames(
      () => (loadingVote = true),
      vi.fn(),
      vi.fn(),
      vi.fn(),
      vi.fn(),
      vi.fn()
    );

    expect(loadingVote).toBe(false);
  });

  it("should catch and throw an error when there is a server error", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    global.fetch = mockFetch;

    await expect(
      getVoteGames(vi.fn(), vi.fn(), vi.fn(), vi.fn(), vi.fn(), vi.fn())
    ).rejects.toThrow(ERROR_MESSAGE.voteServerError);
  });
});
