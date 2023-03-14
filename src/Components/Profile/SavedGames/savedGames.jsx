import { useEffect, useState } from "react";
import style from "./savedGames.module.css";

export default function SavedGames({ userId }){
    //State for saved games
    const [savedGames, setSavedGames] = useState([])


//Function to fetch saved games

function getSavedGames(){
    try{
        const savedGameInfo = {
            saveUser : userId
        }
        console.log(savedGameInfo)
        fetch("http://localhost:8080/getSavedGames", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(savedGameInfo)
        }).then(response => response.json()).then((jsonResponse => {
            setSavedGames(jsonResponse)
        }))
    }catch(err){
        console.log(err)
    }
}


useEffect(()=>{
    getSavedGames()
}, []);

function handleSavedGameDelete(event){ 
    const gameToDelete = event.target.parentNode.parentNode.id
    const deleteGameData = {
        gameToDelete: gameToDelete
    }
    fetch("http://localhost:8080/deleteSavedGame", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(deleteGameData)
    }).then(response => response.json()).then(jsonResponse => console.log(jsonResponse)
    ).then(()=>{getSavedGames()})
}

console.log(savedGames)

    return(
        <div className={style.savedGamesDisplayContainer}>
            <h4 className={style.savedGamesHeading}>Your saved games:</h4>
            <div className={style.savedGamesDisplay}>
                {savedGames.map((game)=> (
                    <div className={style.gameItem} key={game._id} id={game._id}>
                        <h5>{game.gameName}</h5>
                        <p>{game.gameText}</p>
                        <div className={style.deleteSavedGameButton} onClick={handleSavedGameDelete}><span>Delete</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
}