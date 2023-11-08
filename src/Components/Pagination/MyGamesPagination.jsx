import Pagination from "@mui/material/Pagination";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Pagination/gamePagination";

export default function MyGamesPagination({
  currentGamesPage,
  setCurrentGamesPage,
  myGamesPagination,
  setMyGamesPagination,
  createdGamePageSize,
}) {
  function handleGamePageChange(event, page) {
    const from = (page - 1) * createdGamePageSize;
    const to = (page - 1) * createdGamePageSize + createdGamePageSize;
    setMyGamesPagination((prevState) => {
      const newPagination = { ...prevState, from: from, to: to };
      return newPagination;
    });
    setCurrentGamesPage(() => page);
  }

  return (
    <ThemeProvider theme={theme}>
      <Pagination
        onChange={handleGamePageChange}
        color="primary"
        count={Math.ceil(myGamesPagination.count / createdGamePageSize)}
        page={currentGamesPage}
      />
    </ThemeProvider>
  );
}
