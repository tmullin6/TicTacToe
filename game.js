const startscreen = document.querySelector(".startscreen");
const start = document.querySelector("#start");
const title = document.querySelector("#title");

start.addEventListener("click",()=>{
    title.setAttribute("style","margin-top:20px;")
    gameBoard.renderBoard();
    startscreen.removeChild(start);
            
});


const gameBoard = (()=>{                //Game board module

    let board = [];

    const renderBoard = ()=>{
        const gamearea = document.createElement("div");
        gamearea.classList.add("gameboard");
        startscreen.appendChild(gamearea);

        for (let i =0;i<9;i++){
            const gamesquare = document.createElement("div");
            gamesquare.classList.add("gamesquare");
            gamearea.appendChild(gamesquare);
        }
    };

    


    return {board,renderBoard}
})();