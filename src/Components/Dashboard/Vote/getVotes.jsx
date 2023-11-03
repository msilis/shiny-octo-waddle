//Get all games to vote on from database

import { ERROR_MESSAGE } from "../../../Utilities/Config/ui-text";
import { URL_ENDPOINTS } from "../../../Utilities/Config/navigation.js";

function getVoteGames(
  setLoadingVote,
  setVotingGames,
  setVoteTotal,
  from,
  to,
  setGamesForPagination
) {
  setLoadingVote(true);
  fetch(URL_ENDPOINTS.gamesForVote, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-custom-cookie": "jwt",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(ERROR_MESSAGE.voteServerError);
      } else {
        return response.json();
      }
    })
    .then((jsonResponse) => {
      if (jsonResponse.length === 0) {
        throw Error(ERROR_MESSAGE.noGamesError);
      } else {
        setGamesForPagination(jsonResponse.slice(from, to));
        setVotingGames(jsonResponse);
        return;
      }
    })
    .then(() => {
      getOnlyVotes(setVoteTotal);
      setLoadingVote(false);
    })
    .catch((err) => {
      if (
        err instanceof TypeError &&
        err.message === ERROR_MESSAGE.failedToFetch
      ) {
        console.log("Failed to fetch should be showing");
        console.log("Network error: ", err.message);
      }
      setLoadingVote(false);
    });
}

//Fetch vote count to be able to update only count, not whole component
function getOnlyVotes(setVoteTotal) {
  return new Promise((resolve, reject) => {
    fetch(URL_ENDPOINTS.getVoteTotal, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-custon-cookie": "jwt",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(ERROR_MESSAGE.voteServerError);
        }
        return response.json();
      })
      .then((jsonResponse) => setVoteTotal(jsonResponse))
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err.message);
        reject();
      });
  });
}

export { getVoteGames, getOnlyVotes };
