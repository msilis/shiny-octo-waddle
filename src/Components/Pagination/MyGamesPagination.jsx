//This component is for the pagination of a user's created games
import Pagination from "@mui/material/Pagination";
import { ThemeProvider } from "@mui/material";
import { theme } from "../Pagination/gamePagination";


export default function MyGamesPagination({currentGamesPage, setCurrentGamesPage, myGamesPagination, setMyGamesPagination, createdGamePageSize}){
    
    //Handle page change
    //Maximum of 3 games per page
    function handleGamePageChange(event, page){
        const from = (page - 1) * createdGamePageSize; 
        const to = (page - 1) * createdGamePageSize + createdGamePageSize;
        setMyGamesPagination({...myGamesPagination, from: from, to: to})
        console.log(myGamesPagination)
        setCurrentGamesPage(()=> page);
    }

    return(
        <ThemeProvider theme={theme}>
            <Pagination
            onChange={handleGamePageChange}
            color="primary"
            count={Math.ceil(myGamesPagination.count / createdGamePageSize)}
            page={currentGamesPage}
            />
        </ThemeProvider>
    )

}