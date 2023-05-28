//Fetch vote count to be able to update only count, not whole component
const getOnlyVotes = (setVoteTotal) => {
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
      .then((jsonResponse) => {
        setVoteTotal(jsonResponse);
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

export { getOnlyVotes };
