import Pagination from "@mui/material/Pagination";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Pagination/gamePagination";

export default function MySavedGamesPagination({
  currentMyGamesPage,
  setCurrentMyGamesPage,
  mySavedGamesForPagination,
  setSavedGamesPagination,
  savedGamesPagination,
  savedGamePageSize,
}) {
  function handleMyGamesPageChange(event, page) {
    const from = (page - 1) * savedGamePageSize;
    const to = (page - 1) * savedGamePageSize + savedGamePageSize;
    setSavedGamesPagination({ ...savedGamesPagination, from: from, to: to });
    setCurrentMyGamesPage(() => page);
  }

  return (
    <ThemeProvider theme={theme}>
      <Pagination
        onChange={handleMyGamesPageChange}
        color="primary"
        count={Math.ceil(savedGamesPagination.count / savedGamePageSize)}
        page={currentMyGamesPage}
      />
    </ThemeProvider>
  );
}
