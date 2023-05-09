import Pagination from "@mui/material/Pagination";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Pagination/gamePagination";
import { browsePageSize } from "../Dashboard/Browse/browseGames";


export default function BrowsePagination({
  browsePagination,
  setBrowsePagination,
  currentPage,
  setCurrentPage
}) {
  
  //Pagination page change
  function handlePageChange(event, page) {
    const from = (page - 1) * browsePageSize;
    const to = (page - 1) * browsePageSize + browsePageSize;
    setBrowsePagination({...browsePagination, from: from, to: to})
    setCurrentPage(()=>page)
    
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Pagination
        onChange={handlePageChange}
        color="primary"
        count={Math.ceil(browsePagination.count / browsePageSize)}
        page={currentPage}
      />
    </ThemeProvider>
  );
}
