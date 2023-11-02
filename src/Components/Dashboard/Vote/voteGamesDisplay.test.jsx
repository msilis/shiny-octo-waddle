import { expect, it } from "vitest";
import voteGamesDisplay from "../Components/Dashboard/Vote/voteGamesDisplay";

describe("voteGamesDisplay", () => {
  it("should return '0' if noVote is undefined", () => {
    const sliceGameVote = [{}, {}, {}];
    const index = 0;
    const result = voteGamesDisplay(sliceGameVote, index);
    expect(result).toBe("0");
  });

  it("should return the value of noVote if it is defined", () => {
    const sliceGameVote = [{ noVote: "5" }, {}, {}];
    const index = 0;
    const result = voteGamesDisplay(sliceGameVote, index);
    expect(result).toBe("5");
  });
});
