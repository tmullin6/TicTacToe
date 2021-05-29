const startscreen = document.querySelector(".startscreen");
const start = document.querySelector("#start");
const title = document.querySelector("#title");


start.addEventListener("click",()=>{
    title.setAttribute("style","margin-top:20px;")
    gameBoard.renderBoard();
    const player1=Player('Player 1','X');
    const player2=Player('Player 2','O');
    startscreen.removeChild(start);
    game.play(player2);
});




const gameBoard = (()=>{                //Game board module

    let board =[];
    let win =false;

    const renderBoard = ()=>{

        const gamearea = document.createElement("div");
        gamearea.classList.add("gameboard");
        startscreen.appendChild(gamearea);

        for (let i =0;i<9;i++){
            const gamesquare = document.createElement("div");
            gamesquare.classList.add("gamesquare");
            board.push(gamesquare);
            gamearea.appendChild(gamesquare);
        }

    
    };

    const checkWinner=()=>{

        
        for (let i=0;i<board.length;i++){


            if(board[i].textContent=='X' && board[i+1].textContent=='X' && board[i+2].textContent=='X'){
                win=true;
            }
            else if(board[i].textContent=='X' && board[i+3].textContent=='X' && board[i+6].textContent=='X'){
                win=true;
                
            }
            else if(board[i].textContent=='X' && board[i+4].textContent=='X' && board[i+8].textContent=='X'){
                win=true;
                
            }
            else if(board[i].textContent=='X' && board[i+2].textContent=='X' && board[i+4].textContent=='X'){
                win=true;
                
            }

        }



    }

  

    


    return {board,renderBoard,checkWinner,win};
})();


const game =(()=>{

    const play =(player)=>{
        makePlay(player);
        gameBoard.checkWinner();
        if(gameBoard.win=true){
            player.winGame();
        }
        
    }

    const makePlay=(player)=>{
        const square = document.querySelectorAll(".gamesquare");
        for (let i =0;i<square.length; i++){
            square[i].addEventListener("click",()=>{
                if(square[i].textContent==""){
                    square[i].textContent=player.symbol;
                }
                else{
                    return;
                };
            });
        };

    };



    

    return{makePlay,play};
})();

const Player = (name,symbol) => {                 //Player Factory Function

    let score=0;

    const winGame=()=>{

            alert(`${name} has won the game`);
            score+=1;
        
    }

    

    return{name, symbol,score,winGame}
};