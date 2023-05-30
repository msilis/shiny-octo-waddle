//Get all games to vote on from database

function getVoteGames(
  setLoadingVote,
  setVotingGames,
  setVoteTotal,
  from,
  to,
  setGamesForPagination
) {
  setLoadingVote(true);
  fetch("http://localhost:8080/gamesForVote", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-custom-cookie": "jwt", //include cookie in header
    },
    credentials: "include", //make sure endpoint knows to expect a cookie
  })
    .then((response) => {
      if (!response.ok) {
        console.log("from response check");
        throw Error("There was a network error and I could not get votes");
      } else {
        return response.json();
      }
    })
    .then((jsonResponse) => {
      console.log("from jsonResponse block");
      if (jsonResponse.length === 0) {
        throw Error("Server did not return any games.");
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
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        console.log("Network error: ", err.message);
      }
      setLoadingVote(false);
    });
}

//Fetch vote count to be able to update only count, not whole component
function getOnlyVotes(setVoteTotal) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/getVoteTotals", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "X-custon-cookie": "jwt",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("There was an error getting votes from the server");
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
