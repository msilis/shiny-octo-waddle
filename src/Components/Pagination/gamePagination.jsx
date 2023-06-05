import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getVoteGames } from "../Dashboard/Vote/getVotes";

//Theme for pagination
export const theme = createTheme({
  palette: {
    primary: {
      main: "#E1F16B",
      contrastText: "#000",
    },
    text: {
      primary: {
        main: "#FFF",
      },
    },
  },
});

export default function VoteGamePagination({
  votingGames,
  setVotingGames,
  setVoteTotal,
  voteTotal,
  setLoadingVote,
  setGamesForPagination,
  paginationVote,
  setPaginationVote,
  pagination,
  setPagination,
  pageSize,
}) {
  useEffect(() => {
    getVoteGames(
      setLoadingVote,
      setVotingGames,
      setVoteTotal,
      pagination.from,
      pagination.to,
      setGamesForPagination
    );
    setPagination({ ...pagination, count: votingGames.length });
    setPaginationVote(voteTotal.slice(pagination.from, pagination.to));
  }, [pagination.from, pagination.to, votingGames.length]);

  //Set vote totals based on pagination

  function handlePageChange(event, page) {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  }

  return (
    <ThemeProvider theme={theme}>
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        color="primary"
        onChange={handlePageChange}
      />
    </ThemeProvider>
  );
}
