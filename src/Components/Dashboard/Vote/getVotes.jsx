//Get all games to vote on from database

function getVoteGames(
  setLoadingVote,
  setVotingGames,
  setVoteTotal,
  from,
  to,
  setGamesForPagination
) {
  return new Promise((resolve, reject) => {
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
        if (response.status === 401) {
          throw new Error("You do not have permission to see this");
        } else {
          return response.json();
        }
      })
      .then((jsonResponse) => {
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
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      })
      .finally(() => setLoadingVote(false));
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
        return response.json();
      })
      .then((jsonResponse) => setVoteTotal(jsonResponse))
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
}

export { getVoteGames, getOnlyVotes };
