//Fetch vote count to be able to update only count, not whole component
const getOnlyVotes = (setVoteTotal) => {
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
    .then((jsonResponse) => {
      setVoteTotal(jsonResponse);
    })

    .catch((err) => {
      console.log(err.message);
    });
};

export { getOnlyVotes };
