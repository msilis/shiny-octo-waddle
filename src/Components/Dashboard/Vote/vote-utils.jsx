import { toast } from "react-toastify";
import { API_URL } from "../../../Utilities/Config/api";
import { ERROR_MESSAGE } from "../../../Utilities/Config/ui-text";
import { showErrorToast } from "../../../Utilities/toastError";

function getOnlyVotes(voteProps) {
  return fetch(API_URL.getVoteTotals, {
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
      voteProps.setVoteTotal(jsonResponse);
    })

    .catch((err) => {
      console.log(err.message);
    });
}

function handleYesVote(e, voteProps) {
  const yesVoteData = {
    gameId: e.target.parentNode.parentNode.id,
    updateVoteValue: 1,
    userId: voteProps.userId,
  };
  fetch(API_URL.trackVote, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-custom-cookie": "jwt",
    },
    credentials: "include",
    body: JSON.stringify(yesVoteData),
  })
    .then((response) => {
      if (response.status === 409) {
        showErrorToast(ERROR_MESSAGE.alreadyVoted);
        throw new Error(ERROR_MESSAGE.alreadyVoted);
      } else if (response.status === 201) {
        voteProps.setVoteSuccess(true);
        getUserVotedGames(voteProps);
        return response.json();
      }
    })
    .then(() => {
      getOnlyVotes(voteProps).then(() => {
        voteProps.setVoteSuccess(false);
        getUserVotedGames(voteProps);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function handleNoVote(e, voteProps) {
  const noVoteData = {
    gameId: e.target.parentNode.parentNode.id,
    updateVoteValue: 0,
    userId: voteProps.userId,
  };
  fetch(API_URL.trackVote, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-custom-cookie": "jwt",
    },
    credentials: "include",
    body: JSON.stringify(noVoteData),
  })
    .then((response) => {
      if (response.status === 409) {
        showErrorToast(ERROR_MESSAGE.alreadyVoted);
        throw new Error(ERROR_MESSAGE.alreadyVoted);
      } else {
        voteProps.setVoteSuccess(true);
        return response.json();
      }
    })
    .then(() => {
      getOnlyVotes(voteProps).then(() => {
        getUserVotedGames(voteProps);
        voteProps.setVoteSuccess(false);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function getUserVotedGames(voteProps) {
  voteProps.setVoteNetworkError(null);
  const idToCheck = {
    userId: voteProps.userId,
  };
  fetch(API_URL.getUserVotes, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(idToCheck),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(ERROR_MESSAGE.failedGettingVoteGames);
      } else {
        return response.json();
      }
    })
    .then((jsonResponse) => {
      let votedGames = jsonResponse.map((el) => {
        return el._id;
      });
      voteProps.setUserVotedGames(votedGames);
    })
    .catch((err) => {
      console.log(err.message);
      voteProps.setVoteNetworkError(err.message);
    });
}

export { getOnlyVotes, handleYesVote, handleNoVote, getUserVotedGames };
