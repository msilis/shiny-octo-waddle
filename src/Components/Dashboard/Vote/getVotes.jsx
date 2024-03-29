//Get all games to vote on from database

import { ERROR_MESSAGE } from "../../../Utilities/Config/ui-text";
import { showErrorToast } from "../../../Utilities/toastError.js";
import { API_URL } from "../../../Utilities/Config/api.js";

function getVoteGames(
  setLoadingVote,
  setVotingGames,
  setVoteTotal,
  from,
  to,
  setGamesForPagination
) {
  setLoadingVote(true);
  fetch(API_URL.gamesForVote, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-custom-cookie": "jwt",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        showErrorToast(ERROR_MESSAGE.voteServerError);
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
        showErrorToast(ERROR_MESSAGE.failedToFetch);
        console.log("Network error: ", err.message);
      }
      setLoadingVote(false);
    });
}

function getOnlyVotes(setVoteTotal) {
  return new Promise((resolve, reject) => {
    fetch(API_URL.getVoteTotal, {
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
      .then((jsonResponse) => {
        console.log("Vote total: ", jsonResponse);
        return setVoteTotal(jsonResponse);
      })
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
